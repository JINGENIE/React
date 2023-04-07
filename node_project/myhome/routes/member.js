var express = require('express'); //node+modules 폴더에 있으면 경로 안써줘도 되고
var router = express.Router();
let commonDB = require("./commonDB");
/* GET home page. */
router.get('/', function(req, res, next) {
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


router.get('/login', function(req, res, next) {
  res.render('member/member_logon');
});
//세션정보저장
router.get('/put', async function(req, res, next) {
  let userid = req.query.userid;
  req.session["userid"]=userid;
  console.log(req.session["userid"]);
});
module.exports = router;
