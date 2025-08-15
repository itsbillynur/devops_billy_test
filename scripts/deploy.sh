#!/bin/bash

#echo "📦 Applying Kubernetes manifests..."
#kubectl apply -f infrastructure/kubernetes/

#echo "🔒 Running Ansible playbooks for hardening..."
#cd infrastructure/ansible
#ansible-playbook deploy.yml
#cd ../..

echo "🔒 Deploy Application..."
docker run --rm -it --env-file ./apps/api/.env -p 3000:3000 devsecops-api

echo "🚀 Deployment complete!"
