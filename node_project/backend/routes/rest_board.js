//rest_board.js
let express = require("express");
let router = express.Router();
let commonDB = require("./commonDB");
let commonUtil = require("./commonUtil");
router.use(express.urlencoded({extended: false}));

/* GET home page. */
// http://localhost:9090/rest_board/list/1 --> O
// http://localhost:9090/rest_board/list   --> X
router.get("/list/:pg", async function (req, res, next) {
    let pg = parseInt(req.params.pg);

    let sql = `SELECT COUNT(*) as cnt
             FROM tb_board A
             LEFT OUTER JOIN (SELECT @rownum:=0) B 
             ON 1=1
             LEFT OUTER JOIN tb_member C
             ON A.WRITER = C.USERID`;
    let results = await commonDB.mysqlRead(sql, []);
    let totalCnt = results[0]["cnt"];

    sql = `SELECT *
         FROM (SELECT A.ID
                     ,A.TITLE
                     ,DATE_FORMAT(A.WDATE, '%Y-%m-%d') AS WDATE
                     ,C.USERNAME
                     ,@ROWNUM:=@ROWNUM+1 AS NUM
               FROM tb_board A
               LEFT OUTER JOIN (SELECT @rownum:=0) B 
               ON 1=1
               LEFT OUTER JOIN tb_member C
               ON A.WRITER = C.USERID
               ORDER BY ID DESC) A
        LIMIT ${ (
        pg - 1
    ) * 10} ,10`;

    results = await commonDB.mysqlRead(sql, []);
    res.json({boardList: results, totalCnt: totalCnt, pg: pg}); // 하나의 함수 안에서 res.json 호출하고 다시 res.send나 render나 json 호출 못한다.
});

router.get("/view/:id", async function (req, res, next) {
    let id = req.params.id;
    sql = `select A.id, A.title, A.writer, A.contents, date_format(A.wdate, '%Y-%m-%d') wdate,
        (select username from tb_member B where A.writer = B.userid) username
        from tb_board A
        where id = ${id}`;
    /* 서브쿼리 :select 결과셋이 하나 또는 0일때 가능 ,from: 인라인뷰/where
         조인 -> 서브쿼리 -> 함수
         nested loop join -> for문 돌려서 조인을 한ㄷ.. 10이전버전
         hash join => 양쪽 테이블의 join 컬럼을 기준으로 해쉬테이블을 만들어 조인한다.
         (엄청빠름)
         선형검색(n번 비교), 이진검색(데이터가 순서대로 있을때), 해쉬검색(젤빠름) */
    let results = await commonDB.mysqlRead(sql, []);
    if (results.length == 0) {
        res.json({result: "fail", msg: "해당하는 데이터를 찾을수 없습니다."});
        return;
    }
    res.json({result: "success", msg: "", boardData: results[0]});
});

// http://localhost:9090/rest_board/save {title:"제목", writer:"test",
// contents:"내용"} 응답 성공시 result:"success". msg"등록성공' 응답 실패시 result:"fail".
// msg"등록실패'

router.post("/save", async function (req, res, next) {
    try {
        let title = req.body.title;
        let writer = req.body.writer;
        let contents = req.body.contents;
        let params = [title, writer, contents];
        sql = `insert into tb_board(title, writer, contents, wdate)
         values(?,?,?,now())`;
        await commonDB.mysqlRead(sql, params);
        res.json({result: "success", msg: "등록성공"});
    } catch (e) {
        console.log(e);
        res.json({result: "fail", msg: "등록실패"});
    }

});
router.post("/write", async function (req, res, next) {
    checkInfos = [
        {
            key: "title",
            type: "str",
            range: 200
        }, {
            key: "writer",
            type: "str",
            range: 40
        }, {
            key: "contents",
            type: "str",
            range: -1
        }
    ];
    //수행 결과값이 0이면 문제 없는거고 다른 숫자가 온다. 오류임
    insertInfo = commonUtil.checkInfo(req, checkInfos);
    if (insertInfo["result"] != 0) {
        res.json(insertInfo);
        return
    }
    let title = req.body.title;
    console.log(req.body);
    let writer = req.body.writer;
    let contents = req.body.contents;
    let sql = `select count(*) cnt from tb_member where userid='${writer}'`;
    results = await commonDB.mysqlRead(sql, []);
    if (results[0]["cnt"] == 0) {
        res.json({result: "fail", msg: "해당하는 아이디가 없습니다."});
        return;
    }
    sql = `insert into tb_board(title, writer,contents,wdate)
    values('${title}', '${writer}', '${contents}',now())`;

    await commonDB.mysqlRead(sql, []);

    res.json({result: "success"});
});

module.exports = router;