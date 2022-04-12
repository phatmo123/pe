/*
https://projecteuler.chat/viewtopic.php?t=3481

*/
n = 10;
s = 0;
t0 = performance.now();

function todo(i, lastj) {
    var j, k, t;
    if (i == free) {
        // check prime
        if (prime(t = mark.join('')))
            r.push(t);
        return;
    }
    
    if (i == 0 && d == 0) {
        // free digit must go begin, because d can not
        j = 0;
        for (k = 0; k < 10; ++k) { // choose free digit
            if (k == d)
                continue;
            mark[j] = k;
            todo(i + 1, j);
            mark[j] = d;
        }
    }
    else if (i == free1 && ![1, 3, 7, 9].includes(d)) {
        // free digit must go end, because d can not
        j = n - 1;
        for (k = 0; k < 10; ++k) { // choose free digit
            if (k == d)
                continue;
            mark[j] = k;
            todo(i + 1, j);
            mark[j] = d;
        }
    }
    else {
        t = n - free1 + i;
        for (j = lastj + 1; j < t; ++j) {
            // choose place, can not choose place before lastj
            for (k = 0; k < 10; ++k) {
                // choose free digit
                if (
                    k == d
                    || j == 0 && k == 0
                )
                    continue;
                mark[j] = k;
                todo(i + 1, j);
                mark[j] = d;
            }
        }
    }
}
        
for (d = 0; d < 10; ++d) {
    r = [];
    if (d != 0)
        m = n - 1; // M(n, d)
    else
        m = n - 2;
    do {
        free = n - m;
        free1 = free - 1; // d != 0 => free1 > 0
        mark = [];
        for (i = 0; i < n; ++i)
            mark[i] = d;
        
        todo(0, -1);
        m--;
    }
    while (r.length == 0 && m > 1);
    s += r.sum();
}
t1 = performance.now();
console.log((t1-t0)/1e3, 's');
s;
