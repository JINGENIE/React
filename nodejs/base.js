let http = require("http");
let server = http.createServer((request, response)=>{
    response.writeHead(200, {'Content-Type' :'text/html;charset=utf-8'});
    response.end("<H1>기본 서버입니다.</H1>")
})
server.listen(3000, ( )=>{
    console.log("server start http://127.0.0.1:3000");
});