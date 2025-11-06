/*
if a|b, factor of R(a) also is factor of R(b)
*/

function todo(n) {
	b[n] = [];
    console.log('n =', n);
	var a = divisor(n);
	for (var i = 1; i < a.length - 1; ++i) {
		if (b[a[i]] == undefined)
            if (todo(a[i]))
                return true;
        
        b[n] = b[n].concat(b[a[i]]);
        b[n] = b[n].unique();

	}
    if ( (p = b[n].product()) < (n1 = parseInt('1'.repeat(n))) ) {
		m = n1 / p;
		b[n] = b[n].concat(dfa(m));
        b[n] = b[n].unique();
	}
    
    if (b[n].length >= need) {
        re = b[n];
        return true;
    }
    
    return false;
}
b = []; // list dfa of R(index)
need = 40;
for (i = 1; i <= 10; ++i)
	b[i] = dfa(parseInt('1'.repeat(i)));
re = null;
todo(1e9);
if (re != null) {
    re.sort(sortNoLambda);
    console.log(re.sum(0, need-1));
}
console.log('done');

/*
above NG

10^n ≡ 1 mod p
=> for each prime p: try to find some m (n%m = 0) and 10^m ≡ 1 mod p
*/
co = 0;
su = 0;
b = 3;
t0 = performance.now();
do {
    if (prime(b)) {
        a = divisor(b-1);
        ez = 0;
        p = 1;
        i = 0;
        le = a.length; 
        do {
            while(ez < a[i]) {
                p *= 10;
                p %= b;
                ez++;
            }
            if (p == 1) {
                k = a[i];
                // "The problem is harder when b is not coprime with 9, that is when b is a multiple of 3. " so ...
                b1 = b;
                k1 = k;
                while (b1 % 3 == 0) {
                    if (k1 % 3 != 0)
                        break;
                    else
                        k1 /= 3;
                    b1 /= 3;
                }
                while (b1 % 3 == 0) {
                    k *= 3;
                    b1 /= 3;
                }
                // console.log(b, 'p = 1 at ', k);
                if (1e9 % k == 0) {
                    su += b;
                    co++;
                }
                break;
            }
            i++;
        } while(i < le);
    }
    b += 2;
    if (b % 5 == 0)
        b += 2;
} while(co < 40);
t1 = performance.now();
console.log((t1-t0)/1e3, 's');
su;
// 843296 in 7.032570000039414 "s"
