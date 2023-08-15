# cms-integration-server

CMS Integration - Server

## Endpoints

List of Available Endpoints:

- `GET /`
- `POST /login`
- `POST /register`
- `POST /glogin`
  <br/>
- `POST /products`
- `GET /products`
- `GET /products/:id`
- `DELETE /products/:id`
- `PUT /products/:id`
- `PATCH /products/:id`
  <br/>
- `GET /categories`
- `GET /histories`
  <br/>
- `POST /pub/login`
- `POST /pub/register`
- `POST /pub/glogin`
  <br/>
- `GET /pub/products`
- `GET /pub/products/:id`
- `GET /pub/categories`
  <br/>
- `GET /bookmarks`
- `POST /bookmarks/:ProductId`
- `DELETE /bookmarks/:id`

<br/>
### GET /

#### Description

- Get a welcome message

#### Response

_200 - OK_

- Body

  ```json
  {
    "message": "string"
  }
  ```

<br/>
### POST /login

#### Request:

- headers:

  ```json
  {
    "Content-Type": "application/json
  }
  ```

- body:

  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

#### Response:

_Response (200 - OK)_

```json
{
  "access_token": "string",
  "email": "string",
  "username": "string",
  "role": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "statusCode": 400,
  "error": {
    "message": "Email or password is required"
  }
}
```

_Response (401 - Unauthorized)_

```json
{
  "statusCode": 401,
  "error": {
    "message": "Invalid username or email or password"
  }
}
```

<br/>
### POST /register

#### Request:

- headers:

  ```json
  {
    "Content-Type": "application/json
  }
  ```

- body:

  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string",
    "phoneNumber": "string",
    "address": "string"
  }
  ```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "statusCode": 400,
  "error": {
    "message": ["string"]
  }
}
```

<br/>
### POST /gLogin

#### Request:

- headers:

  ```json
  {
    "google_token": "string"
  }
  ```

#### Response:

_Response (200 - OK)_

```json
{
  "statusCode": 200,
  "access_token": "string",
  "message": "string"
}
```

<br/>
### POST /products

#### Description

- Create a new product data

#### Request

- Headers

  ```json
  {
    "access_token": "string"
  }
  ```

- Body

  ```json
  {
    "name": "string",
    "description": "string",
    "price": "integer",
    "stock": "integer",
    "imgUrl": "text",
    "categoryId": "integer",
    "authorId": "integer",
    "rating": "integer",
    "totalReviews": "integer"
  }
  ```

#### Response

_201 - Created_

- Body

  ```json
  {
    "statusCode": 201,
    "message": "Product created successfully",
    "data": {
      "id": "integer",
      "name": "string",
      "description": "string",
      "price": "integer",
      "stock": "integer",
      "imgUrl": "text",
      "categoryId": "integer",
      "authorId": "integer",
      "deletedAt": "date",
      "rating": "integer",
      "totalReviews": "integer",
      "createdAt": "date",
      "updatedAt": "date"
    }
  }
  ```

_400 - Bad Request_

- Body

  ```json
  {
    "statusCode": 400,
    "error": {
      "message": ["string"]
    }
  }
  ```

### GET /products

#### Description

- Get all the products data

#### Request

- Headers

  ```json
  {
    "access_token": "string"
  }
  ```

#### Response

_200 - OK_

- Body

  ```json
  {
    "statusCode": 200,
    "data": [
      {
        "id": "integer",
        "name": "string",
        "description": "string",
        "price": "integer",
        "stock": "integer",
        "imgUrl": "text",
        "categoryId": "integer",
        "authorId": "integer",
        "status": "Active",
        "deletedAt": "date",
        "rating": "integer",
        "totalReviews": "integer",
        "createdAt": "date",
        "updatedAt": "date",
        "User": {
            "id": "integer",
            "username": "string",
            "email": "string",
            "role": "string",
            "phoneNumber": "string",
            "address": "string",
            "createdAt": "date",
            "updatedAt": "date"
        }
      },
      ...
    ]
  }
  ```

<br/>
### GET /products/:id

#### Description

- Get a product data based on given id

#### Request

- headers

  ```json
  {
    "access_token": "string"
  }
  ```

- params

  ```json
  {
    "id": "integer"
  }
  ```

#### Response

_200 - OK_

- Body

  ```json
  {
    "statusCode": 200,
    "data": {
      "id": "integer",
      "name": "string",
      "description": "string",
      "price": "integer",
      "stock": "integer",
      "imgUrl": "text",
      "categoryId": "integer",
      "authorId": "integer",
      "status": "Active",
      "deletedAt": "date",
      "rating": "integer",
      "totalReviews": "integer",
      "createdAt": "date",
      "updatedAt": "date"
    }
  }
  ```

_404 - Not Found_

- Body

  ```json
  {
    "statusCode": 404,
    "error": {
      "message": "Error Product Not Found"
    }
  }
  ```

<br/>
### DELETE /products/:id

#### Description

- Remove a product data based on given id

#### Request

- Headers

  ```json
  {
    "access_token": "string"
  }
  ```

- params

  ```json
  {
    "id": "integer"
  }
  ```

#### Response

_200 - OK_

- Body

  ```json
  {
    "statusCode": 200,
    "message": "Product {id} success to delete"
  }
  ```

_404 - Not Found_

- Body

  ```json
  {
    "statusCode": 404,
    "error": {
      "message": "Error Product Not Found"
    }
  }
  ```

<br/>
### PUT /products/:id

#### Description

- Replace a product data

#### Request

- Headers

  ```json
  {
    "access_token": "string"
  }
  ```

- params

  ```json
  {
    "id": "integer"
  }
  ```

- Body
  ```json
  {
    "name": "string",
    "description": "string",
    "price": "integer",
    "stock": "integer",
    "imgUrl": "text",
    "categoryId": "integer",
    "authorId": "integer",
    "status": "string"
  }
  ```

#### Response

_200 - OK_

- Body

  ```json
  {
    "statusCode": 200,
    "message": "Success to replace Product {productName}"
  }
  ```

_400 - Bad Request_

- Body

  ```json
  {
    "statusCode": 400,
    "error": {
      "message": ["string"]
    }
  }
  ```

<br/>
### PATCH /products/:id

#### Description

- Modify a product data (status)

#### Request

- Headers

  ```json
  {
    "access_token": "string"
  }
  ```

- params

  ```json
  {
    "id": "integer"
  }
  ```

- Body

  ```json
  {
    "status": "string"
  }
  ```

#### Response

_200 - OK_

- Body

  ```json
  {
    "statusCode": 200,
    "message": "Success to modify Product {productName}"
  }
  ```

_400 - Bad Request_

- Body

  ```json
  {
    "statusCode": 400,
    "error": {
      "message": ["string"]
    }
  }
  ```

<br/>
### GET /categories

#### Description

- Get all the categories data

#### Request

- Headers

  ```json
  {
    "access_token": "string"
  }
  ```

#### Response

_200 - OK_

- Body

  ```json
  {
    "statusCode": 200,
    "data": [
      {
        "id": "integer",
        "name": "string",
        "createdAt": "date",
        "updatedAt": "date",
      },
      ...
    ]
  }
  ```

<br/>
### GET /histories

#### Description

- Get all the histories data

#### Request

- Headers

  ```json
  {
    "access_token": "string"
  }
  ```

#### Response

_200 - OK_

- Body

  ```json
  {
    "statusCode": 200,
    "data": [
      {
        "id": "integer",
        "title": "string",
        "description": "string",
        "updatedBy": "integer",
        "createdAt": "date",
        "updatedAt": "date",
      },
      ...
    ]
  }
  ```

  <br/>

### POST /pub/login

#### Request:

- headers:

  ```json
  {
    "Content-Type": "application/json
  }
  ```

- body:

  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

#### Response:

_Response (200 - OK)_

```json
{
  "access_token": "string",
  "email": "string",
  "role": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "statusCode": 400,
  "error": {
    "message": "Email or password is required"
  }
}
```

_Response (401 - Unauthorized)_

```json
{
  "statusCode": 401,
  "error": {
    "message": "Invalid username or email or password"
  }
}
```

<br/>
### POST /pub/register

#### Request:

- headers:

  ```json
  {
    "Content-Type": "application/json
  }
  ```

- body:

  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "statusCode": 400,
  "error": {
    "message": ["string"]
  }
}
```

<br/>
### POST /pub/gLogin

#### Request:

- headers:

  ```json
  {
    "google_token": "string"
  }
  ```

#### Response:

_Response (200 - OK)_

```json
{
  "statusCode": 200,
  "access_token": "string",
  "message": "string"
}
```

<br/>
### GET /pub/products

#### Description

- Get all the products data

#### Response

_200 - OK_

- Body

  ```json
  {
    "statusCode": 200,
    "data": [
      {
        "id": "integer",
        "name": "string",
        "description": "string",
        "price": "integer",
        "stock": "integer",
        "imgUrl": "text",
        "categoryId": "integer",
        "authorId": "integer",
        "status": "Active",
        "rating": "integer",
        "totalReviews": "integer",
        "Category": {
            "id": "integer",
            "name": "string",
        }
      },
      ...
    ],
    "total": "integer",
  }
  ```

<br/>
### GET /pub/products/:id

#### Description

- Get a product data based on given id

#### Request

- params

  ```json
  {
    "id": "integer"
  }
  ```

#### Response

_200 - OK_

- Body

  ```json
  {
    "statusCode": 200,
    "data": {
      "id": "integer",
      "name": "string",
      "description": "string",
      "price": "integer",
      "stock": "integer",
      "imgUrl": "text",
      "categoryId": "integer",
      "authorId": "integer",
      "status": "Active",
      "deletedAt": "date",
      "rating": "integer",
      "totalReviews": "integer",
      "createdAt": "date",
      "updatedAt": "date"
    },
    "qrCode": "string"
  }
  ```

_404 - Not Found_

- Body

  ```json
  {
    "statusCode": 404,
    "error": {
      "message": "Error Product Not Found"
    }
  }
  ```

  <br/>

### GET /pub/categories

#### Description

- Get all the categories data

#### Response

_200 - OK_

- Body

  ```json
  {
    "statusCode": 200,
    "data": [
      {
        "id": "integer",
        "name": "string",
      },
      ...
    ]
  }
  ```

  <br/>

### GET /pub/bookmarks

#### Description

- Get all the bookmarks data

#### Request

- Headers

  ```json
  {
    "access_token": "string"
  }
  ```

#### Response

_200 - OK_

- Body

  ```json
  {
    "statusCode": 200,
    "data": [
      {
        "id": "integer",
        "CustomerId": "integer",
        "ProductId": "integer",
        "Product": {
            "id": "integer",
            "name": "string",
            "description": "string",
            "price": "integer",
            "stock": "integer",
            "imgUrl": "text",
            "categoryId": "integer",
            "authorId": "integer",
            "status": "Active",
            "rating": "integer",
            "totalReviews": "integer",
            "Category":{
                "id": "integer",
                "name":"string"
            }
        }
      },
      ...
    ],
    "total": "integer",
  }
  ```

<br/>
### POST /pub/bookmarks/:ProductId

#### Description

- Create a new bookmark data

#### Request

- Headers

  ```json
  {
    "access_token": "string"
  }
  ```

- params

  ```json
  {
    "ProductId": "integer"
  }
  ```

#### Response

_201 - Created_

- Body

  ```json
  {
    "statusCode": 201,
    "message": "{Product Name} is added to bookmark!",
    "data": {
      "id": "integer",
      "CustomerId": "integer",
      "ProductId": "integer"
    }
  }
  ```

_400 - Bad Request_

- Body

  ```json
  {
    "statusCode": 400,
    "error": {
      "message": ["string"]
    }
  }
  ```

_404 - Not Found_

- Body

  ```json
  {
    "statusCode": 404,
    "error": {
      "message": "Error Product Not Found"
    }
  }
  ```

  <br/>

### DELETE /pub/bookmarks/:id

#### Description

- Remove a bookmark data based on given id

#### Request

- Headers

  ```json
  {
    "access_token": "string"
  }
  ```

- params

  ```json
  {
    "id": "integer"
  }
  ```

#### Response

_200 - OK_

- Body

  ```json
  {
    "statusCode": 200,
    "message": "{Product Name} is removed from bookmark!"
  }
  ```

_404 - Not Found_

- Body

  ```json
  {
    "statusCode": 404,
    "error": {
      "message": "Error Product Not Found"
    }
  }
  ```

  <br/>

### Global Error

#### Response

_500 - Internal Server Error_

- Body
  ```json
  {
    "statusCode": 500,
    "error": {
      "message": "Internal Server ERROR"
    }
  }
  ```
