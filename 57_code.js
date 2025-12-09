n = 1n; d = 2n; c = 0
for (i = 0; i < 999; ++i) {
    n += 2n*d;
    t = n;
    n = d;
    d = t;
    if ((d + n).toString().length > (d).toString().length)
        c += 1;
} c;