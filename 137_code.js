/*
https://brilliant.org/wiki/generating-functions-solving-recurrence-relations/#solving-homogeneous-linear-recurrence-relations

c(x) = c1*x + c2*x2 + c3*x3 + ...
cn - cn-1 - cn-2 = 0
let's consider the function x2*c(x) + x*c(x) - c(x):

 x2*c(x)=                + x3*c1 + ...
+x*c(x) =        + x2*c1 + x3*c2 + ...
-c(x)   = - x*c1 - x2*c2 - x3*c3 - ...
-------------------------------------------
        = -x*c1 - x2*(c2-c1)
        = -x
=> (x2+x-1)*c(x) = -x
=> c(x) = - x/(x2+x-1)
*/
function cal(x) {
    return - x/(x**2+x-1);
}

/*
Find a so - x/(x2+x-1) = a (int) solved with x is rational
ax2 + (a+1)x - a = 0
No = -a-1+sqrt(5a2+2a+1) / 2a
=> find a so 5a2+2a+1 = b2
var=a: -2+sqrt(20b2-16) / 10
=> find b so 20b2-16 = c2 => c2-20b2 = -16

Structure of solutions to x 2 − Dy 2 = N
If r, s is a solution to x2 −Dy2= N, and t, u is any solution to x2 −Dy2= 1,
then x = rt + suD, y = ru + st, is also a solution to x2 − Dy2= N

*/
n = 20;
a = genContFracArrForSqrt(n);
l = a.length - 1;
if (l%2 == 1) {
    l = 2*l - 1;
}
else {
    l -= 1;
}
r = calContFrac(a, l); // fudamental solution
spPe = [r]; // special pell a2 - Db2 = 1
i = 1; x_k = r[0]; y_k = r[1];
do {
    x = r[0]*x_k + n*r[1]*y_k;
    y = r[0]*y_k + r[1]*x_k;
	spPe.push([x, y]);
    x_k = x;
    y_k = y;
	i++;
} while(i < 10);

gePe = [[2, 1], [8, 2]]; // general pell a2 - Db2 = c, from http://www.numbertheory.org/php/patz.html
tmp = gePe;
gePe = [];
tmp.forEach(u => {
    gePe.push(u);
    gePe.push([u[0], -u[1]]);
})
ar = [];
gePe.forEach(e1 => {
    [r, s] = e1;
    spPe.forEach(e2 => {
        [t, u] = e2;
        x = r*t + s*u*n;
        y = r*u + s*t;
        // ar.push([Math.abs(x), Math.abs(y)]);
        ar.push(Math.abs(x)); // here is c = sqrt(20b2-16)
    });
});
ar = ar.unique().map(u => (u-2)/10);
tmp = ar;
ar = [];
tmp.forEach(u => {
    if (u%1 == 0)
        ar.push(u);
});
ar = ar.sort(sortNoLambda);
ar[14];
