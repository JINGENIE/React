var express = require("express")
var fs = require("fs");
var ejs = require("ejs");

var app = express();   //서버 만들었음


//bodyParse--install bodyParser를 하고 해야 한다.
//새버전에서는 express가 갖고 있다.
//post로 전송할때 request.body에 보낸 정보를 추가해서 사용이 간편하도록 도와주는 미들웨어이다
app.use(express.urlencoded({extended:false}));


app.get("/guguform", (request, response)=>{
     fs.readFile("./html/guguform.html", "utf-8", (err,data)=>{
        response.writeHead(200,{"Content-type":"text/html"});
        response.end(ejs.render(data));
    })    
});


app.get("/gugu",(request, response)=>{
  let dan = request.query.dan;
  let result ="";
  for(i=1; i<=9; i++){
    result += `<p style="color:blue; font-size:14pt"> 
    ${dan} * ${i} = ${dan*i}</p>`;
  }
//   console.log(result);
//   response.writeHead(200, { "Content-type": "text/html" });
  response.send(result);
});

app.use((request, response)=>{
    response.writeHead(200,{"Content-type":"text/html"});
    response.end("<H1>Express</H1>");

});

app.listen(4000, ()=>{
    console.log("server start http://127.0.0.1:4000");
})