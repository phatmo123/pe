/*
DP:
F(3, n) = tail 0 -> n of f(3, n, t): count of combi which tail is t grey (t <= n)
- tail is 0 grey: add 1 red, or add 1 grey
- tail is 1 grey: add 1 grey
- tail is 2 grey: add 1 grey
- tail is 3 grey: add 1 grey
- tail is 4 grey: add 1 grey

- tail is n-1 grey: add 1 grey
- tail is n grey: add 1 grey

=>

f(3, n+1, 0) = f(3, n, 0)
f(3, n+1, 1) = f(3, n, 0)
f(3, n+1, 2) = f(3, n, 1)

f(3, n+1, n) = f(3, n, n-1)
f(3, n+1, n+1) = f(3, n, n)

??

Ori:
f(3, 3, 0) = 1
f(3, 3, 1) = 0
f(3, 3, 2) = 0
f(3, 3, 3) = 1
*/

n = 7;
a = [];
for (i = 3; i <= n; ++i)
	a[i] = new Array(i + 1);
a[3][0] = a[3][3] = 1;
a[3][1] = a[3][2] = 0;
for (i = 4; i <= n; ++i) {
	a[i][0] = a[i-1][0];
	for (j = 1; j <= i; ++j) {
		a[i][j] = a[i-1][j-1];
	}
	console.log(i, a[i].sum());
}
/*
Above WRONG!
the difference between 113 and 114 is
- 113: inc, if remove last digit from a valid combi, the result would be a valid combi. So from valid set of n ONLY, CAN cal for n+1
- 114: if remove last block from a valid combi(tail is grey-red-red-red for m=3), the result may not be a valid combi. So from valid set of n ONLY, can NOT cal for n+1

Need to find relation of n+3 (n+m) with n, not n+1 with n ??
or
Use 2 array : Valid combi count array vs Invalid combi count array ???
- only count invalid combi which last block is red, because last block is grey, that mean some invalid red sequence (< m) exist and even add new block, it still be invalid


*/
n = 7;
fv = []; // valid
fi = []; // invalid
m = 3;
for (i = m; i <= n; ++i) {
	fv[i] = new Array(i + 1);
    fi[i] = new Array(m);
}
// Ori
fv[m][0] = fv[m][m] = 1;
for (i = 1; i < m; ++i) {
    fv[m][i] = 0;
    fi[m][i] = 1; // count of invalid combi with tail is i red block
}

for (i = m + 1; i <= n; ++i) {
    
    
}

// -----------------------------------------------------------------
n = 50;
fv = []; // valid
fi = []; // invalid
m = 3;
for (i = m; i <= n; ++i) {
    // 0: 0 grey in tail
    // 1: 1 (up) grey in tail, no difference between 1 grey or 2 or 3 ...
        // add 1 red and become invalid fi[i][1], add 1 grey and become fv[i][1]
	fv[i] = new Array(2);
    fi[i] = new Array(m);
}
// Ori
fv[m][0] = fv[m][1] = 1;
for (i = 1; i < m; ++i)
    fi[m][i] = 1; // count of invalid combi with tail is i red block

for (i = m + 1; i <= n; ++i) {
    fv[i][0] = fv[i-1][0] /* add 1 red*/ + fi[i-1][m-1] /* add 1 red*/;
    fv[i][1] = fv[i-1][0] /* add 1 grey*/ + fv[i-1][1] /* add 1 grey*/;
    
    fi[i][1] = fv[i-1][1] /* add 1 red*/;
    for (j = 2; j < m; ++j)
        fi[i][j] = fi[i-1][j-1] /* add 1 red*/;
    // console.log(i, fv[i].sum());
}
fv[n].sum();
//------------------------------------------------------
// memory saving version
n = 50;
fv = []; // valid
fi = []; // invalid
m = 3;
for (i = 0; i <= 1; ++i) { // memory saving i <= 1
    // 0: 0 grey in tail
    // 1: 1 (up) grey in tail, no difference between 1 grey or 2 or 3 ...
        // add 1 red and become invalid fi[i][1], add 1 grey and become fv[i][1]
	fv[i] = new Array(2);
    fi[i] = new Array(m);
}
// Ori
m2 = m % 2;
fv[m2][0] = fv[m2][1] = 1;  // memory saving %2
for (i = 1; i < m; ++i)
    fi[m2][i] = 1; // count of invalid combi with tail is i red block  // memory saving %2

for (i = m + 1; i <= n; ++i) {
    i2 = i % 2;
    i12 = (i - 1) % 2;
    fv[i2][0] = fv[i12][0] /* add 1 red*/ + fi[i12][m-1] /* add 1 red*/;  // memory saving %2
    fv[i2][1] = fv[i12][0] /* add 1 grey*/ + fv[i12][1] /* add 1 grey*/;
    
    fi[i2][1] = fv[i12][1] /* add 1 red*/;
    for (j = 2; j < m; ++j)
        fi[i2][j] = fi[i12][j-1] /* add 1 red*/;
    // console.log(i, fv[i2].sum());
}
fv[n % 2].sum();
//------------------------------------------------------
// ori n=1 version
n = 50;
fv = []; // valid
fi = []; // invalid
m = 3;
for (i = 0; i <= 1; ++i) { // memory saving i <= 1
    // 0: 0 grey in tail
    // 1: 1 (up) grey in tail, no difference between 1 grey or 2 or 3 ...
        // add 1 red and become invalid fi[i][1], add 1 grey and become fv[i][1]
	fv[i] = new Array(2);
    fi[i] = new Array(m);
}
// Ori
fv[1][0] = 0;
fv[1][1] = 1;
fi[1][1] = 1;
for (i = 2; i < m; ++i)
    fi[1][i] = 0;

for (i = 2; i <= n; ++i) {
    i2 = i % 2;
    i12 = (i - 1) % 2;
    fv[i2][0] = fv[i12][0] /* add 1 red*/ + fi[i12][m-1] /* add 1 red*/;  // memory saving %2
    fv[i2][1] = fv[i12][0] /* add 1 grey*/ + fv[i12][1] /* add 1 grey*/;
    
    fi[i2][1] = fv[i12][1] /* add 1 red*/;
    for (j = 2; j < m; ++j)
        fi[i2][j] = fi[i12][j-1] /* add 1 red*/;
    // console.log(i, fv[i2].sum());
}
fv[n % 2].sum();
/*------------------------------------------------------
a relation which need 1 array only, not fv and fi
fv[i] = fv[i-1] + fv[i-1][0] + fi[i-1][2]
fv[i] = fv[i-1] + fv[i-1][0] + fv[i-3][1]
fv[i-1][0] = fv[i-2][0] + fi[i-2][2] = fv[i-2][0] + fv[i-4][1]

f0_n = f0_n-1 + f1_n-3
f1_n = f0_n-1 + f1_n-1

f0_n + f1_n (actually f1_n+1)

=>
a_n = a_n-1 + b_n-3
b_n = a_n-1 + b_n-1

(b_n+1) = a_n + b_n = a_n-1 + b_n-1

+ a_n-1 + b_n-3
+ a_n-2 + b_n-4 + b_n-3
+ a_n-3 + b_n-3

+ b_n-4 + b_n-5

=> f_n = f_n-1 + f_n-3 + f_n-5 + f_n-6

=> a_n => a_n-1 + b_n-x , apply x times to get a_n-x, match it with b_n-x, the rest are all b_n-*
=> f_n = f_n-1 + f_n-x + f_n-x-2 + ... + f_n-x-x
*/
f = [0, 1, 1, 2, 4, 7, 11];
n = 50;
k = f.length;
for (i = k; i <= n; ++i)
    f[i % k] = f[(i - 1) % k] + f[(i - 3) % k] + f[(i - 5) % k] + f[(i - 6) % k];
f[n % k];
/*
f_n = f_n-1 + f_n-3 + f_n-5 + f_n-6
another formula ?

f_n = a_n-1 + b_n-3 + a_n-1 + b_n-1 = 2*a_n-1 + 2*b_n-1 - b_n-1 + b_n-3 = 2*f_n-1 - f_n-2 + f_n-4

f_n = sum(f_0 ... f_n-4) + f_n-1 + 1 (f_0 = 1) ??? correct but why ???
- first block is grey, the rest blocks is f_n-1: f_n-1
- first 3 blocks are red, followed by 1 black, the rest blocks is f_n-4: f_n-4
- first 4 blocks are red, followed by 1 black, the rest blocks is f_n-5: f_n-5
...
- first n-2 blocks are red, followed by 1 black, the rest blocks is f_1: f_1
- first n-1 blocks are red, followed by 1 black, the rest blocks is f_0: f_0 ~ 1
- first n blocks red: + 1

