/*
1 8 2-10 3-5 4-11 6-12 7-13 9-14
I get 353 for x,y <= 9
=> brute-force
*/
t0 = performance.now();
n = 50; c = 0; a = [];
for (i = 0; i <= n; ++i) for (j = 0; j <= n; ++j)
    a.push([i, j]);
a.shift();
z = (n + 1)**2 - 2;
for (i = z; i > -1; i--) for (j = i - 1; j > -1; j--) {
    b = [
        a[i][0]**2 + a[i][1]**2,
        a[j][0]**2 + a[j][1]**2,
        (a[i][0] - a[j][0])**2 + (a[i][1] - a[j][1])**2
    ].sort(sortNoLambda);
    if (b[2] == b[0] + b[1]) {
        c++;
        // console.log(a[i], a[j]);
    }
}
t1 = performance.now();
console.log((t1-t0)/1e3, 's');
c;

----------------------------------------------------------------

n = 50; c = 3*n**2;
for (i = 1; i <= n; ++i) for (j = 1; j <= n; ++j) {
    k = gcd(i, j);
    a = i/k; b = j/k;
    // swap a, b
    c += Math.min( Math.floor((n - i)/b), Math.floor(j/a) ) 
    + Math.min( Math.floor(i/b), Math.floor((n - j)/a) );
} c;
