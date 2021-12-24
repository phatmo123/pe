/*
backtracking:
    choose 2 num => ope => order if - or / => sort => choose 2 num => ... 1 num
    in each todo(), generate new num list for next todo(), and pass
*/

ope = [(a, b) => a + b, (a, b) => a * b];
ope2 = [(a, b) => a - b, (a, b) => a / b];
max = 29;
s = '1234';
for (i1 = 0; i1 < 7; ++i1)
for (i2 = i1 + 1; i2 < 8; ++i2)
for (i3 = i2 + 1; i3 < 9; ++i3)
for (i4 = i3 + 1; i4 < 10; ++i4) {
	a = [[i1, i2, i3, i4]];
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
					// ope
					for (o = 0; o < 2; ++o) {
						e = d.clone();
						e.push(ope[o](c[j], c[k]));
						e = e.sort(sortNoLambda);
						b.push(e);
					}
					for (o = 0; o < 2; ++o) {
						e = d.clone();
						e.push(ope2[o](c[j], c[k]));
						e = e.sort(sortNoLambda);
						b.push(e);
						e = d.clone();
						e.push(ope2[o](c[k], c[j]));
						e = e.sort(sortNoLambda);
						b.push(e);
					}
					d = null;
				}
			}
		}
		a.length = 0;
		b = b.map(u => JSON.stringify(u)).unique().map(u => JSON.parse(u));
		t = b; b = a; a = t;
		num--;
	}
	while(num > 1);
	a = a.map(u => u[0]%1 == 0 && u[0] > 0 ? u[0] : 0).unique().sort(sortNoLambda);
	for (i = 1; i < a.length; ++i) if (a[i] != i) break;
	if (i > max) {
		s = '' + i1 + i2 + i3 + i4;
		max = i;
	}
} s;
