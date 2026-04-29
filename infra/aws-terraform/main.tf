terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

# --- VPC & Networking ---
resource "aws_vpc" "pqc_vpc" {
  cidr_block = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true
  tags = {
    Name = "Yochan-Shield-VPC"
  }
}

resource "aws_subnet" "public" {
  count             = 2
  vpc_id            = aws_vpc.pqc_vpc.id
  cidr_block        = cidrsubnet(aws_vpc.pqc_vpc.cidr_block, 8, count.index)
  map_public_ip_on_launch = true
  availability_zone = element(["us-east-1a", "us-east-1b"], count.index)
}

# --- ECS Cluster ---
resource "aws_ecs_cluster" "shield_cluster" {
  name = "yochan-shield-ecs-cluster"
}

resource "aws_ecs_task_definition" "gateway_task" {
  family                   = "yochan-shield-gateway"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = 512
  memory                   = 1024

  container_definitions = jsonencode([
    {
      name      = "gateway"
      image     = "yochan-shield/gateway:latest" # Must be pushed to ECR in a real scenario
      essential = true
      portMappings = [
        {
          containerPort = 443
          hostPort      = 443
          protocol      = "tcp"
        },
        {
          containerPort = 80
          hostPort      = 80
          protocol      = "tcp"
        }
      ]
      environment = [
        {
          name  = "OPENSSL_MODULES"
          value = "/opt/openssl/.openssl/lib/ossl-modules"
        },
        {
          name  = "OPENSSL_CONF"
          value = "/opt/openssl/.openssl/ssl/openssl.cnf"
        }
      ]
    }
  ])
}

# --- Network Load Balancer (NLB) for TCP Passthrough ---
resource "aws_lb" "nlb" {
  name               = "yochan-shield-nlb"
  internal           = false
  load_balancer_type = "network"
  subnets            = aws_subnet.public[*].id
}

resource "aws_lb_target_group" "gateway_tg" {
  name        = "yochan-gateway-tg"
  port        = 443
  protocol    = "TCP"
  vpc_id      = aws_vpc.pqc_vpc.id
  target_type = "ip"
}

resource "aws_lb_listener" "nlb_listener" {
  load_balancer_arn = aws_lb.nlb.arn
  port              = "443"
  protocol          = "TCP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.gateway_tg.arn
  }
}

resource "aws_lb_target_group" "gateway_tg_http" {
  name        = "yochan-gateway-tg-http"
  port        = 80
  protocol    = "TCP"
  vpc_id      = aws_vpc.pqc_vpc.id
  target_type = "ip"
}

resource "aws_lb_listener" "nlb_listener_http" {
  load_balancer_arn = aws_lb.nlb.arn
  port              = "80"
  protocol          = "TCP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.gateway_tg_http.arn
  }
}

resource "aws_ecs_service" "gateway_service" {
  name            = "yochan-shield-gateway-svc"
  cluster         = aws_ecs_cluster.shield_cluster.id
  task_definition = aws_ecs_task_definition.gateway_task.arn
  desired_count   = 2
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = aws_subnet.public[*].id
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.gateway_tg.arn
    container_name   = "gateway"
    container_port   = 443
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.gateway_tg_http.arn
    container_name   = "gateway"
    container_port   = 80
  }
}
