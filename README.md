# API Samples

## $\color{#FFE338}\textsf{\kern{0.2cm}\normalsize POST}$ **Login User**
```
http://localhost:5000/api/v0/user/login
```
### HEADERS
**Authorization**
`Bearer {token}`
### Body
```json
{
    "email": "arafatshabbir8@gmail.com",
    "password": "123456",
    "rememberMe": "true"
}
```
### Example Request
```json
{
    "email": "mkhanmisbah007@gmail.com",
    "password": "123456"
}
```
### Example Response
```json
{
  "token": "token",
  "success": true,
  "data": {
    "_id": "6637a373ae691511dae86c02",
    "username": "user",
    "email": "username@gmail.com",
    "password": "hashedPassword",
    "phone": 1815795240,
    "createdAt": "2024-05-05T15:19:15.738Z",
    "__v": 0
  },
  "message": "User logged In successfully"
}
```

## $\color{#FFE338}\textsf{\kern{0.2cm}\normalsize POST}$ **Register User**
```
http://localhost:5000/api/v0/user/login
```
### HEADERS
**Authorization**
`Bearer {token}`
### Body
```json
{
    "username":"Sabbir",
    "email":"arafat@gmail.com",
    "phone":"01889875119",
    "password":"123456"
}
```
### Example Request
```json
{
    "username":"Sabbir",
    "email":"arafat@gmail.com",
    "phone":"01889875119",
    "password":"123456"
}
```
### Example Response
```json
{
  "message": "User Registered successfully",
  "success": true,
  "data": {
    "username": "sabbir",
    "email": "arafat@gmail.com",
    "password": "$2b$10$C91vqUDkYYPmYeGlSp7e0OV7D/96MoEz/Q3WqauG377tRwPeB7wuC",
    "phone": 1889875119,
    "_id": "66379f95ae691511dae86bfd",
    "createdAt": "2024-05-05T15:02:45.822Z",
    "__v": 0
  }
}
```
