function cal(m, n) {
    var s = 0;
    for (i = 1; i <= m; ++i)
        for (j = 1; j <= n; ++j)
            s += (m-(i-1)) * (n-(j-1));
    return s;
}
(function() {
    s = 1e4;
    a = 2*1e6;
    for (m = 53; m <= 1999; ++m) {
        sign = 0;
        for (n = 1; n <= m; ++n) {
            if (sign)
                break;
            t = cal(m, n) - a;
            t2 = Math.abs(t);
            if (t2 < s) {
                s = t2;
                m1 = m;
                n1 = n;
            }
            if (t > 0)
                sign = 1;
        }
    }
})(); m1*n1;
