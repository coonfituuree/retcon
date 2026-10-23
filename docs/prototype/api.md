# My Auth API walkthrough

All routes use /api/v1. This is an expected workflow, not evidence of an executed API acceptance run.

| Method | Route          | Purpose                                |
| ------ | -------------- | -------------------------------------- |
| POST   | /auth/register | Create organization, ADMIN and session |
| POST   | /auth/login    | Authenticate                           |
| POST   | /auth/refresh  | Rotate refresh token                   |
| POST   | /auth/logout   | Revoke session                         |
| GET    | /auth/me       | Read own safe profile                  |
| POST   | /auth/users    | Create a user as ADMIN                 |

After starting full Compose I can use:

```powershell
$base = 'http://localhost:8080/api/v1'
$body = @{
  organizationName = 'Retcon Demo'
  email = 'admin@example.com'
  password = 'Replace-With-Your-Own-Long-Password!'
} | ConvertTo-Json
$session = Invoke-RestMethod "$base/auth/register" -Method Post -ContentType 'application/json' -Body $body
$headers = @{ Authorization = "Bearer $($session.accessToken)" }
Invoke-RestMethod "$base/auth/me" -Headers $headers
```

Registration requires REGISTRATION_ENABLED=true. I replace demo credentials before use. I create another user with email, password and role at POST /auth/users using the ADMIN token; tenantId is taken from that token.

Login accepts email and password. Registration and login return accessToken, refreshToken, tokenType, expiresIn and a safe user object. Refresh accepts an object containing refreshToken and returns a new pair; I replace the old refresh value immediately. Logout accepts refreshToken and returns 204.

I expect 400 for invalid fields, 401 for invalid credentials/tokens, 403 for forbidden roles or disabled registration, 409 for duplicate resources and 429 for throttling. I do not publish actual credentials, tokens or private keys in documentation.
