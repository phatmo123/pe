/*
Try Euclid's formula for pythagore triple: 
a = m2-n2
b = 2mn
c = m2+n2

prove that
- if gcd(m, n) > 1, then gcd(a, b) > 1
    m=k*t n=k*u => a b both %k = 0
- if gcd(m, n) = 1, then gcd(a, b) = 1
    if a and b have same ele, call it k
    if k = 2 => case m n odd (solved)
    if k != 2 => OR m OR n %k=0 (because gcd(m, n) = 1)
        => a cannot %k=0 (contradiction)
    dpcm
    
m*m - n*n = 2*m*n (n < No => continue)
n2 + 2mn - m2 = 0
deltm' = -m+-sq(2)m => m(sq2-1)

But m = 4, n = 1 work too, so "ndown = Math.ceil(m*(Math.sqrt(2)-1));" is wrong
*/

useArr = 0;
x = 1500000;
y = x/4; // b=2mn must < x/2 => mn < x/4
s = [];
for (i = 1; i <= x; ++i) {
    if (useArr)
        s[i] = [];
    else
        s[i] = 0;
}
for (m = 2; m <= y; ++m) {
    nup = Math.min(Math.floor(y/m), m-1);
    // ndown = Math.ceil(m*(Math.sqrt(2)-1));
    for (n = 1; n <= nup; ++n) {
        // m n both odd => a b c all even => not primitive triple
		if (m%2 == 1 && n%2 == 1)
            continue;
        if (gcd(m, n) > 1)
            continue;
		p = 2*m*(m+n);
        if (p > x)
            continue;
		if (useArr) {
            d = [m*m-n*n, 2*m*n, m*m+n*n];
            s[p].push([0, m, n].concat(d));
        }
        else
            s[p]++;
        c = 1;
        // calc for non-primitive triple
        for (j = 2*p; j <= x; j += p) {
            if (useArr) {
                c++;
                s[j].push([p, m, n].concat(d.map(u => c*u)));
            }
            else
                s[j]++;
        }
    }
}
co = 0;
for (i = 1; i <= x; ++i)
    s[i] == 1 && co++;
console.table(co);

// --------------------------------------------------------
x = 1500000;
y = Math.floor(Math.sqrt(x/2)); // c = m2+n2 < x/2 => m <= y
s = [];
for (i = 1; i <= x; ++i)
    s[i] = 0;
for (m = 2; m <= y; ++m) {
    for (n = 1; n < m; ++n) {
        // m n both odd => a b c all even => not primitive triple
		if (m%2 == 1 && n%2 == 1)
            continue;
        if (gcd(m, n) > 1)
            continue;
		p = 2*m*(m+n);
        if (p > x)
            continue;
        s[p]++;
        c = 1;
        // calc for non-primitive triple
        for (j = 2*p; j <= x; j += p)
            s[j]++;
    }
}
co = 0;
for (i = 1; i <= x; ++i)
    s[i] == 1 && co++;
console.table(co);
