var express = require('express'); //node+modules 폴더에 있으면 경로 안써줘도 되고
var router = express.Router();
let commonDB = require("./commonDB");
/* GET home page. */
router.get('/', function(req, res, next) { //회원가입을 처음에 초기화면으로 만들었어서
  res.render('member/member_register', { title: 'Express' });
});
//아이디 중복체크 --클라이언트로 부터 아이디를 받는다.
//받아온 아이디를 디비에 가서 존재하는지 유무확인, 이미 존재하여 사용불가하면 fail을 사용자에게 보내주고
//사용가능하면 success 반환하기
router.use('/idcheck', async function(req, res, next) {
  let userid =req.body.userid; //사용자단에서 userid
  sql =`select count(*) as cnt from tb_member where userid='${userid}'`;
  //cnt 
  let rows =await commonDB.mysqlRead(sql);
  let cnt = rows[0]["cnt"];
  if(cnt == 0)
    res.json({"result":"success"});
  else
    res.json({"result":"fail"});
});

router.use('/save', async function(req, res, next) {
  let userid = req.body.userid;
  let password = req.body.password;
  let username = req.body.username;
  let email = req.body.email;
  let phone = req.body.phone;
  let zipcode = req.body.zipcode;
  let address1 = req.body.address1;
  let address2 = req.body.address2;
  let nickname = req.body.nickname;
  let sql = `insert into tb_member(userid,password,username,email,phone,nickname,
    zipcode, address1, address2, wdate) values(?,?,?,?,?,?,?,?,?,now())`;


try{
  await commonDB.mysqlRead(sql, [userid,password,username,email,phone,nickname,
    zipcode, address1, address2]);
    res.json({"result":"success"});
  }
  catch(e){
    console.log(e);
    res.json({"result":"fail"});
  }
});

router.use("/logincheck", async function (req, res, next) {
  let userid = req.body.userid;
  let password = req.body.password;
  let sql = `select count(*) as cnt
             from tb_member
             where userid='${userid}'
             and password='${password}'`;
  let rows = await commonDB.mysqlRead(sql, [userid, password]);
  let cnt = rows[0]["cnt"];
  if (cnt == 1) res.json({ result: "success" });
  else res.json({ result: "fail" });
});


router.post('/login', async function(req, res, next) {
  let userid = req.body.userid;
  let password = req.body.password;
  let sql = `select * from tb_member where userid= '${userid}'`;
  let results = await commonDB.mysqlRead(sql);
  if(results.length==0)
    {
      res.json({"result":"fail", msg:"아이디가 없습니다."});
      return;
    }
  if(results[0]["password"] != password)
    {
      res.json({"result":"fail", msg:"패스워드가 일치하지 않습니다."});
      return;
    }
    req.session["username"] = results[0]["username"];
    req.session["userid"] = results[0]["userid"];
    req.session["email"] = results[0]["email"];

    console.log( results[0]["username"]);
    console.log( results[0]["userid"]);
    console.log( results[0]["email"]);
    
    res.json({"result":"success", msg:"로그온성공"});
});


router.use('/login', function(req, res, next) {
  res.render('member/member_logon');
});


//세션정보저장
router.get('/put', async function(req, res, next) {
  let userid = req.query.userid;
  req.session["userid"]=userid;
  console.log(req.session["userid"]);
});

router.use('/logout', async function(req, res, next) {
  req.session["userid"]="";
  req.session["username"]="";
  req.session["email"]="";

 // req.session.destroy(); //위의 주석처리 내용과 같은 기능
 res.redirect("/");  //로그아웃하고 나면 index
});
module.exports = router;
