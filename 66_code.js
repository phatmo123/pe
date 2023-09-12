// brute-force
m = 0; md = 3; 
for (d = 3; d <= 1e3; ++d) {
    // if (d%50 == 0) console.log(d/50);
    if (Math.sqrt(d)%1 == 0) continue;
    a = [1]; b = [d-1];
    for (i = 2; i <= Math.floor(d/2); ++i) {
		if ((i*i-1)%d == 0) {
			a.push(i);
			b.unshift(d-i);
		}
	}
	if (a[a.length-1] == b[0])
		a.pop();
	a = a.concat(b);
	
    k = 0; i = 1;
    // console.log('d =', d);
    do {
        n = k + a[i];
        // console.log('n =', n);
        t = (n*n-1)/d;
        if (t%1 == 0 && Math.sqrt(t)%1 == 0)
            break;
        i++;
        if (i == a.length) {
            i = 0;
            k += d;
        }
    } while(1);
    if (m < n) {
        m = n;
        md = d;
    }
} console.log(m, md);

----------------------------------------------------------------
// base on continued fractions
m = 0; md = 3; 
for (n = 2; n <= 1e3; ++n) {
    sq = Math.floor(Math.sqrt(n));
    if (sq*sq == n) continue;
	a = [sq];
    sq = -sq; // make it negative
    b = 1; c = -Math.floor(Math.sqrt(n)); // b/(sq+c) 7/(sq23-3)
    gb = b; gc = c;
    do {
        d = n - c*c;
        e = gcd(b, d);
        b /= e; d /= e;
        f = -c;
		h = 0;
        while (f > sq) { // f > sq or f > c, work the same?
			f -= d;
			h++;
		}
        if (f < sq) { // the key: f < sq, not f < c
			f += d;
			h--;
		}
		a.push(h);
        b = d;
        c = f;
        if (gb == b && gc == c) {
			l = a.length - 1;
			if (l%2 == 1) {
				for (i = 1; i < l; ++i)
					a.push(a[i]);
			}
			else {
				a.pop();
			}
            break;
        }
    } while(1);
	
	b = 1;
	c = a[a.length - 1];
	i = a.length - 2;
	while (i > 0) {
		b += c*a[i];
		t = b; b = c; c = t;
		i--;
	}
	b += c*a[0];
	
	if (m < b) {
        m = b;
        md = n;
    }
} console.log(m, md);

----------------------------------------------------------------

// => use calContFrac()
m = 0; md = 3; 
for (n = 2; n <= 1e3; ++n) {
    sq = Math.floor(Math.sqrt(n));
    if (sq*sq == n) continue;
	a = [sq];
    sq = -sq; // make it negative
    b = 1; c = -Math.floor(Math.sqrt(n)); // b/(sq+c) 7/(sq23-3)
    gb = b; gc = c;
    do {
        d = n - c*c;
        e = gcd(b, d);
        b /= e; d /= e;
        f = -c;
		h = 0;
        while (f > sq) { // f > sq or f > c, work the same?
			f -= d;
			h++;
		}
        if (f < sq) { // the key: f < sq, not f < c
			f += d;
			h--;
		}
		a.push(h);
        b = d;
        c = f;
        if (gb == b && gc == c) {
			l = a.length - 1;
			if (l%2 == 1) {
				l = 2*l - 1;
			}
			else {
				l -= 1;
			}
			var r = calContFrac(a, l);  // fudamental solution
			// console.log(r[0], '/' , r[1]);
            break;
        }
    } while(1);
	
	if (m < r[0]) {
        m = r[0];
        md = n;
    }
} console.log(m, md);

