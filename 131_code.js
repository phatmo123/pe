/*
n3 + n2p = a3
(a-n)(a2+an+n2) = n2p

*/
n = 1e2;
a3 = [];
a2 = [];
for (i = 1; i <= n; ++i) {
    a2[i] = i**2;
    a3[i] = a2[i]*i;
}
for (i = 1; i <= n; ++i) {
    if (!prime(i))
        continue;
    (function() {
        for (j = 1; j <= n; ++j)
        for (k = j + 1; k <= n; ++k)
            if (a3[j] + a2[j]*i == a3[k]) {
                console.log(j + '**3 + ' + j + '**2 * ' + i + ' == ' + k + '**3');
                console.log(k == Math.cbrt(j)**2 * (Math.cbrt(j)+1));
                return;
            }
    })();
}
/*
1**3 + 1**2 * 7 == 2**3
8**3 + 8**2 * 19 == 12**3
27**3 + 27**2 * 37 == 36**3
64**3 + 64**2 * 61 == 80**3

216**3 + 216**2 * 127 == 252**3
729**3 + 729**2 * 271 == 810**3

1000**3 + 1000**2 * 331 == 1100**3
1331**3 + 1331**2 * 397 == 1452**3
2197**3 + 2197**2 * 547 == 2366**3
2744**3 + 2744**2 * 631 == 2940**3

n3 + n2p = a3
n always cube ?? n = k**3 ?
a = k**2 * (k+1) ??

k9 + k6p = k6*(k+1)3
=> k3 + p = (k+1)3 ?
*/
i = 1;
a = i**3;
co = 0;
do {
    b = (i+1)**3;
    i++;
    p = b - a;
    if (p >= 1e6)
        break;
    if (prime(p)) {
        console.log('p =', p, 'i =', i);
        co++;
    }
    a = b;
} while(1);
co;
/*
 correct, but why ??
    n always cube ?? n = k**3 ?
    a = k**2 * (k+1) ??
*/
