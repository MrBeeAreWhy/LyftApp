# Lyft Application
This is just a small web application to satisfy the requirements of the Lyft application.

It has a (very) barebones index.html that is served by a vanilla Node.js server on port 3000.

The index page has an input box that can be submitted to the server, and the server will return every 3rd character (i.e. str[2], str[5], ...).


Example:

Request Body Object:
{
  string_to_cut: 'some string'
}

Response Object:
{
  return_string: 'msi'
}

## Starting the Application

This is a vanilla Node.js server, so, as long as Node is installed, simply:
```
node server/server.js
```

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