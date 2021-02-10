**USER**
-------------------------------
* POST /user/register
  req.body:
  firstName:string
  lastName: string
  email: string
  password: string
res status 201
```
{
  "id": 13,
  "email": "abc@gmail.com",
  "password": "$2b$10$VP9W4aZKqyqm4DPLBAaIWeMdM4w0m8tyaOkI68HLmTgkE/AvJwTHC",
  "firstName": "abc",
  "lastName": "def",
  "updatedAt": "2021-02-10T09:37:27.568Z",
  "createdAt": "2021-02-10T09:37:27.568Z",
  "profPic": "https://ui-avatars.com/api/?background=random&name=abc+def&rounded=true"
}
```
error response status 400
```
{
  "errors": [
    "This email has been used"
  ]
}
```
-------------------------------
* POST /user/login
req body:
  email: string
  password: string
res status 200
```
{
  "access_token": "<access_token>"
}
```
-------------------------------
* POST /user/googlelogin
req body: not required
res status 200
```
{
  "access_token": "<access_token>"
}
```
-------------------------------
-------------------------------

**ORGANIZATION**
-------------------------------
* POST /org
req.body: name: <name of new Organization>

res status 201
```
{
    "id": 7,
    "name": "Second Org",
    "updatedAt": "2021-02-10T09:32:07.012Z",
    "createdAt": "2021-02-10T09:32:07.012Z"
}
```
-------------------------------
* GET /org
fetch all organization that logged user is in
req.headers = access_token

res status 200
```
[
  {
    "name": "first organization",
    "id": 4,
    "Users": [
      {
        "profPic": "https://ui-avatars.com/api/?background=random&name=atma+joko&rounded=true",
        "id": 11,
        "firstName": "atma",
        "lastName": "joko"
      }
    ]
  },
  {
    "name": "first organization",
    "id": 5,
    "Users": [
      {
        "profPic": "https://ui-avatars.com/api/?background=random&name=atma+joko&rounded=true",
        "id": 11,
        "firstName": "atma",
        "lastName": "joko"
      },
      {
        "profPic": "https://ui-avatars.com/api/?background=random&name=ferdi+atmadi&rounded=true",
        "id": 1,
        "firstName": "ferdi",
        "lastName": "atmadi"
      }
    ]
  }
]

```
-------------------------------

* DEL /org/:org_id
req.headers = access_token

res status 200
```
{
  "message": "organization deleted  successfully"
}
```
-------------------------------
* POST /org/:org_id
req.headers = access_token

res status 201
```
{
  "UserId": 1,
  "OrganizationId": 5,
  "updatedAt": "2021-02-10T09:21:55.822Z",
  "createdAt": "2021-02-10T09:21:55.822Z"
}
```
-------------------------------
-------------------------------
**TASKS**
-------------------------------
POST /org/:org_id/task
req.headers: access_token

res status 201
```
{
  "id": 1,
  "title": "task pertama",
  "category": "todo",
  "OrganizationId": 5,
  "UserId": 11,
  "updatedAt": "2021-02-10T11:22:21.642Z",
  "createdAt": "2021-02-10T11:22:21.642Z"
}
```
error response 400
```
{
  "errors": [
    "title cannot be empty" || "category cannot be empty"
  ]
}
```
-------------------------------
GET /org/:org_id/task
req.headers: access_token

res status 200
```
[
  {
    "id": 1,
    "title": "task pertama",
    "category": "todo",
    "OrganizationId": 5,
    "UserId": 11,
    "createdAt": "2021-02-10T11:22:21.642Z",
    "updatedAt": "2021-02-10T11:22:21.642Z"
  },
  {
    "id": 2,
    "title": "task kedua",
    "category": "doing",
    "OrganizationId": 5,
    "UserId": 11,
    "createdAt": "2021-02-10T11:26:26.091Z",
    "updatedAt": "2021-02-10T11:26:26.091Z"
  }
]
```
-------------------------------
PUT /org/:org_id/task/:task_id
req.headers: access_token
req.body: title(string), category(string)
res status 200
```
{
  "id": 4,
  "title": "task keempat",
  "category": "done",
  "OrganizationId": 5,
  "UserId": 11,
  "createdAt": "2021-02-10T11:27:51.213Z",
  "updatedAt": "2021-02-10T11:45:31.012Z"
}
```
response error 404
```
{
    "message": "Task not found"
}
```
-------------------------------
PATCH /org/:org_id/task/:task_id
req.headers: access_token
req.body: category(string)
res status 200
```
{
  "id": 4,
  "title": "task keempat",
  "category": "doing",
  "OrganizationId": 5,
  "UserId": 11,
  "createdAt": "2021-02-10T11:27:51.213Z",
  "updatedAt": "2021-02-10T11:45:31.012Z"
}
```
response error 404
```
{
    "message": "Task not found"
}
```
-------------------------------
DELETE /org/:org_id/task/:task_id
req.headers: access_token
req.body: not required
res status 200
```
{
  "message": "task deleted successfully"
}
```
response error 404
```
{
  "message": "Task not found"
}
```
-------------------------------
