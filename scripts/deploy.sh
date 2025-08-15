#!/bin/bash

echo "🔒 Deploy Application..."
docker run --rm -it --env-file ./apps/api/.env -p 3000:3000 devsecops-api

echo "🚀 Deployment complete!"
