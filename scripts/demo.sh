#!/bin/bash

BASE_URL="http://localhost"
TOKEN=""

echo "=== DEMO API TEST ==="
echo "1. READINESS"

echo "[1][1] Health Checks..."
curl -s -w "\nHTTP %{http_code}\n" "$BASE_URL:3000:3000/health"

echo "[1][2] Ping DB..."
curl -s -w "\nHTTP %{http_code}\n" "$BASE_URL:3000/ready"

echo "[1][3] Metrics..."
curl -s -w "\nHTTP %{http_code}\n" "$BASE_URL:3000/metrics"

echo "2. SUCCESS VALIDATION"
echo "[2][1] Login..."
echo "username:billy,password:12345"
TOKEN=$(curl -s -X POST "$BASE_URL:3000/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"username":"billy","password":"123456"}' | jq -r '.access_token')
echo "Token: $TOKEN"

echo "[2][2] Get Users Because User and Session Valid..."
curl -s -w "\nHTTP %{http_code}\n" -H "Authorization: Bearer $TOKEN" "$BASE_URL:3000/users/list"

echo "3. FAILED VALIDATION"
echo "[3][1] Login..."
echo "username:test,password:12345"
TOKEN=$(curl -s -X POST "$BASE_URL:3000/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"test"}' | jq -r '.access_token')
echo "Token: $TOKEN"

echo "[3][2] Failed Get Users Because User and Session Not Valid..."
curl -s -w "\nHTTP %{http_code}\n" -H "Authorization: Bearer $TOKEN" "$BASE_URL:3000/users/list"

echo "4. MONITORING"
echo "[4][1] Elastic..."
curl -s -w "\nHTTP %{http_code}\n" "$BASE_URL:9200"

echo "[4][2] APM Server..."
curl -s -w "\nHTTP %{http_code}\n" "$BASE_URL:8200"

echo "=== TEST DONE ==="
