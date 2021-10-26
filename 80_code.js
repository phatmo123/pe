// use BigInt

function genContFracArrForSqrt(n) {
    var sq = Math.floor(Math.sqrt(n));
    if (sq*sq == n)
        return [sq];
    var a = [sq];
    sq = -sq; // make it negative
    // b/(sq+c) 7/(sq23-3)
    var gb = b = 1, gc = c = sq;
    do {
        var d = n - c*c;
        var e = gcd(b, d);
        b /= e; d /= e;
        var f = -c;
        var h = 0;
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
        if (gb == b && gc == c)
            break;
    } while(1);
    return a;
}
function bigCalContFrac(cof, i) { // continued fractions
    cof = cof.map(u => BigInt(u));
	var last2n = [0n, 1n], n;
	var last2d = [1n, 0n], d;
	var l = cof.length;
	for (j = 0; i >= 0; --i) {
		n = cof[j]*last2n[1] + last2n[0];
		last2n[0] = last2n[1];
		last2n[1] = n;
		d = cof[j]*last2d[1] + last2d[0];
		last2d[0] = last2d[1];
		last2d[1] = d;
		j++;
		if (j == l) {
			j = 1;
		}
	}
	return [n, d];
}
function bigDoDivide(a, to) {
    var b = a[1], a = a[0];
	var c = [a/b];
    var re = a%b;
    var res = [re];
    do {
        re *= 10n;
        c.push(re/b);
        to--;
        re = re%b;
        if (res.includes(re)) break;
    } while(to > 0);
    
    if (to == 0) return c;
    else return null;
}

s = 0; k = 2; m = 4; for (i = 2; i < 100; ++i) {
    if (i == m) {
        k++;
        m = k*k;
        continue;
    }
    s += bigDoDivide(bigCalContFrac(genContFracArrForSqrt(i), 174), 99).reduce(sumDigitLambda);
} s;