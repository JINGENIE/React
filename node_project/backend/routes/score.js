var express = require('express');
var router = express.Router();
let commonDB =require('./commonDB');

/* GET home page. */
router.get('/list', async function(req, res, next) {
    let sql=`
    SELECT 
        A.ID
    , A.STUDENT_NAME
    , A.KOR
    , A.ENG
    ,A.MAT
    ,DATE_FORMAT(A.WDATE, '%Y-%m-%d') WDATE
    FROM TB_SCORE A;
    `
    let results = await commonDB.mysqlRead(sql,[]);
    res.json(results);

});
router.post('/write', async function(req, res, next) {
    try
    { 
        let student_name =req.body.student_name;
        let kor=req.body.kor;
        let eng=req.body.eng;
        let mat=req.body.mat;
        sql=`INSERT INTO TB_SCORE (STUDENT_NAME,KOR,ENG,MAT,WDATE)
        VALUES(?,?,?,?,NOW())`;
        await commonDB.mysqlRead(sql,[student_name,kor,eng,mat]);
            res.json({"result" :"success"});}
    catch(e){
        console.log(e);
        res.json({"result":"fail"});
    }
});

router.post('/update', async function(req, res, next) {
    try
    { 
        let student_name =req.body.student_name;
        let kor=req.body.kor;
        let eng=req.body.eng;
        let mat=req.body.mat;
        sql=`INSERT INTO TB_SCORE (STUDENT_NAME,KOR,ENG,MAT)
        VALUES(?,?,?,?,NOW())`;
        await commonDB.mysqlRead(sql,[student_name,kor,eng,mat]);
            res.json({"result" :"success"});}
    catch(e){
        console.log(e);
        res.json({"result":fail});
    }
});


router.get('/view/:id', async function(req, res, next) {
    try
    { 
        let student_name =req.body.student_name;
        let kor=req.body.kor;
        let eng=req.body.eng;
        let mat=req.body.mat;
        sql=`INSERT INTO TB_SCORE (STUDENT_NAME,KOR,ENG,MAT)
        VALUES(?,?,?,?,NOW())`;
        await commonDB.mysqlRead(sql,[student_name,kor,eng,mat]);
            res.json({"result" :"success"});}
    catch(e){
        console.log(e);
        res.json({"result":fail});
    }
});

module.exports = router;
