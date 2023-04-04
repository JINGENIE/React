// var express= require("express");
// var app = express(); //서버만들었음




// app.get("/gugu", (req, res) => {
//   let dan =requset.query.dan;
//   let result ="";
//   for(i=1; i<=9; i++)
//   {
//     result += `${dan} * ${i} = ${dan*i}</br>`;
//   }
//   console.log(result);

//   response.writeHead(200,{"content-type":"text/html"});
//   response.end(result);

//   });

// //http://127.0.0.1:4000/gugu/4
//   app.get("/gugu/:dan", (req, res) => {
//     let dan =requset.params.dan;
//     let result ="";
//     for(i=1; i<=9; i++)
//     {
//       result += `${dan} * ${i} = ${dan*i}</br>`;
//     }
//     console.log(result);
  
//     response.writeHead(200,{"content-type":"text/html"});
//     response.end(result);
  
//     });



var express = require("express");
var app = express(); // 서버 만들었음
//http://127.0.0.1:4000/gugu?dan=4
app.get("/gugu", (request, response) => {
  let dan = request.query.dan;
  let result = "";
  for (i = 1; i <= 9; i++) {
    result += `${dan} * ${i} = ${dan * i}<br/>`;
  }
  console.log(result);
  response.writeHead(200, { "Content-type": "text/html" });
  response.end(result);
  //response.end(result); 데이터를 한번 더 보내면 에러발생함
});
//http://127.0.0.1:4000/gugu/4
app.get("/gugu/:dan", (request, response) => {
  let dan = request.params.dan;
  let result = "";
  for (i = 1; i <= 9; i++) {
    result += `${dan} * ${i} = ${dan * i}<br/>`;
  }
  console.log(result);
  response.writeHead(200, { "Content-type": "text/html" });
  response.end(result);
  //response.end(result); 데이터를 한번 더 보내면 에러발생함
});
app.use((request, response) => {
  response.writeHead(200, { "Content-type": "text/html" });
  response.end("<h1>Express</h1>");
});
app.listen(4000, () => {
  console.log("server start http://127.0.0.1:4000");
});s



