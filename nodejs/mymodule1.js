function add(x,y){
    return x+y;
}

function sigma (limit=10){
    s=1;
    for(i=1; i<=limit; i++)
          s+=i;
    return s;
}

exports.add = add;
exports.sigma = sigma;