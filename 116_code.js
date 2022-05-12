n = 50;
s = 0;
for (m = 2; m <= 4; ++m) {
    fv = []; // valid
    fi = []; // invalid
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
        fi[m][i] = 1; // count of invalid combi with REMAINDER %m of tail is i red block
        // with m=2 tail is 1 or 3 or 5, are not different
        // with m=3 tail is 1 or 4 or 7, are not different, they are invald, and need 2 more red to be valid
    for (i = m + 1; i <= n; ++i) {
        fv[i][0] =
            // fv[i-1][0] /* add 1 red*/ +
            fi[i-1][m-1] /* add 1 red*/;

        fv[i][1] = fv[i-1][0] /* add 1 grey*/ + fv[i-1][1] /* add 1 grey*/;
        
        fi[i][1] = fv[i-1][1] /* add 1 red*/ /* and NEW add */ + fv[i-1][0] /* add 1 red*/
        for (j = 2; j < m; ++j)
            fi[i][j] = fi[i-1][j-1] /* add 1 red*/;
        // console.log(i, fv[i].sum());
    }
    s += fv[n].sum() - 1;
} s;
//------------------------------------------------------
n = 50;
s = 0;
for (m = 2; m <= 4; ++m) {
    fv = []; // valid
    fi = []; // invalid
    for (i = 0; i <= 1; ++i) {
        // 0: 0 grey in tail
        // 1: 1 (up) grey in tail, no difference between 1 grey or 2 or 3 ...
            // add 1 red and become invalid fi[i][1], add 1 grey and become fv[i][1]
        fv[i] = new Array(2);
        fi[i] = new Array(m);
    }
    // Ori
    m2 = m % 2;
    fv[m2][0] = fv[m2][1] = 1;
    for (i = 1; i < m; ++i)
        fi[m2][i] = 1; // count of invalid combi with REMAINDER %m of tail is i red block
        // with m=2 tail is 1 or 3 or 5, are not different
        // with m=3 tail is 1 or 4 or 7, are not different, they are invald, and need 2 more red to be valid
    for (i = m + 1; i <= n; ++i) {
        i2 = i % 2;
        i12 = (i - 1) % 2;
        fv[i2][0] =
            // fv[i12][0] /* add 1 red*/ +
            fi[i12][m-1] /* add 1 red*/;

        fv[i2][1] = fv[i12][0] /* add 1 grey*/ + fv[i12][1] /* add 1 grey*/;
        
        fi[i2][1] = fv[i12][1] /* add 1 red*/ /* and NEW add */ + fv[i12][0] /* add 1 red*/
        for (j = 2; j < m; ++j)
            fi[i2][j] = fi[i12][j-1] /* add 1 red*/;
        // console.log(i, fv[i2].sum());
    }
    s += fv[n % 2].sum() - 1;
} s;
//------------------------------------------------------
// ori n=1 version
n = 50;
s = 0;
for (m = 2; m <= 4; ++m) {
    fv = []; // valid
    fi = []; // invalid
    for (i = 0; i <= 1; ++i) {
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
		fi[1][i] = 0; // count of invalid combi with REMAINDER %m of tail is i red block
        // with m=2 tail is 1 or 3 or 5, are not different
        // with m=3 tail is 1 or 4 or 7, are not different, they are invald, and need 2 more red to be valid
    for (i = 2; i <= n; ++i) {
        i2 = i % 2;
        i12 = (i - 1) % 2;
        fv[i2][0] =
            // fv[i12][0] /* add 1 red*/ +
            fi[i12][m-1] /* add 1 red*/;

        fv[i2][1] = fv[i12][0] /* add 1 grey*/ + fv[i12][1] /* add 1 grey*/;
        
        fi[i2][1] = fv[i12][1] /* add 1 red*/ /* and NEW add */ + fv[i12][0] /* add 1 red*/
        for (j = 2; j < m; ++j)
            fi[i2][j] = fi[i12][j-1] /* add 1 red*/;
        // console.log(i, fv[i2].sum());
    }
    s += fv[n % 2].sum() - 1;
} s;
