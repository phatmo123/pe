// https://en.wikipedia.org/wiki/Partition_function_(number_theory)#Recurrence_relations

pentalen = 400;
penta = []; for (i = 1; i <= pentalen;) {
    penta.push((3*i*i-i)/2);
    i > 0 ? (i = -i) : (i = -i +1);
}

pf = []; pf[0] = 1n;
function getP(n) {
    if (pf[n]) return pf[n];
    
    var s = 0n;
    for (var i = 0; i < pentalen;) {
        if (n-penta[i] >= 0)
            s += pf[n-penta[i]];
        else
            break;
        if (n-penta[i+1] >= 0)
            s += pf[n-penta[i+1]];
        else
            break;
        if (n-penta[i+2] >= 0)
            s -= pf[n-penta[i+2]];
        else
            break;
        if (n-penta[i+3] >= 0)
            s -= pf[n-penta[i+3]];
        else
            break;
        i += 4;
    }
    if (i > pentalen)
        console.log('Need penta');
    
    pf[n] = s;
    return s;
}

max = penta[pentalen-1];
for (i = 1; i <= max; ++i) // i can go to (3*pentalen*pentalen-pentalen)/2
    if (getP(i)%1000000n == 0)
        console.log('i =', i);
console.log('done');