# Lyft Application
This is just a small web application to satisfy the requirements of the Lyft application.

It has a (very) barebones index.html that is served/has its script served by a vanilla Node server running on port 3000. 

The server only accepts GET to '/', '/src/index.js', and POST to '/test'.

A POST to '/test' will parse the request body, if it is properly formatted (see below) it will respond with every 3rd character of the string submitted on the request body.

### Example Request/Response:

Request Body Object:
```
{  
  string_to_cut: 'some string'  
}  
```


Response Object:
```
{  
  return_string: 'msi'  
}
```

The request MUST have the key 'string_to_cut' with a value that is a string, or else it will return a generic error:

```
Request not formatted properly. Requires key 'string_to_cut' to have a value that is a string.
```

## Starting the Application

This is a vanilla Node server, so, as long as Node is installed, simply:

```
node server/server.js
```
as there are no additional dependencies to install.

## Endpoints

### '/test'
This endpoint will accept POST requests. POST requests that do not follow the format
```
{
  string_to_cut: 'string'
}
```
will receive an error message and a 400 status code. 

### '/'
This endpoint will serve index.html.

### '/src/index.js'
This endpoint will serve index.js for client scripts.

### Other
Any other endpoint will be served a 404 error.
