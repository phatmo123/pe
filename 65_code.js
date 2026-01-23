// 100th => [2;1,2,1,1,4,1,1,6,1,...,1,66,1]
b = 100; n = 1n;
k = BigInt(Math.floor(b/3)*2);

if (b%3 == 0n)
    d = k;
else
    d = 1n; // 100th element
b -= 1;

for (i = b; i > 1; --i) {
    if (i%3 == 0) {
        n += k*d;
        k -= 2n;
    }
    else
        n += d;
    t = n;
    n = d;
    d = t;
}
n += 2n*d; sumDigit(n);