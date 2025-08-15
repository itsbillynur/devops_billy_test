Tutorial Demo

run command "make demo"

Berikut dokumentasi pengetesan internal setelah menjalankan make demo :
Billy Nur Rokhmat@DESKTOP-ICHOCRS MINGW64 ~/Documents/NestJS/devops_test_billy (main)
$ make demo
ðŸŽ¬ Running demo script...
bash scripts/demo.sh
=== DEMO API TEST ===
1. READINESS
   [1][1] Health Checks...

HTTP 000
[1][2] Ping DB...
{"status":"ok","info":{"postgres":{"status":"up"}},"error":{},"details":{"postgres":{"status":"up"}}}
HTTP 200
[1][3] Metrics...
{"uptime":862.643150921,"memoryUsage":{"rss":93630464,"heapTotal":32997376,"heapUsed":31501936,"external":4154964,"arrayBuffers":753163}}
HTTP 200
2. SUCCESS VALIDATION
   [2][1] Login...
   username:billy,password:12345
   Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJpbGx5IiwiaWF0IjoxNzU1MjM2MTMxLCJleHAiOjE3NTUyMzk3MzF9.su7saFddcud5xetdCcZSyEruItUX4SAozqkV6u_56r8
   [2][2] Get Users Because User and Session Valid...
   [{"username":"billy"},{"username":"dhani"}]
   HTTP 200
3. FAILED VALIDATION
   [3][1] Login...
   username:test,password:12345
   Token: null
   [3][2] Failed Get Users Because User and Session Not Valid...
   {"message":"Session expired","error":"Unauthorized","statusCode":401}
   HTTP 401
4. MONITORING
   [4][1] Elastic...
   {
   "name" : "d43390f058aa",
   "cluster_name" : "docker-cluster",
   "cluster_uuid" : "FHsirLY7TNugK5fpgdpEsA",
   "version" : {
   "number" : "8.14.1",
   "build_flavor" : "default",
   "build_type" : "docker",
   "build_hash" : "93a57a1a76f556d8aee6a90d1a95b06187501310",
   "build_date" : "2024-06-10T23:35:17.114581191Z",
   "build_snapshot" : false,
   "lucene_version" : "9.10.0",
   "minimum_wire_compatibility_version" : "7.17.0",
   "minimum_index_compatibility_version" : "7.0.0"
   },
   "tagline" : "You Know, for Search"
   }

HTTP 200
[4][2] APM Server...
{
"build_date": "2024-06-10T19:54:13Z",
"build_sha": "fedbfc8c3e845016fef8141526e6699f47df5cd3",
"publish_ready": false,
"version": "8.14.1"
}

HTTP 200
=== TEST DONE ===