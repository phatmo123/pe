/*
Brute force slow
*/
Math.log = (function() {
    var log = Math.log;
    return function(n, base) {
        return log(n)/(base ? log(base) : 1);
    };
})();

i = 512;
j = 1;
while (j < 30) {
    x = Math.log(i, (i).toString().split('').sum());
    if (Math.abs(x - Math.round(x)) < 1e-9) {
        j++;
        console.log(j, i);
    }
    i++;
}

//----------------------------------------------------------
// do reverse, try a^b then check sum digit of result
t0 = performance.now();
a = 70;
b = 8;
c = a**b;
ta = a;
tb = b;
d = [];
d2 = [];
do {
    for (i = 2; i <= ta; ++i) {
        x = i**tb;
        if ((x).toString().split('').sum() == i) {
            d.push(x);
			d2.push(i + '**' + tb);
		}
    }
    tb--;
    ta = Math.floor(c**(1/tb));
} while (tb > 1);
console.log('length', d.length);
console.log(d.sort(sortNoLambda)[(30 > d.length ? d.length : 30) - 1]);
t1 = performance.now();
console.log((t1-t0)/1e3, 's');

/*
10^n-1 < n^i 9^i*n^i < 10^n
=> (n-1)/log10(n) < i < n/log10(n)
	(n-1)/log10(9*n) < i < n/log10(9*n)
*/
a = 70;
n = a/9;
console.log((a-1)/Math.log10(a), '< i <', a/Math.log10(a));
console.log((a/9-1)/Math.log10(a/9), '< i <', a/9/Math.log10(a/9));
console.log((a/5-1)/Math.log10(a/5), '< i <', a/5/Math.log10(a/5));
