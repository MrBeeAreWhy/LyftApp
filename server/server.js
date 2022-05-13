const http = require('http');
const fs = require('fs');
const PORT = 3000;

const server = http.createServer((request, response) => {
  if (request.method === 'GET' && request.url === '/'){
    //serve the client index.html file
    fs.readFile('./client/index.html', 'utf8', (err, data) => {
      if (err){
        console.log('Server error serving index.html:', err)
        response.writeHead(500, {'Content-Type': 'text/plain'});
        response.end('Internal server error.')
      }
      response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8', 'Content-Length': data.length + ''});
      response.end(data)
    });
    //serve the client index.js file
  } else if (request.method === 'GET' && request.url === '/src/index.js'){
    fs.readFile('./client/src/index.js', 'utf8', (err, data) => {
      if (err){
        console.log('Server error serving index.js:', err)
        response.writeHead(500, {'Content-Type': 'text/plain; charset=utf-8'});
        response.end('Internal server error.')
      }
      response.writeHead(200, {'Content-Type' : 'text/javascript; charset=utf-8', 'Content-Length': data.length + ''});
      response.end(data);
    })
  } else if (request.method === 'POST' && request.url === '/test'){
    //handles POST request to '/test' endpoint

    //Build out the incoming request body.
    let body = '';
    request.on('data', (data) =>{
      body += data;
    });

    //On 'end' event, parse the body and verify receipt of valid response.
    //If valid, parse the string at key "string_to_cut" and respond.
    //Otherwise respond with error code 400 and message.
    request.on('end', ()=>{
      const requestBody = JSON.parse(body);
      let responseText;
      let statusCode;
      if (requestBody.hasOwnProperty('string_to_cut') && typeof requestBody.string_to_cut === 'string'){
        responseText = stringParse(requestBody.string_to_cut);
        statusCode = 200;
      } else {
        responseText = 'Request not formatted properly. Requires key \'string_to_cut\' to have a value that is a string.';
        statusCode = 400;
      }
      const responseObj = JSON.stringify({return_string: responseText})
      response.writeHead(statusCode, {'Content-Type': 'application/json; charset=utf-8', 'Content-Length': responseObj.length + ''});
      response.end(responseObj);
    })

  } else {
    //Handle any unexpected requests.
    response.writeHead(404, {'Content-Type':'text/plain; charset=utf-8'});
    response.end('404 Not Found');
  }
}).listen(PORT, 'localhost', ()=>{
  console.log('Server listening on port', PORT)
});

//Helper function to parse the string before returning.
//Takes in str, returns every 3rd character
//e.g. 'abc' should return 'c'
function stringParse(str){
  let output = '';
  for (let i = 0; i < str.length; i++){
    if ((i + 1) % 3 === 0){
      output += str[i];
    }
  }
  return output;
}

module.exports = server;