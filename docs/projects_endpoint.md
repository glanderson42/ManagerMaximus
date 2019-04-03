# GET /projects
You can authenticate the logged in user using bearer token.
You simply need to set the `Authorization` header to `Bearer {token}`, where the **{token}** is given by the login response.

If you set a wrong token or the given token is timed out, you will get this response:
```
{
  statusCode: 403,
  label: "Forbidden.",
}
```

## GET /projects/list
This endpoint will give you the list of projects, that are created or contributed by the user currently logged in.
The response should look like this:
```
{
    own: [
        {
            id: 4,
            authorid: 2,
            parentid: null,
            title: "Third project",
            description: "Description of third project",
            created: "2019-04-02T14:15:40.000Z",
            deadline: null,
            category: "NEW",
            priority: "HIGH"
        },
        ...
    ],
    contributed: [
        {
            id: 2,
            authorid: 1,
            parentid: 1,
            title: "First subproject",
            description: "First project description",
            created: "2019-04-02T14:15:40.000Z",
            deadline: "2019-09-18T04:22:05.000Z",
            category: "NEW",
            priority: "MID"
        },
        ...
    ]
}
```
