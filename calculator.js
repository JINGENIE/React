import React, { useState } from "react";

function Counter() {
  const [kor, setKor] = React.useState(0);
  const [eng, setEng] = React.useState(0);
  const [math, setMath] = React.useState(0);
  const [name, setName] = React.useState("");
  const [result, setResult] = useState(null);

  function korChange(e) {
    setKor(e.target.value);
  }
  function engChange(e) {
    setEng(e.target.value);
  }
  function mathChange(e) {
    setMath(e.target.value);
  }
  function nameChange(e) {
    setName(e.target.value);
  }


  const handleResult = () => {
    const add = parseInt(kor) + parseInt(eng) + parseInt(math);
    const avg = (parseInt(kor) + parseInt(eng) + parseInt(math)) / 3;
    setResult(`${name}의 총점은 ${add}이고 평균은 ${avg}입니다.`);
  };

  return (
    <div>
      이름: <input type="text" onChange={nameChange} />
      <br />
      국어: <input type="text" onChange={korChange} />
      <br />
      영어: <input type="text" onChange={engChange} />
      <br />
      수학: <input type="text" onChange={mathChange} />
      <br />

      <button onClick={handleResult}>결과확인</button>
      <p>{result}</p>
      {/* {!result && (
        <div>
         <button onClick={handleResult}>결과확인</button>
        </div>
      )}
      {result && (
        <div>
          <p>{result}</p>
        </div>
      )} */}
    </div>
  );
}

export default Counter;