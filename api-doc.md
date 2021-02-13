**USER**
-------------------------------
* POST /user/register
  
req.body:\
  firstName:string\
  lastName: string\
  email: string\
  password: string\
res status 201:
```
{
  "email": "abc@gmail.com",
  "firstName": "abc",
  "lastName": "def",
  "profPic": "https://ui-avatars.com/api/?background=random&name=abc+def&rounded=true"
}
```
error response status 400:
```
{
  "errors": [
    "This email has been used",
    "first name cannot be empty",
    "last name cannot be empty",
    "password cannot be empty",
    "minimum password length is 6 characters",
    "invalid email format"
  ]
}
```
-------------------------------
* POST /user/login
  
req body:\
  email: string\
  password: string\
res status 200:
```
{
  "access_token": "<access_token>"
}
```
res error status 400:
```
{
  "message": "Invalid email or password"
}
```
-------------------------------
* POST /user/googlelogin

req body: not required\
res status 200:
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

req.body: name: name of new Organization\
req.headers: access_token\
res status 201:
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

fetch all organization that logged user is in\
req.headers = access_token\
res status 200:
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

req.headers = access_token\
res status 200:
```
{
  "message": "organization deleted  successfully"
}
```
-------------------------------
* POST /org/:org_id

add new member to an organization\
req.headers = access_token\
req.body = email(string)\
res status 201:
```
{
  "UserId": 1,
  "OrganizationId": 5,
  "updatedAt": "2021-02-10T09:21:55.822Z",
  "createdAt": "2021-02-10T09:21:55.822Z"
}
```
res status 400
```
{
  "message": "User already joined the organization"
}
```
res status 401
```
{
  "message": "Error User not a member of this org"
}
```
res status 404
```
{
  "message": "Error User not found"
}
```
-------------------------------
-------------------------------
**TASKS**
-------------------------------
* POST /org/:org_id/task

req.headers: access_token\
req.body:\
      title\
      category\
      email\
res status 201:
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
error response 400:
```
{
  "errors": [
    "title cannot be empty",
    "category cannot be empty"
  ]
}
```
-------------------------------
* GET /org/:org_id/task

req.headers: access_token\
res status 200:
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
* PUT /org/:org_id/task/:task_id

req.headers: access_token\
req.body: title(string), category(string), email(string)\
res status 200:
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
response error 404:
```
{
  "message": "Error Task not found"
}
```
-------------------------------
* PATCH /org/:org_id/task/:task_id

req.headers: access_token\
req.body: category(string)\
res status 200:
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
response error 404:
```
{
  "message": "Error Task not found"
}
```
-------------------------------
* DELETE /org/:org_id/task/:task_id

req.headers: access_token\
req.body: not required\
res status 200:
```
{
  "message": "task deleted successfully"
}
```
response error 404:
```
{
  "message": "Error Task not found"
}
```
-------------------------------

**Global Error Response**

res error 401:
```
{
  "message": "invalid token"
}
```
res error 401:
```
{
  "message": "Unauthorized"
}
```
res error 404:
```
{
  "message": "Error not found"
}
```
res error 404:
```
{
  "message": "Error Organization not found"
}
```

res error 500:
```
{
  "message": "internal server error"
}
```
