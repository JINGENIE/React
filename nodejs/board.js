var express= require("express");
var app = express();

var fs = require("fs");
var ejs = require("ejs");

app.set("view engine",ejs); 
app.use(express.urlencoded({extended:false}));

let boardList= [
    {id:1, title:"제목1" ,writer:"작성자1", wdate:"2023-04-04"},
    {id:2, title:"제목1" ,writer:"작성자2", wdate:"2023-04-05"},
    {id:3, title:"제목1" ,writer:"작성자3", wdate:"2023-04-06"},
    {id:4, title:"제목1" ,writer:"작성자4", wdate:"2023-04-07"},
    {id:5, title:"제목1" ,writer:"작성자5", wdate:"2023-04-08"}
 
]

app.use("/board/list",(request, response)=>{
    response.render("board/board_list.ejs",{boardList:boardList});
});
app.use("/board/view/:id",(request, response)=>{
    let id= request.params.id;
    let item = boardList.filter(x=>x.id==id);
    response.render("board/board_view.ejs",{item:item[0]});
});
//페이지만 이동 board_write.ejs로 이동만한다. 
app.use("/board/write",(request, response)=>{
    response.render("board/board_write.ejs");
});
//저장
app.use("/board/save",(request, response)=>{
    let title = request.body.title;
    let contents = request.body.contents;
    let writer = request.body.writer;
    let id= boardList.length+1;
    boardList.push({id:id, title:title, contents:contents, writer:writer});
    response.redirect("/board/list");//강제이동

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