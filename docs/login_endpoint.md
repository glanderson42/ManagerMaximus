# POST /login

## Request:
`username` can be username or e-mail address
```
{
    username: "admin",
    password: "admin"
}
```

## Response:
When the username or e-mail address or password is not correct:
```
{
  statusCode: 403,
  label: "Incorrect username or password."
}
```
When the username and password is correct, but the e-mail address is not confirmed:
```
{
  statusCode: 403,
  label: "E-mail address not confirmed."
}
```
When the user tried too many wrong password, or the user is banned:
```
{
  statusCode: 403,
  label: "User account is disabled."
}
```
When there is an error on the backend. The label is the SQL error description.
```
{
  statusCode: 500,
  label: err.sqlMessage
}
```
When the login was successful:
```
{
  id: 1,
  username: "admin",
  email: "admin@managermaximus.com",
  regdate: "2019-02-19T11:50:09.000Z",
  statusCode: 200,
  label: "Logged in successfully.",
  token: "TheTokenForCurrentSession"
}
```
