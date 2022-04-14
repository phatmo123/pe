function check(i) {
    a = (i).toString().split('');
    d = 0;
    for (j = a.length - 1; j > 0; --j) {
        if (a[j] < a[j - 1])
            if (d == 1)
                return 1;
            else
                d = -1;
        if (a[j] > a[j - 1])
            if (d == -1)
                return 1;
            else
                d = 1;
    }
    return 0;
}
c = 19602;
for (i = 21781; i <= 1e7; ++i) {
    c += check(i);
    if (c/i == 0.99)
        break;
} i;
