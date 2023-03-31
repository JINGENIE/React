let http =require("http");

http.createServer((request,response)=>{
    response.writeHead(200,{'Content-Type':'text/html'});
    response.end("<h1>TGIFridays</h1>")
}).listen(3000,(request,response)=>{
    console.log("server start http://127.0.0.1:3000");
})
//listen 뒤의3000이 포트번호.
