#!/bin/bash

echo "Starting PocketBase on port 8090..."

exec ./pocketbase serve --http=0.0.0.0:8090
