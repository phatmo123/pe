n = 120000;
t0 = performance.now();
dfa_seive(n - 1);
for (i = 2; i < n; ++i)
    dfa_ar[i] = dfa_ar[i].product();
s = [];

// a = 1
n1 = n - 1;
for (b = 2; b < n1; ++b) {
    c = 1 + b;
    if (dfa_ar[b] * dfa_ar[c] < c)
        s.push([1, b, c]);
}

// a > 1
for (c = 5; c < n; ++c) {
    /*
        dfa(a) and dfa(b) = [2] and [3] is bound-case 2*3=6 so if dfa_ar[a] * dfa_ar[b] * dfa_ar[c] >= dfa_ar[c] * 6 >= c, continue
    */
    if (dfa_ar[c] * 6 >= c) 
        continue;
    c2 = Math.floor((c - 1) / 2);
    codd = c % 2;
    astart = codd ? 2 : 3;
    ajump = codd ? 1 : 2;
    dfac = c / dfa_ar[c];
    for (a = astart; a <= c2; a += ajump) {
        b = c - a;
        if (
            gcd(a, b) == 1
            && dfa_ar[a] * dfa_ar[b] < dfac
        )
            s.push([a, b, c]);
    }
}
t1 = performance.now();
console.log((t1-t0)/1e3, 's');
s.sort((a, b) => {
    return a[0] - b[0];
});

/*
55.02783499995712 "s"
18407904 correct but ~1min

use astart ajump
and 43.14631999999983 "s"
and 33.30645999999251 "s"
and 36.357970000011846 "s"
and 34.7012199999881 "s"
and 37.28503999998793 "s"

~ 36s

use dfac and 32.690660000022035 "s"

*/

/*
dfa_ar[a] * dfa_ar[b] * dfa_ar[c] < c < n
dfa_ar[c] >= 2
=> dfa_ar[a] or dfa_ar[b] < sqrt(n/2) -> aup

*/
n = 120000;
t0 = performance.now();
dfa_seive(n - 1);
for (i = 2; i < n; ++i)
    dfa_ar[i] = dfa_ar[i].product();
dfa_ar[1] = 1;
ar = [];
for (i = 2; i < n; ++i)
    ar[i - 1] = {n: i, r: dfa_ar[i]};
ar[0] = {n: 1, r: 1};
ar = ar.sort((a, b) => {
    return a.r - b.r;
});
s = 0;

n2 = Math.floor(n / 2);
aup = Math.floor(Math.sqrt(n / 2));
i = 0;
while (ar[i].r <= aup) {
    a = ar[i].n;
    bup = n - a;
    aodd = a % 2;
    bjump = a == 1 ? 1 : aodd ? 1 : 2;

    for (b = 1; b < bup; b += bjump) {
        if (dfa_ar[b] < dfa_ar[a]) // important!!
            continue;
        c = a + b;
        if (
            gcd(a, b) == 1
            && dfa_ar[a] * dfa_ar[b] * dfa_ar[c] < c
        )
            s += c;
    }
    i++;
}
t1 = performance.now();
console.log((t1-t0)/1e3, 's');
s;

// 11.16819499997655 "s" 18407904
