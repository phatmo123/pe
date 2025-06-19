/*
3 array of invalid, based on last cell color
fir
fig
fib
*/
n = 50;
mr = 2;
mg = 3;
mb = 4;
fv = []; // valid
fir = []; // invalid
fig = []; // invalid
fib = []; // invalid
for (i = 0; i <= 1; ++i) {
    // 0: 0 grey in tail
    // 1: 1 (up) grey in tail, no difference between 1 grey or 2 or 3 ...
        // add 1 rgb and become invalid firgb[i][1], add 1 grey and become fv[i][1]
    fv[i] = new Array(2);
    fir[i] = new Array(mr);
    fig[i] = new Array(mg);
    fib[i] = new Array(mb);
}
// Ori n=1
fv[1][0] = 0;
fv[1][1] = 1;
fir[1][1] = 1;
fig[1][1] = 1;
fib[1][1] = 1;
for (i = 2; i < mr; ++i)
    fir[1][i] = 0;
for (i = 2; i < mg; ++i)
    fig[1][i] = 0;
for (i = 2; i < mb; ++i)
    fib[1][i] = 0;
    // count of invalid combi with REMAINDER %m of tail is i rgb block
    // with m=2 tail is 1 or 3 or 5, are not different
    // with m=3 tail is 1 or 4 or 7, are not different, they are invald, and need 2 more red to be valid

for (i = 2; i <= n; ++i) {
	i2 = i % 2;
    i12 = (i - 1) % 2;
    fv[i2][0] =
        // fv[i12][0] /* add 1 red*/ +
        fir[i12][mr-1] /* add 1 r*/
        + fig[i12][mg-1] /* add 1 g*/
        + fib[i12][mb-1] /* add 1 b*/
        ;

    fv[i2][1] = fv[i12][0] /* add 1 grey*/ + fv[i12][1] /* add 1 grey*/;
    // from here
    // fv[i2][0] ?? Need fvrgb, because can not add 1 red in combi which end with -r-r
    // NOT absolute, -grey-r-r-r and -grey-r are not different, like line 37
    // so try to continue!
    fir[i2][1] = fv[i12][0] /* add 1 r*/ + fv[i12][1] /* add 1 r*/;
    fig[i2][1] = fv[i12][0] /* add 1 g*/ + fv[i12][1] /* add 1 g*/;
    fib[i2][1] = fv[i12][0] /* add 1 b*/ + fv[i12][1] /* add 1 b*/;
    for (j = 2; j < mr; ++j)
        fir[i2][j] = fir[i12][j-1] /* add 1 r*/;
    for (j = 2; j < mg; ++j)
        fig[i2][j] = fig[i12][j-1] /* add 1 g*/;
    for (j = 2; j < mb; ++j)
        fib[i2][j] = fib[i12][j-1] /* add 1 b*/;
    
    console.log(i, fv[i2].sum());
}
// can turn firgb to fi[3] => 3 dimensional array
