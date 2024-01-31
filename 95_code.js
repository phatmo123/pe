n = 1e6;
sum_divisor_seive(n);
max = 0; gmin = n; for (i = 1; i <= n; ++i) {
    a = min = i; ar = [];
    do {
        ar.push(a);
        a = sum_divisor_ar[a];
        if (a > n || a <= 1)
            break;
        if (min > a)
            min = a;
    }
    while (!ar.includes(a));
    if (a == i && max < ar.length) {
        max = ar.length;
        gmin = min;
    }
} gmin;
