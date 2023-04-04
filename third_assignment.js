var express = require('express');
var fs = require("fs");
var ejs = require("ejs");
const { request } = require('https');
var app = express();

app.use(express.urlencoded({extended:false}));
app.get("/calcform",(requset,response)=> 
fs.readFile("./html/second_assignment.html","utf-8",(err,data)=>{
    response.writeHead(200,{"Content-type":"text/html"});
    response.end(ejs.render(data));
}))

app.get("/calc", (request,response)=>{
    let name = request.query.name;
    let kor = parseInt(request.query.kor);
    let eng = parseInt(request.query.eng);
    let math = parseInt(request.query.math);
    let result ="";
    result += `${name}의 총점은 ${kor+eng+math}이고
    평균은 ${(kor+eng+math)/3}입니다.`
    response.send(result);
})
app.use((request, response)=>{
    response.writeHead(200, {"Content-type":"text/html"});
    response.end("<h1>Express</h1>")
});
app.listen(4000, () => {
    console.log("server start http://127.0.0.1:4000");
  });
  