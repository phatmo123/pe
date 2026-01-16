odd = 0;
for (n = 2; n <= 1e4; ++n) {
    sq = Math.floor(Math.sqrt(n));
    if (sq*sq == n) continue;
    co = 0;
    sq = -sq; // make it negative
    b = 1; c = -Math.floor(Math.sqrt(n)); // b/(sq+c) 7/(sq23-3)
    gb = b; gc = c;
    do {
        d = n - c*c;
        e = gcd(b, d);
        b /= e; d /= e;
        f = -c;
        while (f > sq) f -= d; // f > sq or f > c, work the same?
        if (f < sq) f += d; // the key: f < sq, not f < c
        co++;
        b = d;
        c = f;
        if (gb == b && gc == c) {
            if (co%2 == 1)
                odd++;
            break;
        }
    } while(1);
} odd;