function getPaging(pg, totalCnt, pageGroupSize=10)
{
 /*                                 그룹번호
 1 2 3 4 5 6 7 8 9 10               1그룹
 11 12 13 14 15 16 17 18 19 20      2그룹
 21 22 23 24 25 26 27 28 29 30      3그룹
 
 (1-1)/10*10=0
 ,(2-1)/10*10=0
 ,...
 ,(10-1)/10*10=0
 ,(11-1)/10*10=10
  ,(21-1)/10*10=20
 전체 페이지 갯수를 확인해보고 어느그룹에 속하는지 확인해야한다. 
 */   
pnTotal = Math.ceil(totalCnt/10); //전체페이지 수
//한 페이지당 데이터가 10개일때, 15건, 2페이지 , 강제올림으로 

pgGroupStart = parseInt((pg-1)/pageGroupSize) * pageGroupSize+1;
pgGroupEnd= pgGroupStart+10;
if(pgGroupEnd>pnTotal)
    pgGroupEnd = pnTotal+1;

console.log(pg,pgGroupStart,pgGroupEnd);
//함수는 반환값이 하나이어야한다.json 객채로 만들어 보내자.
return {pnTotal:pnTotal, pnStart:pgGroupStart, pnEnd:pgGroupEnd, pg:pg}
}

// for(i=1;i<=32;i++)
// getPaging(i,320);

exports.getPaging = getPaging;
