setup:
	@echo "[Setup] Installing API dependencies..."
	@echo "🔧 Starting setup..."
	bash scripts/setup.sh

deploy:
	@echo "🚀 Deploying to Kubernetes..."
	bash scripts/deploy.sh

demo:
	@echo "🎬 Running demo script..."
	bash scripts/demo.sh
