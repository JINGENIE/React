async function sigma(limit)
{
    sum=0;
    for(i=0; i<=limit;i++)
    sum+=i;
    return sum;//async에 의해서 무조건 promise객체로 바뀌어서 전달된다.
}

//console.log(sigma(100));
 async function showDisplay()
{
// sigma(100)
// .then((result)=>{
//     console.log(result);
// });
    let result= await sigma(1000); //연산이 끝날때까지 기다리는데 이 function 자체도 async여야한다.
    console.log(result);
}

showDisplay(); //함수 호출하기 