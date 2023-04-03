

let http = require("http");
/*먼저 HTTP 서버를 만들기 위한 "http", 파일 읽기를 위한 
"fs", EJS 템플릿을 렌더링하기 위한 "ejs"를 포함하여
 필요한 Node.js 모듈을 가져오는 것으로 시작합니다.*/
let fs = require("fs");
let ejs = require("ejs"); //npm install ejs
/*다음으로 "http.createServer()" 메서드를 사용하여 
HTTP 서버를 만듭니다. 이 메서드는 들어오는 HTTP 요청에 대한 정보를 포함하는 "request" 
객체와 응답을 클라이언트로 다시 
보내는 데 사용하는 "response" 객체의 두 매개 변수가 있는 콜백 함수를 사용합니다.*/
let server = http.createServer((request, response)=>{
    fs.readFile("./html/test.html", "utf-8", (error, data)=>{
        if (error){
            response.writeHead(500, {'Content-Type' :'text/html;charset=utf-8'});
            response.end(`error`);   //오류상황임
            return;
        }
/*콜백 함수 내에서 "fs.readFile()"메서드를 사용하여 "./html/"디렉토리에있는 "test.html"라는 파일의 내용을 읽습니다. 
파일을 텍스트 파일로 읽으려고하므로 파일의 인코딩을 "utf-8"로 지정합니다. 
파일을 읽는 동안 오류가 발생하면 클라이언트에 500 오류 응답을 다시 보내고 반환합니다. */
        response.writeHead(200, {'Content-Type' :'text/html;charset=utf-8'});
        response.end(ejs.render(data, {
            name:"홍길동",
            age :23,
            address:"서울시 관악구",
            limit:10
        }
            )); //파일 내용을 브라우저로 보낸다

        //ejs템플릿엔진을 통해 html과 nodejs의 데이터결합
    })
});
server.listen(4000, ( )=>{
    console.log("server start http://127.0.0.1:4000");
});