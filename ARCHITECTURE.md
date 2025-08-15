[Client]
|
|  POST /auth/login (username + password)
v
[AuthController]
|
|  validateUser() -> cek username/password di TBL_USERS
v
[AuthService]
|
|  jwtService.sign(payload) → access_token
|  sessionService.create({ payload: access_token, expired: now+5min })
v
[TBL_SESSIONS] ← Simpan access_token dan expired
|
|  Response ke client: { access_token }
v
[Client]
|  GET /users/profile
|  Header: Authorization: Bearer <access_token>
v
[UsersController]
|
|  @UseGuards(SessionAuthGuard)
v
[SessionAuthGuard]
|
|  ambil token dari header
|  cek di TBL_SESSIONS apakah token ada dan expired > now
|    - jika valid → lanjut ke controller
|    - jika tidak valid → throw 'Session expired'
v
[UsersService]
|
|  query TBL_USERS
v
Response ke client: { users: [...] }
