/*
1) Can not replace the last digit, or it will be 2,4,6,8,0 => not prime

2) Can not replace n digit with n%3 != 0, because some of the replacement will %3 = 0, no matter value of the first replacement%3 is (must be 1 or 2)

3) Try generate number and replace at su var's place
Ex. Try number i = 11
su = [0,1,3], so test 00101, 11111, 22121, ... 99191 ...

4) Must try all su, to get smallest i+su pair

5) for (i = 1; i < n; ++i) num.push(i); num.pop();
Must try i = 0 (replace first digit) because maybe 0... not prime but maybe 1... -> 9... there are 8 prime

6) This code try each range (10e4-10e5-10e6-...). The answer is in 10e5-10e6: 121313 ~ a2a3a3
*/
n = 6; m = 2;
to = Math.pow(10, n); res = [];
num = []; for (i = 0; i < n; ++i) num.push(i); num.pop();
for (let su of num.subsets()) {
    if (su.length%3 != 0 || su.length == 0) continue;
    to = Math.pow(10, n - su.length);
    for (i = Math.pow(10, n - su.length - 1) + 1; i < to; i += 2) {
        if (i%5 == 0) continue;
        b = [];
        for (j = 0; j < su.length; ++j) b[su[j]] = -1;
        a = (i).toString().split(''); k = 0;
        for (j = 0; j < n; ++j) {
            if (b[j] == -1) continue;
            b[j] = a[k++];
        }
        di = -1; c = 0;
        do {
            di++;
            // not allow '0'10607 type
            if (su[0] == 0 && di == 0) { c++; continue; }
            for (j = 0; j < su.length; ++j) {
                b[su[j]] = di;
            }
            if (!prime(b.join(''))) c++;
            if (c > m) break;
        } while (di < 9);
        if (c <= m) {
            for (j = 0; j < su.length; ++j) {
                b[su[j]] = 'a';
            }
            res.push(b.join(''));
            break;
        }
    }
} console.log(res);