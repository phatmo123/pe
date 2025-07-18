/*
brute force
n = 15 speed ok, but if n ~ 2000, NG
*/
function todo(i) {
	var j;
	if (i == n) {
		if (b > r) {
			x = 1;
			y = 1;
			for (j = fr.length - 1; j > -1; --j) {
				x *= fr[j][0];
				y *= fr[j][1];
			}
			z = gcd(x, y);
			x /= z;
			y /= z;
			max = Math.max(max, y);
			fr2.push([x, y]);
		}
		return;
	}
	for (j = 0; j < 2; ++j) {
		if (j == 0) {
			fr.push([1, i + 2]);
			b++;
			todo(i + 1);
			b--;
			fr.pop();
		}
		else {
			fr.push([i + 1, i + 2]);
			r++;
			todo(i + 1);
			r--;
			fr.pop();
		}
	}
}
n = 15;
b = r = 0;
fr = [];
fr2 = [];
max = 1;
todo(0);
c = 0;
for (j = fr2.length - 1; j > -1; --j)
	c += fr2[j][0] * max / fr2[j][1];
console.log(c, '/', max, '=>', Math.floor(max / c));

/*
with n, keep sum of probability of (b = i) with 0 <= i <= n ? f(n, i)

f = [];
f[2] = [1/3, 1/2, 1/6];

n => n+1:
f(n+1, i) = f(n, i-1)*1/(n+2) + f(n, i)*(n+1)/(n+2) with 0 <= i <= n
	=> f(n+1, 0) = f(n, 0)*(n+1)/(n+2)
f(n+1, n+1) = f(n, n)*1/(n+2)

real quick
*/
f = [];
f[2] = [1/3, 1/2, 1/6];
n = 3;
do {
    f[n] = [];
    f[n][0] = f[n-1][0] * n / (n+1);
    for (i = 1; i <= n; ++i)
        f[n][i] = f[n-1][i - 1] / (n+1) + f[n-1][i] * n / (n+1);
    f[n][n] = f[n-1][n-1] / (n+1);
    t = 0;
    for (i = Math.ceil((n+1) / 2); i <= n; ++i)
        t += f[n][i];
    console.log(n, Math.floor(1/t));
    n++;
} while (n <= 15);
// console.log(f);
