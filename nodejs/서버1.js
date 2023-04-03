let http =require("http");

http.createServer(
    /*브라우저 http://127.0.0.1:3000서버로 액세스 요청이 들어오면 
    request객체 = 브라우저에서 요청한 정보를 담아오는 객체
    response 객체 = 서버에서 클라이언트로 정보를 보낼때 여기에 담아보낸다.*/
    
    (request,response)=>{
    response.writeHead(200,{'Content-Type':'text/html'});
    response.end("<h1>TGIFridays</h1>")
}).listen(3000,(request,response)=>{
    console.log("server start http://127.0.0.1:3000");
})
//listen 뒤의3000이 포트번호.
