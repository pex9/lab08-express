# Lab 08 - APIs with Express

## List of APIs offered by the server

Provide a short description for API with the required parameters, follow the proposed structure.

* [HTTP Method] [URL, with any parameter]
* [One-line about what this API is doing]
* [Sample request, with body (if any)]
* [Sample response, with body (if any)]
* [Error responses, if any]

### Film Management

#### Get all films

* HTTP method: GET  URL: `/api/films/`
* Description: Retrieve all the films that needed.
* Request body: none
* Response: return an array of films stored in the database.
* Response body:   `200 OK`(success) , `500 Internal Server error` (not present or unavailable)

``` json
[
 {
    "id": 2,
    "title": "21 Grams",
    "favorite": 1,
    "watchDate": "2023-03-17",
    "rating": 4,
    "user": 1
  }
 {
    "id": 2,
    "title": "21 Grams",
    "favorite": 1,
    "watchDate": "2023-03-17",
    "rating": 4,
    "user": 1
  }
]
```

#### Get film by id

* HTTP method: `GET`  URL: `/api/films/:id`
* Description: Get the film corresponding to the id 
* Request body: _None_
* Response: `200 OK` (success) , `500 Internal Server error` (not present or unavailable),`404 Not found` (Wrong id)
* Response body: One object describing the required film by id

``` JSON
[
  {
    "id": 2,
    "title": "21 Grams",
    "favorite": 1,
    "watchDate": "2023-03-17",
    "rating": 4,
    "user": 1
  }
]
```

#### Add a new film

* HTTP method: `POST`  URL: `/api/films`
* Description: Add a new film to the films of user
* Request body: description of the object to add (user property, if present, is ignored and substituted with the value 1, film id value is not required and is ignored)

``` JSON
{
    "title": "21 Grams",
    "favorite": 1,
    "watchDate": "2023-03-17",
    "rating": 4,
    "user": 1
}
```

* Response: `200 Ok` (success) ,  `503 Service Unavailable` (database error)
* Response body: null

#### Update an existing film

* HTTP method: `PUT`  URL: `/api/films/:id`
* Description: Update values of an existing film, except the id (user property, if present, is ignored and substituted with the value 1)
* Request body: description of the object to update

``` JSON
{
    "id": 2,
    "title": "The Matrix",
    "favorite": 1,
    "watchDate": "2023-03-31",
    "rating": 5,
    "user": 1
}
```

* Response: `200 OK` (success)
* Response body: the object as represented in the database

* Error responses: `503 Service Unavailable` (database error)

#### Delete an existing film

* HTTP method: `DELETE`  URL: `/api/films/:id`
* Description: Delete an existing film 
* Request body: _None_

* Response: `200 OK` (success)
* Response body: an empty object
* Error responses:  `503 Service Unavailable` (database error)

#### Update favorite property of an existing film 

* HTTP method: `PUT`  URL: `/api/films/:id/favorite`
* Description: Update favorite property value of an existing film 
* Request body: value of the favorite property

``` JSON
{
    "id": 2,
    "favorite": 1,
}
```

* Response: `200 OK` (success)
* Response body: the object as represented in the database

* Error responses: `503 Service Unavailable` (database error)

#### Update rating property of an existing film 

* HTTP method: `PUT`  URL: `/api/films/:id/rating`
* Description: Update rating property value of an existing film 
* Request body: value of the rating property

``` JSON
{
    "id": 2,
    "rating": 5,
}
```

* Response: `200 OK` (success)
* Response body: the object as represented in the database

* Error responses: `503 Service Unavailable` (database error)
