var express= require("express");
var app = express();

//get- get방식으로 온것만
//post- post 방식으로 온것만
//get -get방식으로 온것만
//post - post방식으로 온것만
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
app.get("/userinfo2",(req, res)=>{
    //req.params.name;
    let userinfo={name:req.query.name, "phone" : req.query.phone};
    res.send(userinfo); //send함수를 이용해서 json 데이터 송신
})
//userinfo3/brown/user01
app.get("/userinfo3/:username/:userid",(req, res)=>{
    //req.params.name;
    console.log(req.params);
    let userinfo={
        username:req.params.username, 
        userid:req.params.userid};
    res.send(userinfo); //send함수를 이용해서 json 데이터 송신
});


app.post("/post", (request, response)=>{
    //다른 url처리 없을때 처리한다
    
        response.writeHead(200,{"content-type":"text/html"});
        response.end("<h1>post</h1>")
    
    });

app.listen(4000,()=>{
    console.log("server start http://127.0.0.1:4000")
})