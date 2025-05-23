/*
backtracking brute force
*/
function inc(i) {
    if (i == m) {
        c++;
        return;
    }
    for (var j = (i == 0 ? 1 : a[i - 1]); j < 10; ++j) {
        a[i] = j;
        inc(i + 1);
    }
}
function dec(i) {
    if (i == m) {
        c++;
        return;
    }
    for (var j = (i == 0 ? 9 : a[i - 1]); j > (i == 0 ? 0 : -1); --j) {
        a[i] = j;
        dec(i + 1);
    }
}
n = 6;
a = new Array(n);
c = 0;
t0 = performance.now();
for (m = 1; m <= n; ++m) {
    inc(0);
    dec(0);
    c -= 9;
}
t1 = performance.now();
console.log((t1-t0)/1e3, 's');
c;
// n = 30 43.781810000073165 "s" => n = 100 really slow
// no use of array a : n = 30 26.15069500000027 still slow

/*
Try to find a formula:

n = 6;
for (m = 1; m <= n; ++m) {
    c = 0;
    inc(0);
    console.log(c);
}
9
45
165
495
1287
3003

n = 6;
for (m = 1; m <= n; ++m) {
    c = 0;
    dec(0);
    console.log(c);
}
9
54
219
714
2001
5004
*/

/*
Try dynamic programing:
To build a n digit number, when finishing choice for ith digit(ex. d=4), the choice for i+1th is 4->9, so it depend on last digit choice
- Inc : formular for "Count of n digit number, last digit = d" ?
    f(n, d) = for i = 1 -> d of f(n-1, i) ?
        => f(n, d) = f(n, d-1) + f(n-1, d)
    Ori: f(1, d) = 1 ?
    => OK
- Dec :
    f(n, d) = for i = 9 -> d of f(n-1, i) ?
    Ori: f(1, d) = 1 ?
    => OK

Really quick!
*/
n = 100;
inc = [];
dec = [];
for (i = 0; i <= n; ++i) {
    inc.push(new Array(10));
    dec.push(new Array(10));
}
for (d = 1; d < 10; ++d) {
    inc[0][d] = 1;
    dec[0][d] = 1;
}
inc[0][0] = 0; // there is no number 1 digit number, last digit = 0 (0 does not count)
dec[0][0] = 0;
incS = 0;
decS = 0;
for (i = 1; i <= n; ++i) {
    inc[i][1] = inc[i - 1][1];
    for (d = 2; d < 10; ++d)
        inc[i][d] = inc[i][d - 1] + inc[i - 1][d];
    incS += inc[i][9];
    // inc[n][9] = inc[n-1].sum(), f(n, 9) = for i = 1 -> 9 of f(n-1, i)
    // so above statement work, and actually do not need cal inc[n][1] -> inc[n][8]
    // inc[i][d] = f(i+1, d)
    
    dec[i][9] = dec[i - 1][9];
    for (d = 8; d > -1; --d)
        dec[i][d] = dec[i][d + 1] + dec[i - 1][d];
    decS += dec[i][0];
}
incS + decS - n * 9;
//------------------------------------------------------
// memory saving version
n = 100;
inc = [];
dec = [];
for (i = 0; i <= 1; ++i) { // memory saving i <= 1
    inc.push(new Array(10));
    dec.push(new Array(10));
}
for (d = 1; d < 10; ++d) {
    inc[0][d] = 1;
    dec[0][d] = 1;
}
inc[0][0] = 0; // there is no number 1 digit number, last digit = 0 (0 does not count)
dec[0][0] = 0;
incS = 0;
decS = 0;
for (i = 1; i <= n; ++i) {
    i2 = i % 2;
    i12 = (i - 1) % 2;
    inc[i2][1] = inc[i12][1]; // memory saving %2
    for (d = 2; d < 10; ++d)
        inc[i2][d] = inc[i2][d - 1] + inc[i12][d];
    incS += inc[i2][9];
    // inc[n][9] = inc[n-1].sum(), f(n, 9) = for i = 1 -> 9 of f(n-1, i)
    // so above statement work, and actually do not need cal inc[n][1] -> inc[n][8]
    // inc[i2][d] = f(i+1, d)
    
    dec[i2][9] = dec[i12][9];
    for (d = 8; d > -1; --d)
        dec[i2][d] = dec[i2][d + 1] + dec[i12][d];
    decS += dec[i2][0];
}
incS + decS - n * 9;
