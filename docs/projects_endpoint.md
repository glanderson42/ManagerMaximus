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

## GET /projects/{id}
This endpoint will give you the project information and widget list.
Response:
```
{
    id: 2,
    authorid: 1,
    parentid: 1,
    title: "First subproject",
    description: "First project description",
    created: "2019-04-14T12:06:29.000Z",
    deadline: "2019-09-18T04:22:05.000Z",
    category: "NEW",
    priority: "MID",
    widgets: [
        {
            id: 1,
            authorid: 1,
            projectid: 2,
            title: "First widget",
            data: "{}",
            comments: "[]",
            date: "2019-04-14T12:06:29.000Z",
            lastmodified: "2019-04-14T12:06:29.000Z",
            visibility: "PUBLIC"
        },
        {
            id: 2,
            authorid: 1,
            projectid: 2,
            title: "Second widget",
            data: "{}",
            comments: "[]",
            date: "2019-04-14T12:06:29.000Z",
            lastmodified: "2019-04-14T12:06:29.000Z",
            visibility: "OWN"
        }
    ]
}
```
You can also get error response with status code 500 or 403

## DELETE /projects/{id}
This will delete the project with id {id}.
You can also get error response with status code 500 or 403
```
{
  statusCode: 200,
  label: "Project delete was successful",
}
```

## PUT /projects
Response contains a JSON with statusCode and label.
### New project:
Request:
```
{
  parentid: 4, // Set subproject under project #4. Can be NULL
  title: "title",
  description: "description",
  deadline: "2019-05-10 15:11:24", // Set NULL if disabled
  category: "NEW", // Possible values: 'NEW','PROGRESS','TESTING','READY'
  priority: "LOW"  // Possible values: 'LOW','MID','HIGH',''
}
```
### Modify existing project:
You can skip keys, that you don't want to modify.
Request:
```
{
  id: 2, // Modified project's id
  // You cannot modify -parentid-
  title: "title",
  description: "description",
  deadline: "2019-05-10 15:11:24", // Set NULL if disabled
  category: "NEW", // Possible values: 'NEW','PROGRESS','TESTING','READY'
  priority: "LOW"  // Possible values: 'LOW','MID','HIGH',''
}
```
