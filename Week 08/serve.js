const http = require('http');

http.createServer((request, response) => {
  let body = [];
  request.on('error', (err) => {
    console.log('err');
  }).on('data', (chuck) => {
    body.push(chuck.toString());
  }).on('end', () => {
    body = Buffer.concat(body).toString();
    console.log(body);
    response.writeHead(200, {
      'Content-type': 'text/html'
    });
    response.end('Hello World\n');
  });
}).listen('8080');

console.log('serve is start');