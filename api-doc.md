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
GET /org/:org_id/task
req.headers: access_token

res status 200
```
