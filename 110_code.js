/*
reverse version of 108
	that means from p >= 2001
		p *= (2*o[j] + 1);
	try to factorazion p and get o[j]
	use primes and o[j] to generate number, try to find the smallest number
	
not sure if it always get the right answer (108 is sure)
*/
seive(100);
seive_check();
q = 4*1e6; // 1e3
q = Math.ceil(Math.sqrt(2*q + 1));
if (q%2 == 0)
    q++;
for (i = 0; i < 10; ++i, q += 2) {
    // q is odd <=> a's element are all odd
    a = fa(q);
    b = a.map(u => (u-1)/2).reverse().map(u => [u, u]).reduce((a, b) => a.concat(b));
    p = 1;
    k = 0;
    for (j of b)
        p *= ps[k++]**j;
    console.log('p = ', p);
}
