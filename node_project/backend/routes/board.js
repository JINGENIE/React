let express = require('express');
let router = express.Router();
let commonDB = require("./commonDB");
let commonUtil = require("./commonUtil");

/* GET home page. */
router.get('/list/:pg', async function (req, res, next) {
    let pg = parseInt(req.params.pg);
    //pg=1 0 (pg-1)*10 0 pg=2 10 (2-1)*10 0

    let sql = `SELECT COUNT(*) cnt
            FROM tb_board A
            LEFT OUTER JOIN (SELECT @rownum:=0) B
            ON 1=1
            LEFT OUTER JOIN tb_member C
            ON A.WRITER = C.USERID`;
    //
    let results = await commonDB.mysqlRead(sql, []);
    let totalCnt = results[0]["cnt"];
    //
    sql = `SELECT *
         FROM (SELECT A.ID, A.TITLE, DATE_FORMAT(A.WDATE, '%Y-%m-%d') AS WDATE, C.USERNAME
         ,@ROWNUM:=@ROWNUM+1 AS NUM
         FROM tb_board A
         LEFT OUTER JOIN (SELECT @rownum:=0) B
         ON 1=1
            LEFT OUTER JOIN tb_member C
            ON A.WRITER = C.USERID
            ORDER BY ID DESC
        ) A
        LIMIT ${ (
        pg - 1
    ) * 10},10
        `;
    results = await commonDB.mysqlRead(sql, []);

    res.render('board/board_list', {
        session: req.session,
        boardList: results,
        totalCnt: totalCnt,
        pg: pg,
        paging: commonUtil.getPaging(pg, totalCnt)
    });
});
//
router.get('/view/:id', async function (req, res, next) {
    let id = req.params.id;
    let sql = `select id, title, writer, contents, date_format(wdate, '%Y-%m-%d') wdate from tb_board WHERE id = ?`;
    let results = await commonDB.mysqlRead(sql, [id]);
    res.render('board/board_view', {item: results[0]});
});


// router.get('/view', async function(req, res, next) {   let sql =   `select
// from tb_board where id=${id} title=${title} contents=${contents} id=${id}`;
// let results = await commonDB.mysqlRead(sql,[]);
// res.render('board/board_view', { boardList:results }); });
module.exports = router;
