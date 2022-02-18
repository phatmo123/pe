function todo(i) {
    if (i == n+1) {
        // check ii.
        t = Math.floor(n/2);
        fi = a[1];
        la = 0;
        for (m = 1; m <= t; ++m) {
            fi += a[m+1];
            la += a[n-m+1];
            if (fi <= la)
                return;
        }
        sum += a.sum();
		return;
    }
    
    // check i.
    s[i] = s[i-1].map(u => u+a[i]).concat([a[i]]).concat(s[i-1]).unique();
    if (s[i].length == s[i-1].length * 2 + 1) {
        // go
        todo(i+1);
    }
}

sum = 0;
for (i = 0; i < 100; ++i) {
    a = b[i];
    a.sort(); // if no sort, check ii. wrong
    n = a.length;
    a.unshift(0); // padding left => no need change index in code 103
    s = [[]];
    todo(1);
}
sum;
