/*
3: 45 -> 140
4: 32 -> 99
5: 26 -> 81
6: 23 -> 70
7: 21 -> 63
8: 19 -> 58

Limit the input as above, and backtracking
*/
g = [];
g[3] = []; for (n = 45; n <= 140; ++n) {
    t = n*(n+1)/2;
    (t-Math.floor(t/100)*100) >= 10 && g[3].push(t);
}
g[4] = []; for (n = 32; n <= 99; ++n) {
    t = n*n;
    (t-Math.floor(t/100)*100) >= 10 && g[4].push(t);
}
g[5] = []; for (n = 26; n <= 81; ++n) {
    t = n*(3*n-1)/2;
    (t-Math.floor(t/100)*100) >= 10 && g[5].push(t);
}
g[6] = []; for (n = 23; n <= 70; ++n) {
    t = n*(2*n-1);
    (t-Math.floor(t/100)*100) >= 10 && g[6].push(t);
}
g[7] = []; for (n = 21; n <= 63; ++n) {
    t = n*(5*n-3)/2;
    (t-Math.floor(t/100)*100) >= 10 && g[7].push(t);
}
g[8] = []; for (n = 19; n <= 58; ++n) {
    t = n*(3*n-2);
    (t-Math.floor(t/100)*100) >= 10 && g[8].push(t);
}

function search() {
    len++;
    if (len == maxlen) {
        if (r[len-1]%100 != Math.floor(r[0]/100)) {
            len--;
            return;
        }
        console.log('r =', r);
        console.log('sum =', r.reduce((a,b) => a+b));
        console.log('rs =', rs);
        len--;
        return;
    }
    for (var i = 4; i <= 8; ++i) {
        if (m[i]) continue;
        m[i] = 1;
        rs[len] = i;
        for (var j = 0; j < g[i].length; ++j) {
            if (r[len-1]%100 != Math.floor(g[i][j]/100)) continue;
            r[len] = g[i][j];
            search();
        }
        m[i] = 0;
    }
    len--;
}
maxlen = 6; r = []; rs = [3]; m = []; len = 0; for (var j = 0; j < g[3].length; ++j) {
    r[0] = g[3][j];
    search();
} console.log('done');
