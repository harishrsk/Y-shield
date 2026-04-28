#!/bin/bash
# Yochan-Shield Host OS Hardening

echo "Starting OS Hardening..."

# 1. Update TCP definitions for zero-trust (syn flood protection)
sysctl -w net.ipv4.tcp_syncookies=1
sysctl -w net.ipv4.tcp_max_syn_backlog=2048
sysctl -w net.ipv4.tcp_synack_retries=2
sysctl -w net.ipv4.tcp_syn_retries=5

# 2. Disable unused/insecure weak protocols and file systems
modprobe -r dccp
modprobe -r sctp
modprobe -r rds
modprobe -r tipc
modprobe -r cramfs
modprobe -r freevxfs
modprobe -r jffs2
modprobe -r hfs
modprobe -r hfsplus
modprobe -r squashfs
modprobe -r udf

echo "OS Hardening Completed Successfully. System is ready for Yochan-Shield Gateway."
