var express= require("express");
var app = express(); //서버만들었음
//bodyParser모듈이 있는데 모듈을 설치하고 => express자체적으로 
//body에 데이터를 가져온다. 



app.use(express.urlencoded({extended:false}));
//미들웨어, app객체 만들고 다른 url처리전에만 호출되면 된다.


app.get("/userinfo",(req, res)=>{

    let userinfo={name:"Tom", "phone" : "010-0000-0000"};
    res.send(userinfo); //send함수를 이용해서 json 데이터 송신
})

//userinfo2?name=Jane&phone=0100000000
//http://127.0.0.1:4000/gugu?dan=4

// app.get("/gugu", (req, res) => {
//     let dan = parseInt(req.query.dan);
//     let result = {};
  
//     for (let i = 1; i <= 9; i++) {
//       result[i] = i * dan;
//     }
  
//     res.send(result); // send the result as a JSON object
//   });
app.get("/gugu", (req, res) => {
    let dan = parseInt(req.query.dan);
    let results = [];
  
    for (let i = 1; i <= 9; i++) {
      results.push({
        expression: `${dan} x ${i}`,
        result: dan * i
      });
    }
  
    res.render("gugu", {
      dan: dan,
      results: results
    });
  });







//
app.get("/add",(req, res)=>{
    //req.params.name;
    let x= req.query.x;
    let y= req.query.y;
    let z= parseInt(x)+ parseInt(y);
    res.send({x:x, y:y, "x+y":z}); //send함수를 이용해서 json 데이터 송신
})

    //http://127.0.0.1:4000/add/45/7

// app.get("/add/:x/:y", (req, res) => {
//     let x = parseInt(req.params.x);
//     let y = parseInt(req.params.y);
//     let result = x + y;
//     res.send(result.toString()); // convert the result back to a string before sending it as a response
//   });
app.get("/add/:x/:y",(req,res)=>{
    let x= req.params.x;
    let y= req.params.y;
    let z= parseInt(x)+ parseInt(y);
    res.send({x:x, y:y, "x+y":z});
})
app.post("/post", (request, response)=>{
    //다른 url처리 없을때 처리한다
    
        response.writeHead(200,{"content-type":"text/html"});
        response.end("<h1>post</h1>")
    
    });

app.listen(4000,()=>{
    console.log("server start http://127.0.0.1:4000")
})

//get 방식의 경우 ?x=4&y=5 request.query.x
//get 방식의 경우 /4/5 request.params.x
//post의 경우에는 app.use(express.urlencoded({extended:false}));가 선행되고 나면 
//requset.body.x로 처리한다.

