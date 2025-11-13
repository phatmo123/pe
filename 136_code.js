// try seive up-down for (i = n; i >= 2; --i) {

n = 5 * 1e7; divisor_ar = []; count = [];
for (i = 2; i <= n; ++i) {
    divisor_ar[i] = [];
    count[i] = 0;
}
for (i = n; i >= 2; --i) {
    for (var j = i; j <= n; j += i) {
        if (divisor_ar[j] == null) continue;
        divisor_ar[j].push(i);
        if (3*i*i > j && (j/i+i)%4 == 0)
            count[j]++;
        if (count[j] > 1) {
            count[j] = -1;
            divisor_ar[j] = null;
        }
    }
}

-----------------------------------------------

// no need to store divisor
n = 5 * 1e7; count = [];
for (i = 2; i <= n; ++i)
    count[i] = 0;
for (i = n; i >= 2; --i) { // try from big divisor first because of 3*i*i > j
    for (var j = i; j <= n; j += i) {
        if (count[j] == -1) continue;
        if (3*i*i > j && (j/i+i)%4 == 0)
            count[j]++;
        if (count[j] > 1)
            count[j] = -1;
    }
}

c = 25;
for (i = 1e2; i <= n; ++i)
    if (count[i] == 1)
        c++;
c;
