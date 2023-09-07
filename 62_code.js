/*
permutation => same digit count
=> check permutation in each range where digit count not change
*/

(function () {
a = []; s = 3; for (i = 10; i < 1e4; ++i) {
    if ((i*i*i).toString().length == s+1) {
        s++;
        a.push(i);
    }
} a;
g = []; for (i = 0; i < a.length - 1; ++i) {
    g[i] = [];
    for (j = a[i]; j < a[i+1] - 1; ++j) {
        g[i].push(j*j*j);
    }
	for (j = 0; j < g[i].length; ++j) {
        c = [g[i][j]];
        for (k = j+1; k < g[i].length; ++k) {
            if (noPermu(g[i][j], g[i][k])) {
                c.push(g[i][k]);
                if (c.length == 5) {
                    console.log(c, 'done');
                    return;
                }
            }
        }
    }
} console.log('done');
})(); // 127035954683