# Docs

In this page

-   [Signup](#signup)
-   [Login](#login)
-   [Get all Users](#get-all-users)
-   [Update calling status of users](#update-calling-status)

## HTTP status codes used in this API

| Status code | Description           |
| :---------- | :-------------------- |
| `200`       | OK                    |
| `201`       | Created               |
| `400`       | Bad Request           |
| `401`       | Unauthorized          |
| `409`       | Conflict              |
| `500`       | Internal Server Error |

**⚠️ Api key must be there in `x-api-key` header in every request.**

_invalid api key response_

```json
{
	"success": false,
	"message": "Invalid API key",
	"data": {}
}
```

## Auth

### Signup

```http
POST: /api/auth/signup
```

**Body:**

```json
{
	"fname": "Ayush",
	"lname": "Chugh",
	"email": "ayushchugh2006@gmail.com",
	"phone": 987654321,
	"password": "something",
	"cpassword": "something"
}
```

**Response:**

| status code | message                                    | reason                              |
| :---------- | :----------------------------------------- | :---------------------------------- |
| `201`       | User created successfully                  | request was successful              |
| `400`       | Please fill in all fields                  | any filed in body is missing        |
| `400`       | Password and Confirm Password do not match | password and cpassword are not same |
| `409 `      | Email or phone already exists              | User already exists in Data Base    |
| `500 `      | Internal server error                      | Internal server error               |

_User created successfully `201`:_

```json
{
	"success": true,
	"message": "User created successfully",
	"data": {
		"fname": "Ayush",
		"lname": "Chugh",
		"email": "ayushchugh2006@gmail.com",
		"phone": 98765431,
		"password": "$2b$10$q0Hlqu6PE8GMDDkqHRmBgOTNc8.AKpI9gMF8TdNkooX/q3x16CQdq",
		"orders": [],
		"_id": "61c45eeea069468f12c078aa",
		"__v": 0
	},
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYzQ1ZWVlYTA2OTQ2OGYxMmMwNzhhYSIsImlhdCI6MTY0MDI1OTMxMH0.wrLOMeEzUDunR5ladDrggHnSrQvcuzjxYnSiNXAk3kM"
}
```

### Login

```http
POST: /api/auth/login
```

**Body:**

```json
{
	"email": "ayushchugh2006@gmail.com",
	"password": "something"
}
```

**Response:**

| status code | message                     | reason                       |
| :---------- | :-------------------------- | :--------------------------- |
| `200`       | User logged in successfully | request was successful       |
| `400`       | Please fill in all fields   | any filed in body is missing |
| `401`       | Incorrect Password          | Incorrect Password           |
| `404 `      | User not found              | User has not signed up yet   |
| `500 `      | Internal server error       | Internal server error        |

_User logged in successfully `200`:_

```json
{
	"success": true,
	"message": "User logged in successfully",
	"data": {
		"_id": "61c45eeea069468f12c078aa",
		"fname": "Ayush",
		"lname": "Chugh",
		"email": "ayushchugh2006@gmail.com",
		"phone": 98765431,
		"password": "$2b$10$q0Hlqu6PE8GMDDkqHRmBgOTNc8.AKpI9gMF8TdNkooX/q3x16CQdq",
		"orders": [],
		"__v": 0
	},
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYzQ1ZWVlYTA2OTQ2OGYxMmMwNzhhYSIsImlhdCI6MTY0MDI2MDg2MH0.-0N2tYca6cnU-_tY_-wDwYX2iVTmkf-3_dsgY3lLDb4"
}
```

## Users

### Get all Users

```http
GET: /api/users/get-all
```

**Response:**

| status code | message                      | reason                 |
| :---------- | :--------------------------- | :--------------------- |
| `200`       | Users retrieved successfully | request was successful |
| `500 `      | Internal server error        | Internal server error  |

_Users retrieved successfully `200`_

```json
{
	"success": true,
	"message": "Users retrieved successfully",
	"data": [
		{
			"_id": "61cc6543b370fa8fd782b5dd",
			"name": "ayush",
			"email": "ayushchugh2006@gmail.com",
			"phone": 987654321,
			"password": "$2b$10$H398BtiMH8tq3I27T2HgDOTo76ugwJODs.6uEovEBKLGBWTgGt9dq",
			"__v": 0
		}
	]
}
```

### Update calling status

```http
PATCH: /api/users/update-calling-status/:id
```

**Body**

```json
{
	"callingStatus": "Call Again",
	"callAgainDate": "2022-01-18T00:00:00.000Z",
	"talkProgress": "some thing"
}
```

NOTE:

-   `callAgainDate` and `talkProgress` can only be set when `callingStatus` is `Call Again`
-   if `callingStatus` is not `Call Again` then `callAgainDate` and `talkProgress` should be null
-   `callingStatus` can only be one of the following
    -   `Pending`
    -   `Done`
    -   `Rejected`
    -   `Call Again`

**Response:**

| status code | message                                                                                 | reason                                                                                                   |
| :---------- | :-------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------- |
| `200`       | User updated successfully                                                               | request was successful                                                                                   |
| `400`       | Please fill all fields                                                                  | some fields are missing                                                                                  |
| `400`       | `callAgainDate`, `talkProgress` are required for `Call Again`                           | some thing from `callAginDate` or `talkProgress` are missing but `callStatus` is set to `Call Again`     |
| `400`       | You can only assign `callAgainDate`, `talkProgress` when calling status is `Call Again` | some thing from `callAginDate` or `talkProgress` are present but `callStatus` is not set to `Call Again` |
| `404`       | 'User not found                                                                         | User does not exist invalid id                                                                           |

_User updated successfully `200`_

```json
{
	"success": true,
	"message": "User updated successfully",
	"data": {
		"_id": "61d2e43382f38e0a1205bf95",
		"name": "Ayush Chugh",
		"email": "ayushchugh2006@gmail.com",
		"phone": 9501857002,
		"password": "$2b$10$fj/0CcHvVnBfOxKN6v4ySOU1dFnMCWpxgW6O4bLk4QDvQiJFVDl6W",
		"callingStatus": "Call Again",
		"callAgainDate": "2022-01-18T00:00:00.000Z",
		"talkProgress": "some thing",
		"__v": 0
	}
}
```
