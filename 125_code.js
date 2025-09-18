m = 1e8;
n = Math.floor(Math.sqrt(m / 2));
a = [];
for (i = 1; i <= n; ++i)
    a.push(i**2);
b = [];
n1 = n - 1;
su = 0;
for (i = 0; i < n1; ++i) {
    s = a[i];
    for (j = i + 1; j < n; ++j) {
        s += a[j];
        if (s >= m)
            break;
        if (palindrome(s))
            b.push(s);
    }
}
b.unique().sum();