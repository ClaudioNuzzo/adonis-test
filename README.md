# Obiettivo
Consegna di una repository su Github contenente il codice di un progetto backend
costruito con il framework AdonisJs 4.1.

## Routes

```bash
GET /
{
    name: "test.api",
    version: "0.0.1"
}
```

```bash
POST “/api/v1/login“
{
    code: "success",
    user_id: 1,
    access_token: {
    type: "bearer",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEwLCJpYXQiOjE2MTQ1OTMwMjksImV4cCI6M
    TYxNDU5NjYyOX0.HvwT7bPoXNg4lncFb3IUpPN37wn5Eh3MaD6ChVmrN3M",
    refreshToken: null
    }
}

```

```bash
GET /api/v1/user/:userId
{
    id: 2,
    username: "a",
    email: "a",
    password: "$2a$10$4IRZUUqZ.j/l1Os0l6IaZu.kDfQOtm5fF5CrbxqGxLprv5FjhyIa6",
    created_at: "2021-03-06 14:05:21",
    updated_at: "2021-03-06 14:05:21"
}
```