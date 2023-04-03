let http = require("http");
let fs = require("fs");
let ejs = require("ejs"); //npm install ejs

let server = http.createServer((request, response)=>{
    fs.readFile("./html/test.html", (error, data)=>{
        if (error){
            response.writeHead(500, {'Content-Type' :'text/html;charset=utf-8'});
            response.end(`error`);   //오류상황임
            return;
        }
        response.writeHead(200, {'Content-Type' :'text/html;charset=utf-8'});
        response.end(data); //파일 내용을 브라우저로 보낸다

        //ejs템플릿엔진을 통해 html과 nodejs의 데이터결합
    })
});
server.listen(4000, ( )=>{
    console.log("server start http://127.0.0.1:4000");
});