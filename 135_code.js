// a*(4d-a) = n; a > d => n < 3a^2; (n+a^2)/a | 4

divisor_seive(1e6);
bc = 1;
for (i = 1156; i < 1e6; ++i) {
    k = divisor_ar[i];
    c = 0;
    for (j = k.length - 1; j >= 0; --j) {
        if (3*k[j]*k[j] > i && (i/k[j]+k[j])%4 == 0)
            c++;
        if (c > 10)
            break;
    }
    if (c == 10)
        bc++;
}
bc;
