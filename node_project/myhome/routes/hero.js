var express = require('express');
var router = express.Router();
let commonDB =require('./commonDB');

/* GET home page. */
router.get('/list', async function(req, res, next) {
    let sql=`
    SELECT A.id, A.hero_name, A.hero_desc, DATE_FORMAT(A.wdate, '%Y-%m-%d') wdate
    FROM tb_hero A;
    `
    let results = await commonDB.mysqlRead(sql,[]);
    res.json(results);
//  res.json(
//     [
//         {id:1,  name:"땡자1", descr:"땡자사랑해1"},
//         {id:2,  name:"땡자2", descr:"땡자사랑해2"},
//         {id:3,  name:"땡자3", descr:"땡자사랑해3"},
//         {id:4,  name:"땡자4", descr:"땡자사랑해4"},
//         {id:5,  name:"땡자5", descr:"땡자사랑해5"}
//     ]
//  )
});
router.post('/write', async function(req, res, next) {
    try
    { 
        let hero_name=req.body.hero_name;
        let hero_desc=req.body.hero_desc;
        sql=`INSERT INTO tb_hero (hero_name, hero_desc, wdate)
        VALUES(?,?,NOW())`;
        await commonDB.mysqlRead(sql,[hero_name,hero_desc]);
            res.json({"result" :"success"});}
    catch(e){
        console.log(e);
        res.json({"result":fail});
    }
});
module.exports = router;
