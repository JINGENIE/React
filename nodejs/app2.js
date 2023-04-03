var express= require("express");
var app = express();

//http://127.0.0.1:4000/add?x=45&y=7

//http://127.0.0.1:4000/add/45/7
app.get("/get",(request, response)=>{
//다른 url처리 없을때 처리한다

    response.writeHead(200,{"content-type":"text/html"});
    response.end("<h1>get</h1>")

});


app.get("/userinfo",(req, res)=>{

    let userinfo={name:"Tom", "phone" : "010-0000-0000"};
    res.send(userinfo); //send함수를 이용해서 json 데이터 송신
})

//userinfo2?name=Jane&phone=0100000000
//http://127.0.0.1:4000/add?x=45&y=7
// app.get("/add",(req, res)=>{
//     //req.params.name;
//     let x= parseInt(req.query.x)
//     let y= parseInt(req.query.y);
//     let result = x+y;
//     res.send(result.toString()); //send함수를 이용해서 json 데이터 송신
// })


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