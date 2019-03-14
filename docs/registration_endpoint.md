# POST /registration

## Request:
`password2` is the password confirmation
```
{
  "username": "username",
  "password": "PaSSw0rD",
  "password2": "PaSSw0rD",
  "email": "mail@example.com",
  "name": "Full Name"
}
```

## Response:
When the registration was successful:
```
{
  statusCode: 200,
  label: "Registration was successful."
}
```
When the registration was **not** successful:
```
{
  statusCode: 403,
  label: "Username is empty."
}
```
```
{
  statusCode: 403,
  label: "Password is empty."
}
```
```
{
  statusCode: 403,
  label: "Password2 is empty."
}
```
```
{
  statusCode: 403,
  label: "Email is empty."
}
```
```
{
  statusCode: 403,
  label: "Name is empty."
}
```
```
{
  statusCode: 403,
  label: "Email is not valid."
}
```
```
{
  statusCode: 403,
  label: "Password and password2 is different."
}
```
When there is an error on the backend. The label is the SQL error description.
```
{
  statusCode: 500,
  label: err.sqlMessage
}
```
```
{
  statusCode: 403,
  label: "This username is taken."
}
```
```
{
  statusCode: 403,
  label: "This email is already registrated."
}
```

## The sequence of registration:
1) Send the registration data in json *(see in the request section)*
2) Check the response. If the response code is 200, the registration was successful.
3) If the response code was 403 correct the input data and try to send again.
4) When the registration was successful, an e-mail will be sent to the given e-mail address.
   This mail is containing the required token to confirm the user.
5) After you opened the confirmation link the server will redirect to one these links:
    1) `http://frontendurl/emailconfirm/success`
       The confirmation was successful, you can sign in.
    2) `http://frontendurl/emailconfirm/error`
       The user was already confirmed, or some error happened on the server.
    3) `http://frontendurl/emailconfirm/wrongtoken`
       The token is not correct, or it is expired.
