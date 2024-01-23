/*
https://math.stackexchange.com/questions/629406/
https://stackoverflow.com/questions/8558292/

1) N can not be prime

2) Upper bound for N (only 2 element != 1)
(a-1)*(b-1) = k-1, make a, b as close as possible to sum is minimal

3) if 2^m < k <= 2^(m+1), N min > k+m

k=2 : 4 = 2*2 = 2+2
k=3 : 6 = 1*2*3 = 1+2+3
k=4 : 8 = 1*1*2*4 = 1+1+2+4
k=5 : 8 = 1*1*2*2*2 = 1+1+2+2+2
k=6 : 12 = 1*1*1*1*2*6 = 1+1+1+1+2+6
Split not-prime element only works for element 4, so 6 = 2*3 != 2+3
k=7 : 12 = 1*1*1*1*1*3*4 = 1+1+1+1+1+3+4
k=8 : 12 = 1*1*1*1*1*3*2*2 = 1+1+1+1+1+3+2+2
k=9 : 15 = 1*1*1*1*1*1*1*3*5 = 1+1+1+1+1+1+1+3+5
k=10: 16 = 1*1*1*1*1*1*1*1*4*4 = 1+1+1+1+1+1+1+1+4+4
k=11: 16 = 1*1*1*1*1*1*1*1*2*2*4 = 1+1+1+1+1+1+1+1+2+2+4
k=12: 16 = 1*1*1*1*1*1*1*1*2*2*2*2 = 1+1+1+1+1+1+1+1+2+2+2+2
k=13: 20 = 1*1*1*1*1*1*1*1*1*1*1*4*5 = 1+1+1+1+1+1+1+1+1+1+1+4+5
      18 = 1*1*1*1*1*1*1*1*1*1*2*3*3 = 1+1+1+1+1+1+1+1+1+1+2+3+3
k=14: 28 = 1*1*1*1*1*1*1*1*1*1*1*1*2*14 = 1+1+1+1+1+1+1+1+1+1+1+1+2+14
      20 = 1*1*1*1*1*1*1*1*1*1*1*2*2*5 = 1+1+1+1+1+1+1+1+1+1+1+2+2+5
k=15: 24 = 1*1*1*1*1*1*1*1*1*1*1*1*1*3*8 = 1+1+1+1+1+1+1+1+1+1+1+1+1+3+8
k=16: 24 = 1*1*1*1*1*1*1*1*1*1*1*1*1*1*4*6 = 1+1+1+1+1+1+1+1+1+1+1+1+1+1+4+6
k=17: 24 = 1*1*1*1*1*1*1*1*1*1*1*1*1*1*2*2*6 = 1+1+1+1+1+1+1+1+1+1+1+1+1+1+2+2+6
k=18: 24 = 1*1*1*1*1*1*1*1*1*1*1*1*1*1*1*2*3*4 = 1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+2+3+4
k=19: 24 = 1*1*1*1*1*1*1*1*1*1*1*1*1*1*1*2*2*2*3 = 1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+2+2+2+3
k=20: 28

2700
2**2*3**3*5**2
24
2**3*3

[1,1,1,1,2,1,2,1,3,2,2,1,4,1,2,2,5,1,4,1,4,2,2,1,7,2,2,3,4,1,5,1,7,2,2,2,9,1,2,2,7,1,5,1,4,4,2,1,12,2,4,2,4,1,7,2,7,2,2,1,11,1,2,4,11,2,5,1,4,2,5,1,16,1,2,4,4,2,5,1,12,5,2,1,11,2,2,2,7,1,11,2,4,2,2,2,19,1,4,4,9,1,5,1]

k=12000: upper 12240 = 72*170 = 72+170+11998


*/
t0 = performance.now();
tar = 12000;
n = 12240;
fa_seive(n);
kAr = [];
for (m = 4; m <= n; ++m) {
    if (fa_ar[m].length == 1) continue;
    a = fa_ar[m]; a = r = [a];
    b = [];
    num = a[0].length;
    do {
        for (i = a.length-1; i > -1; --i) {
            c = a[i];
            f1 = -1;
            for (j = c.length-1; j > -1; --j) {
                if (f1 == c[j]) continue;
                f1 = c[j];
                f2 = -1;
                for (k = j-1; k > -1; --k) {
                    if (f2 == c[k]) continue;
                    d = c.clone();
                    d.splice(j, 1);
                    d.splice(k, 1);
                    d.push(c[j]*c[k]);
                    d = d.sort(sortNoLambda);
                    b.push(d);
                }
            }
        }
        r = r.concat(b); // waste memory to store all combination with all length in r => slow
        r = r.map(u => JSON.stringify(u)).unique().map(u => JSON.parse(u));
        t = b; b = a; a = t;  // no free memory of a, b after done? => slow
        num--;
    } while(num > 2);
    
    r.forEach(u => {
        var i = u.reduce((a,b) => a*b) - u.reduce((a,b) => a+b) + u.length;
        kAr[i] = (kAr[i] == undefined ? m : Math.min(m, kAr[i]));
    });
}
kAr1 = kAr.clone();
kAr1.length = tar+1;
kAr1 = kAr1.unique();
kAr1.shift();
t1 = performance.now();
console.log((t1-t0)/1e3, 's');
kAr1.reduce((a,b) => a+b);

------------------------------------------------------------------------------------

t0 = performance.now();
tar = 12000;
n = 12240;
fa_seive(n);
kAr = [];
for (m = 4; m <= n; ++m) {
    if (fa_ar[m].length == 1) continue;
    a = [fa_ar[m]];
    b = [];
    num = a[0].length;
    a.forEach(u => {
        var i = u.reduce((a,b) => a*b) - u.reduce((a,b) => a+b) + u.length;
        if (i > tar) return;
        kAr[i] = (kAr[i] == undefined ? m : Math.min(m, kAr[i]));
    });
    do {
        for (i = a.length-1; i > -1; --i) {
            c = a[i];
            f1 = -1;
            for (j = c.length-1; j > -1; --j) {
                if (f1 == c[j]) continue;
                f1 = c[j];
                f2 = -1;
                for (k = j-1; k > -1; --k) {
                    if (f2 == c[k]) continue;
                    d = c.clone();
                    d.splice(j, 1);
                    d.splice(k, 1);
                    d.push(c[j]*c[k]);
                    d = d.sort(sortNoLambda);
                    b.push(d);
                }
            }
        }
        a.length = 0; // free memory
        // only store for combination of same length of m at the same time, done with kAr and free memory
        b = b.map(u => JSON.stringify(u)).unique().map(u => JSON.parse(u));
        b.forEach(u => {
            var i = u.reduce((a,b) => a*b) - u.reduce((a,b) => a+b) + u.length;
            if (i > tar) return;
            kAr[i] = (kAr[i] == undefined ? m : Math.min(m, kAr[i]));
        });
        t = b; b = a; a = t;
        num--;
    } while(num > 2);
    b.length = 0; // free memory
}
kAr.length = tar+1;
kAr = kAr.unique();
kAr.shift();
t1 = performance.now();
console.log((t1-t0)/1e3, 's');
kAr.reduce((a,b) => a+b);

-------------------------------------------------------------------------------
/*
algo 1:
60  has eleven multiplicative partitions:
{{2, 2, 3, 5}, {2, 2, 15}, {2, 3, 10}, {2, 5, 6}, {3, 4, 5}, {2, 30}, {3, 20}, {4, 15}, {5, 12}, {6, 10}, {60}} .
- from longest (4) combination, multiply the last with each before it => 3 combination
then the last - 1 ...
- each 3 combination => 2 => ...

algo 2: backtracking
- put each prime in each group, each group can get as many prime as it want, in left primes
=> another backtring?
    - in left primes, how to track what primes combination has try?
    - {2, 2, 3, 5}, first group 1 = 2, then group 1 = 3, group 1 = 5, group 1 = 2,2 ...
*/
-------------------------------------------------------------------------------
// from 126
function todo(i) {
	var j = 2;
	do {
		p *= j;
		a[i] = j;
		if (p > n) {
			p /= j;
			a.length = i;
			break;
		}
		var k = p - a.reduce((a,b) => a+b) + a.length;
		if (k <= tar)
			kAr[k] = (kAr[k] == undefined ? p : Math.min(p, kAr[k]))
		todo(i + 1);
		p /= j;
		a.length = i;
		j++;
		if (j > tar2)
			break;
	} while(1);
}
tar = 12000;
tar2 = tar/2;
n = 12240;
a = [];
kAr = [];
p = 1;
todo(0);
kAr.length = tar+1;
kAr = kAr.unique();
kAr.shift();
kAr.shift(); // kAr[1] = 2
console.log(kAr.reduce((a,b) => a+b));
