# Base image for building Gold Standard PQC Environment
FROM ubuntu:22.04 as builder

ARG OPENSSL_VERSION=3.4.0
ARG LIBOQS_VERSION=0.11.0
ARG OQSPROVIDER_VERSION=0.7.0

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y \
    build-essential \
    cmake \
    git \
    ninja-build \
    wget \
    libpcre3-dev \
    zlib1g-dev \
    golang-go \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /opt

# Build OpenSSL
RUN wget https://github.com/openssl/openssl/releases/download/openssl-${OPENSSL_VERSION}/openssl-${OPENSSL_VERSION}.tar.gz && \
    tar -xzf openssl-${OPENSSL_VERSION}.tar.gz && \
    cd openssl-${OPENSSL_VERSION} && \
    ./config --prefix=/opt/openssl/.openssl --openssldir=/opt/openssl/.openssl/ssl shared zlib && \
    make -j$(nproc) && \
    make install_sw && \
    make install_ssldirs

# Build LibOQS
RUN git clone -b ${LIBOQS_VERSION} https://github.com/open-quantum-safe/liboqs.git && \
    cd liboqs && \
    mkdir build && cd build && \
    cmake -GNinja -DOQS_USE_OPENSSL=OFF -DOQS_CLEANSE_MEM=ON -DCMAKE_INSTALL_PREFIX=/opt/liboqs .. && \
    ninja && \
    ninja install

# Build OQS-Provider with KEM Encoders Enabled
RUN git clone -b ${OQSPROVIDER_VERSION} https://github.com/open-quantum-safe/oqs-provider.git && \
    cd oqs-provider && \
    cmake -DCMAKE_PREFIX_PATH="/opt/openssl/.openssl;/opt/liboqs" \
          -DCMAKE_INSTALL_RPATH="/opt/openssl/.openssl/lib64;/opt/openssl/.openssl/lib;/opt/liboqs/lib" \
          -DOQS_KEM_ENCODERS=ON \
          -S . -B _build && \
    cmake --build _build && \
    mkdir -p /opt/openssl/.openssl/lib/ossl-modules && \
    cp _build/lib/oqsprovider.so /opt/openssl/.openssl/lib/ossl-modules/

# Configure OpenSSL PQC Environment
COPY openssl_pqc.cnf /opt/openssl/.openssl/ssl/openssl.cnf
ENV OPENSSL_CONF=/opt/openssl/.openssl/ssl/openssl.cnf

# Build Nginx 1.26.2
RUN wget https://nginx.org/download/nginx-1.26.2.tar.gz && \
    tar -xzf nginx-1.26.2.tar.gz && \
    cd nginx-1.26.2 && \
    ./configure \
        --prefix=/opt/nginx \
        --with-http_ssl_module \
        --with-http_v2_module \
        --with-stream \
        --with-stream_ssl_module \
        --with-cc-opt="-I/opt/openssl/.openssl/include -Wno-error -fstack-protector-strong -D_FORTIFY_SOURCE=2 -O3" \
        --with-ld-opt="-L/opt/openssl/.openssl/lib64 -L/opt/openssl/.openssl/lib -Wl,-rpath,/opt/openssl/.openssl/lib64 -Wl,-rpath,/opt/openssl/.openssl/lib -Wl,-z,relro,-z,now" && \
    make -j$(nproc) && \
    make install && \
    mkdir -p /opt/nginx/conf/tenants.d

# Final Image - PQC Secured Production Node (Ubuntu 22.04 LTS)
FROM ubuntu:22.04

RUN apt-get update && apt-get install -y \
    libpcre3 \
    zlib1g \
    python3 \
    python3-flask \
    python3-flask-cors \
    curl \
    && rm -rf /var/lib/apt/lists/* && \
    mkdir -p /opt/nginx/conf/tenants.d /opt/nginx/logs

# Copy built artifacts
COPY --from=builder /opt/openssl/.openssl /opt/openssl/.openssl
COPY --from=builder /opt/nginx /opt/nginx
COPY --from=builder /opt/liboqs /opt/liboqs

COPY scanner_api.py /opt/scanner_api.py

# Permanent Environment Protection
ENV OPENSSL_MODULES=/opt/openssl/.openssl/lib/ossl-modules
ENV OPENSSL_CONF=/opt/openssl/.openssl/ssl/openssl.cnf
ENV LD_LIBRARY_PATH=/opt/openssl/.openssl/lib64:/opt/openssl/.openssl/lib:/opt/liboqs/lib

# Generate PQC-Signed Server Credentials (mldsa65)
RUN /opt/openssl/.openssl/bin/openssl req -x509 -new -newkey mldsa65 \
    -keyout /opt/nginx/conf/q_server.key -out /opt/nginx/conf/q_server.crt \
    -nodes -subj "/CN=gateway" -days 365 -provider oqsprovider -provider default

# Generate Classical RSA Credentials (RSA-4096) for Hybrid Fallback
RUN /opt/openssl/.openssl/bin/openssl req -x509 -new -newkey rsa:4096 \
    -keyout /opt/nginx/conf/c_server.key -out /opt/nginx/conf/c_server.crt \
    -nodes -subj "/CN=gateway-classical" -days 365

# Generate Premium Tier Merkle-Failsafe Credentials (sphincsplus128fsha2)
# Rationale: SPHINCS+ provides a stateless hash-based failsafe against lattice-math vulnerabilities.
RUN /opt/openssl/.openssl/bin/openssl req -x509 -new -newkey sphincsplus128fsha2 \
    -keyout /opt/nginx/conf/premium_server.key -out /opt/nginx/conf/premium_server.crt \
    -nodes -subj "/CN=gateway-premium" -days 365 -provider oqsprovider -provider default

# Verify PQC Stack Integrity before final delivery
RUN /opt/openssl/.openssl/bin/openssl list -providers -provider oqsprovider | grep -q "oqsprovider" || exit 1

COPY nginx.conf /opt/nginx/conf/nginx.conf

WORKDIR /opt/nginx

EXPOSE 80 443 8443

CMD ["./sbin/nginx", "-g", "daemon off;"]
