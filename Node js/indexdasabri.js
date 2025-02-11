const http = require('http');
const server = http.createServer((request, response) => {
   response.writeHead(200, {'Content-Type': 'text/html'})
   response.end('<h1>Hello, world!!!</h1>')
 });
const PORT = 3000;
server.listen(PORT,() => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});