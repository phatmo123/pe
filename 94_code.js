/*
brute-force
- real slow

*/
t0 = performance.now();
c = 0n; for (i = 3n; i <= 333333333n; i += 2n) {
    j = i + 1n;
	t = j**2n/4n;
	t = (i**2n - t) * t;
	q = sqrt(t);
    if (q**2n == t) {
		// console.log(i, j);
		c += 2n*i + j;
    }
    j = i - 1n;
	t = j**2n/4n;
	t = (i**2n - t) * t;
	q = sqrt(t);
    if (q**2n == t) {
		// console.log(i, j);
		c += 2n*i + j;
    }
}
t1 = performance.now();
console.log((t1-t0)/1e3, 's');
c;

/*
=> use pythagore triple
a a b
p = a + b/2
S2 = b2/4*(a-b/2)*(a+b/2) = b2/4*(a2 - b2/4)
    S = b/2*sqrt(a2 - b2/4) = int
=> a, b/2 are in pythagore triple (b-a = +-1) => problem 75
*/
// 18257 = Math.sqrt(333333333) >= Math.sqrt(m2+n2)
q = 333333333;
p = 0;
for (m = 2; m <= 18257; ++m) {
	d = m**2;
    for (n = 1; n < m; ++n) {
		e = n**2;
        a = d + e;
        if (a > q) // a a b, so a>q <=> p>1e9
            break;
            
        // b/2 in pythagore triple, but not sure 2mn or m2-n2, so ...
        b1 = 4*m*n;
        b2 = 2 * (d - e);
        if (b2 == a + 1 || b2 == a - 1)
            p += 2 * a + b2;
        else if (b1 == a + 1 || b1 == a - 1)
            p += 2 * a + b1;
    }
}
p;
/* note: non-primitive triple can not work
a=ku b=kv c=kt (k > 1)
2b (or 2c) can not differ from a just 1
because ku and 2kv, difference = 1 cannot %k = 0, dpcm
