/*
brute force => not work for prob 110

6*(a+b)=a*b
if b=at:
6*(a+at)=a2*t
6+6t=at
a-6 | 6

1/7+1/42=1/6 => 1/36
1/8+1/24=1/6 => 2/18
1/9+1/18=1/6 => 3/12
1/12+1/12=1/6 => 6/6
...
1/10+1/15=1/6 => 4/9

1/(a+x)+1/(a+a2/x)=1/a
(a+x+a+a2/x)*a=(a+x)*(a+a2/x)
(2ax+x2+a2)*a=(a+x)*(ax+a2) correct

answer = x => number of divisor of x^2
calculate product of (factor frequency + 1)s, which compare to x, each factor frequency is doubled
*/
n = 1e6;
fa_seive(n);
max = 0;
for (i = 2; i <= n; ++i) {
    o = {};
    fa_ar[i].map(u => {
        if (o[u] == undefined)
            o[u] = 1;
        else
            o[u]++;
    });
    p = 1;
    for (j in o)
        p *= (2*o[j] + 1);
    if (p > 2000)
        break;
} i;
