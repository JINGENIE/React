//board.js에서 디비접근 , member.js 디비접근 == 디비에 데이터 읽고 쓰기 전문 코드

let mysql = require("mysql");
const DBInfo ={
    //공통의 정보들을 제이슨으로, 변경되지 않으니까 const로 했댱
    connectionLimit:10,
    host:"localhost",
    user:"user01",
    password:"1234",
    database:"mydb",
    port:3306

};
let readpool = mysql.createPool(DBInfo); //db연결하는 아이
async function mysqlRead(sql,params)
{
    let promise = new Promise((resolve, reject)=>{
        readpool.getConnection((err,conn)=>{
            if(err)
            {
                console.log(err);
                reject(err);
            }
            conn.query(sql, params, (err,rows)=>{
                console.log(sql);
                console.log(rows);
                if(err)
                    reject(err);
                else
                    resolve(rows);
                conn.release();
            })
        })
    });
    await promise;
    return promise;
}

exports.mysqlRead = mysqlRead;
exports.DBInfo = DBInfo;