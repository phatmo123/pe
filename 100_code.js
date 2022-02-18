/*
2a2 - 2a = a2 + 2ab + b2 - a - b
a2-a=2ab+b2-b
a2-a-2ab-b2+b=0

x=a: a2-(2b+1)a+(b-b2)=0 delta=4b2+4b+1-4b+4b2=8b2+1 => pell eq: delta2 - 8b2 = 1
x=b: b2+(2a-1)b+(a-a2)=0 delta=4a2-4a+1-4a+4a2=8a2-8a+1

a*(a-1)/(a+b)/(a+b-1)=0.5
a/b=c
=>b->∞ : c(c-0)/(c+1)(c+1-0)=c2/(c+1)2=0.5=>c=sq1/2/(1-sq1/2)

a+b=1e12 => a~707106781186.5476 b~292893218813.4524

b = ;

*/

b = 292893218813n;
t = 10000;
do {
    t--;
    m = b**2n*8n + 1n;
    n = sqrt(m);
    if (n**2n == m)
        console.log('b = ', b);
	// b--;
    // b++;
} while(t > 0);

to = BigInt(1e9); la = 0n; for (i = 1n; i < to; ++i) {
	t = i**2n*8n + 1n;
	s = sqrt(t);
    if (s**2n == t) {
        console.log('i = ', i);
		if (la)
			console.log('r = ', i/la);
		la = i;
    }
} console.log('done');

------------------------------------------------------------
// pell eq: Prob 66:

n = 8;
a = genContFracArrForSqrt(n);
l = a.length - 1;
if (l%2 == 1) {
    l = 2*l - 1;
}
else {
    l -= 1;
}
r = calContFrac(a, l); // fudamental solution

/*
Additional solutions from the fundamental solution
recurrence relations

x_{k+1} = x_1*x_k + n*y_1*y_k
y_{k+1} = x_1*y_k + y_1*x_k
*/

i = 1; x_k = r[0]; y_k = r[1];
do {
    x = r[0]*x_k + n*r[1]*y_k;
    y = r[0]*y_k + r[1]*x_k;
	b = (y * 2 + 1 + x) / 2;
    if (b + y > 1e12)
		break;
    x_k = x;
    y_k = y;
	i++;
} while(1);
b;
