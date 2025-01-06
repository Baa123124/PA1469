# BUILDER
FROM alpine:latest AS builder

WORKDIR /app

RUN apk add --no-cache wget unzip bash curl

ADD https://github.com/pocketbase/pocketbase/releases/download/v0.24.1/pocketbase_0.24.1_linux_amd64.zip ./pocketbase.zip

RUN unzip pocketbase.zip && rm pocketbase.zip

RUN chmod +x ./pocketbase

RUN mkdir -p /app/pb_data

RUN ./pocketbase serve --http=0.0.0.0:8090 & \
    echo "Waiting for PocketBase to start..." && \
    timeout=60; \
    while ! curl -s http://localhost:8090/ > /dev/null; do \
        sleep 2; \
        timeout=$((timeout - 2)); \
        if [ $timeout -le 0 ]; then \
            echo "PocketBase failed to start in time"; \
            exit 1; \
        fi; \
    done && \
    echo "Upserting superuser..." && \
    ./pocketbase superuser upsert admin@xplorify.com xplorify123 && \
    pkill pocketbase


# FINAL
FROM alpine:latest

WORKDIR /app

RUN apk add --no-cache bash

COPY --from=builder /app/pocketbase /app/
COPY --from=builder /app/pb_data /app/pb_data

COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

EXPOSE 8090

ENTRYPOINT ["/app/entrypoint.sh"]
