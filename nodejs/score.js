var express= require("express");
var app = express();
var ejs = require("ejs");
app.set("view engine",ejs);
app.use(express.urlencoded({extended:false}));

let scoreData =[
    {id:1, name:"honggildong",kor:90,eng:80,mat:100}
]; //데이터로 사용된다.
app.get("/score/list",(req, res)=>{
    //views/score/score_list.ejs
    //express framework가 디자인파일들은 views 폴더에 놓기로 약속
    //response객체에 render라는 함수를 express가 추가
    //첫번째 매개변수 : html파일
    //두번째 매개변수 : 데이터를 JSON형태로 전달해야 한다
    //이 두개를 합해서 새로운 문서를 만들어 클라이언트로 전송한다
res.render("score/score_list.ejs", {scoreList:scoreData})  
//ejs엔진에서는 key값 scoreList로 받아들인다
});

app.get("/score/view/:id",(req, res)=>{
    let id = req.params.id;
    //filter는 해당 조건을 만족하는 모든 데이터를 배열로보낸다.
    //find함수는 조건에 만족하는첫번째 데이터만 보낸다(배열이 아님)
    let scoreItem= scoreData.find(score=>score.id==id);
    res.render("score/score_view.ejs",{score:scoreItem});
});

app.get("/score/write",(req, res)=>{
    res.render("score/score_write.ejs");
});

app.post("/score/save",(req, res)=>{
    let name = req.body.name;
    let kor =parseInt(req.body.kor);
    let eng =parseInt(req.body.eng);
    let mat =parseInt(req.body.mat);
    let id =0; //젤 마지막에 있는 데이터의 id+1를 해야한다.
   id = scoreData[scoreData.length-1].id+1;
   let data = {id:id, name:name, kor:kor, eng:eng, mat:mat};
   scoreData.push(data);
   //redirect함수를 이용해서 /score/list를 호출해야한다. 
   res.redirect("/score/list");
});

app.use("/",(request,response)=>{
    response.render("index.ejs");
});

app.use((request,response)=>{
    response.writeHead(200,{"content-type":"text/html"});
    response.end("<h1>404 error</h1>");
});

app.listen(4000,()=>{
    console.log("server start http://127.0.0.1:4000");
})
