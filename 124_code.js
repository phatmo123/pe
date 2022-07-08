dfa_seive(1e5);
a = [];
for (i = 2; i <= 1e5; ++i)
    a[i - 1] = {n: i, r: dfa_ar[i].product()};
a[0] = {n: 1, r: 1};
a = a.sort((a, b) => {
    return a.r - b.r;
});
a[1e4 - 1].n;
