#!/bin/bash

#echo "🔧 Initializing Terraform..."
#cd infrastructure/terraform
#terraform init
#terraform apply -auto-approve
#cd ../..

#echo "📊 Starting monitoring stack (ELK)..."
#docker-compose -f monitoring/docker-compose.yml up -d

echo "🔐 Setting up secrets with Infisical..."
infisical export --env=dev --format=dotenv > apps/api/.env

echo "🐳 Building Docker images..."
docker build -t devsecops-api ./apps/api

echo "✅ Setup complete!"
