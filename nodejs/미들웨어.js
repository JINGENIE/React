var express = require("express");
var app = express();

app.use((request, response, next) => {
  request.name = "홍길동";
  response.name = "john";
  console.log("a");
  next();
});

app.use((request, response, next) => {
  console.log("b");
  request.phone = "01000000000";
  response.address = "서울특별시 영등포구";
  next();
});

app.use((request, response, next) => {
  response.writeHead(200, { "Content-type": "text/html" });
  console.log(request.name);
  console.log(response.name);
  console.log(request.phone);
  console.log(response.address);

  response.end("<h1>홍길동</h1>");
});

app.listen(4000, () => {
  console.log("server start http://127.0.0.1:4000");
});
