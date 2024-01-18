n = 5*1e7;
seive(Math.sqrt(n));
seive_check();
seive_ar = null;
a = new Int8Array(n);

for (i = 0; i < ps.length; ++i) {
    si = ps[i]**2;
    if (si >= n) break;
    for (j = 0; j < ps.length; ++j) {
        sj = si + ps[j]**3;
        if (sj >= n) break;
        for (k = 0; k < ps.length; ++k) {
            sk = sj + ps[k]**4;
            if (sk >= n) break;
            a[sk] = 1;
        }
    }
} c = 0; for (i = 0; i <= n; ++i) if (a[i] == 1) c++; c;
