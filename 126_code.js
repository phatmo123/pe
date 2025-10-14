/*
origin cuboid = layer 0
layer n = layer n-1 + (n+1)*8

about split n to a*b + b*c + c*a
=> do the reverse, try a*b + b*c + c*a = n, the mark for n
=> can do it for prob 88, backtracking a1*a2* ... *an while product <= n, and mark for product ?
*/
n = 1e2;
nb = 6*n**2;
m = [];
for (a = 1; a <= n; ++a) {
	for (b = a; b <= n; ++b) {
		for (c = b; c <= n; ++c) {
			i = 2 * (a*b + b*c + c*a);
			j = 16;
			while (i <= nb) {
				if (m[i] == undefined)
					m[i] = [];
				m[i].push([a, b, c]);
				j += 8;
				i += j;
			}
		}
	}
}
console.log(m[22] == 2);
console.log(m[46] == 4);
console.log(m[78] == 5);
console.log(m[118] == 8);
console.log(m[154] == 10);
console.log(m.max());
/*
layer 1: middle c*2*(a+b), 2sides a*b
layer 2: middle c*2*(a+b)+4, 2sides a*b + 2*(a+b)
layer 3: middle c*2*(a+b)+8, 2sides a*b + 2*(a+b) + 2*(a+b)+4
layer 4: middle c*2*(a+b)+12, 2sides a*b + 2*(a+b) + 2*(a+b)+4 + 2*(a+b)+8
???
*/
n = 270;
nb = 6*n**2;
m = [];
for (a = 1; a <= n; ++a) {
    for (b = a; b <= n; ++b) {
        for (c = b; c <= n; ++c) {
			mid1 = 2 * (a + b);
			sid2 = 2 * a * b;
            i = c * mid1 + sid2;
            while (i <= nb) {
                if (m[i] == undefined)
                    m[i] = 0;
                m[i]++;
                sid2 += 2 * mid1;
                mid1 += 4;
                i = c * mid1 + sid2;
            }
        }
    }
}
console.log(m[22] == 2);
console.log(m[46] == 4);
console.log(m[78] == 5);
console.log(m[118] == 8);
console.log(m[154] == 10);
console.log(m.max());
for (i = 0; i < m.length; ++i) {
    if (m[i] == 1e3) {
        console.log('r =', i);
        break;
    }
}

/*
1) bound: layer 1: 2 * (a*b + b*c + c*a) <= mi (index of m arr)
	a <= b <= c, so
		6*a^2 <= mi (when a = b = c, b c reach min)
		4*c <= mi (when a = b = 1, a b reach min)
		2*b^2 + 4*b <= mi (when a = 1, c = b, a c reach min) => b <= Math.sqrt(mi / 2 + 1) - 1
2) if cal for mi is correct, then for mj < mi are also correct

*/
tar = 2*1e4;
m = [];
aup = Math.floor(Math.sqrt(tar / 6));
bup = Math.floor(Math.sqrt(tar / 2 + 1) - 1);
cup = Math.floor(tar / 4);
for (a = 1; a <= aup; ++a) {
    for (b = a; b <= bup; ++b) {
        for (c = b; c <= cup; ++c) {
            mid1 = 2 * (a + b);
            sid2 = 2 * a * b;
            i = c * mid1 + sid2;
            while (i <= tar) {
                if (m[i] == undefined)
                    m[i] = 0;
                m[i]++;
                sid2 += 2 * mid1;
                mid1 += 4;
                i = c * mid1 + sid2;
            }
        }
    }
}
console.log(m[22] == 2);
console.log(m[46] == 4);
console.log(m[78] == 5);
console.log(m[118] == 8);
console.log(m[154] == 10);
console.log(m.max());
for (i = 0; i < m.length; ++i) {
    if (m[i] == 1e3) {
        console.log('r =', i);
        break;
    }
}
// increse tar until r = ?, and r = 18522
