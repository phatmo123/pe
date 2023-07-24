n = 33; do {
    n += 2; if (prime(n)) continue;
    s = Math.sqrt(n/2); b = 0; for (var i = 1; i < s; ++i) {
        if (prime(n-2*i*i)) {
            b = 1;
            break;
        }
    }
    if (b == 1) continue;
    else break;
} while(1); n;