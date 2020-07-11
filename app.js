const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Enter Message</title><head>');
    res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
    res.write('</html>');
    return res.end();
  }
  if (url === '/message' && method === 'POST') {
    // efinig a function to be exectued  for every incoming data piece
    const body = []; 
    req.on('data', (chunk)=>{
      // here we recieve a chunk of data and do something to interact with these chunks
      body.push(chunk)
      console.log(chunk);
    });
    // event is fired once done parsing the incoming request data
    req.on('end',()=>{
      // this will be done once parsng the incoming requests.. and parsedbody is buffer here
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1]
      // fs.writeFileSync('message.txt', 'DUMMY');
      fs.writeFileSync('message.txt', message);
      res.statusCode = 302;
      res.setHeader('Location', '/');
      return res.end();
    })
    
  
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My First Page</title><head>');
  res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
  res.write('</html>');
  res.end();
});

server.listen(3000);



