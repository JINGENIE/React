import React, {useState} from "react";
function Counter(){
    const [x, setX]=React.useState(0);
    const [y, setY]=React.useState(0);
    const [z, setZ]=React.useState(0);

    function xChange(e){
        setX(e.target.value);
    };
    function yChange(e){
        setY(e.target.value);
    };
    function aChange(a){
        setA(e.target.value);
    };
    const add = ()=>{
        setZ(parseInt(x)+parseInt(y)+parseInt(a));
    }
    const avg = ()=>{
        setZ(add/3);
    }
    return(
        <div>
            국어: <input type="text" onChange={xChange}/><br/>
            영어: <input type="text" onChange={yChange}/><br/>
            수학: <input type="text" onChange={aChange}/><br/>
            <h1>{z}</h1>
            <button type="button" onClick={add}>총점</button>
            <button type="button" onClick={avg}>평균</button>
        </div>
    )
}

export default Counter;