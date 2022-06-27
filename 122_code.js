/*
a*b = c
m[c] <= m[a] + m[b]

m[c] <= m[c-1] + 1

m[c] <= m[c-2] + 1 // because ^2 always already calculated

1...0... = c
m[c] <= (c).toString(2).length - 1 + (c).toString(2).replace(/0/g, '').length - 1
*/
// algo 1
n = 200;
fa_seive(n);
m = [0, 0, 1, 2];
for (i = 4; i <= n; ++i) {
	a = fa_ar[i];
	if (a.length == 1) { // prime
		a = (i).toString(2);
		m[i] = Math.min(a.length - 1 + a.replace(/0/g, '').length - 1, m[i - 1] + 1, m[i - 2] + 1);
	}
	else {
		m[i] = m[a[0]] + m[a.product(1)];
	}
} 
console.log(m.sum());
console.log(m.sum(0, 10));
console.log(m.sum(0, 20));
console.table(m);
// 1626 WRONG ? not use line 38 yet

//----------------------------------------------------------

/*
a*b = c
m[c] <= m[a] + m[b]

a+b = c
m[c] <= m[a] + m[b] + 1 - (but need remove overlap path of a and b)

no use
1...0... = c
m[c] <= (c).toString(2).length - 1 + (c).toString(2).replace(/0/g, '').length - 1
*/
// algo 2
n = 200;
fa_seive(n);
m = [];
m[1] = {s: 0, a: [], u: 0};
su = 0;
for (i = 2; i <= n; ++i) {
	m[i] = {s: 0};
	b = fa_ar[i];
	m[i].s = i;
	if (b.length > 1) {
		x = m[b[0]];
		y = m[i/b[0]];
		m[i].s = x.s + y.s;
		m[i].a = x.a.concat(y.a.map(u => u * x.a[x.a.length - 1]));
		m[i].u = b[0] + ' * ' + i/b[0];
	}
	for (j = 1; j <= Math.floor(i/2); ++j) {
		k = i-j;
		t = m[j].s + m[k].s + 1 - m[j].a.intersect(m[k].a).length;
		if (m[i].s > t) {
			m[i].s = t;
			m[i].a = m[j].a.concat(m[k].a).unique().sort(sortNoLambda).concat([i]);
			m[i].u = j + ' + ' + k;
		}
	}
	su += m[i].s;
}
for (i = 2; i <= n; ++i)
    m[i].a = JSON.stringify(m[i].a);
console.log(su);
console.table(m);
// 1603 WRONG ? check line 136

//----------------------------------------------------------

/*
or

brute force
start from a = [1]
1. clone a to a1
2. b = a + a1 (each of a + each of a1, remove duplicated * and duplicated result)
3. check what numbers are reached in result
4. a = b
5. while some numbers still not reached, goto 1.

use marked arr for number ?
*/
// algo 3
function todo(d) {
	a = [1];
	c = 0;
	m = [];
	for (i = 2; i < d; ++i)
		m[i] = d;
	do {
		c++;
		l = a.length;
		b = [];
		for (i = 0; i < l; ++i) {
			for (j = i; j < l; ++j) {
				x = a[i] + a[j];
				if (!a.includes(x))
					m[x] = c;
				if (x == d) {
					if (m[a[i]] == c - 1 && m[a[j]] == c - 1)
						m[x] = c + 1;
					else
						m[x] = c;
					return m[x];
				}
				else
					b.push(x);
			}
		}
		a = a.concat(b).unique();
	} while(1);
}
console.log(todo(15));
// WRONG ?? => yes, doing multi exps at a time, so WRONG

//----------------------------------------------------------

/*
a+b = c
m[c] <= m[a] + m[b] + 1 - (but need remove overlap path of a and b)

a+d = e
m[e] <= m[a] + m[d] + 1 - (but need remove overlap path of a and d)

a may has multi short path, ex. a1 a2
b has b1, d has d1 only

what if a1 overlap with b1 more than a2
but a2 overlap with d1 more than a1 ??

=> BFS: generate all state of array when do a new calculation (no DP)
foreach ^n, do the cal (waste of overlaped cal ?)
or
do the cal, and mark what ^n is reached ? does this miss some cases ?
*/
// algo 4
function todo(n) {
    a = [[1]];
    c = 0;
    do {
        c++;
        b = [];
        for (k = a.length - 1; k >= 0; --k) {
            t = a[k];
            for (i = t.length - 1; i >= 0; --i) {
                for (j = i; j >= 0; --j) {
                    x = t[i] + t[j];
                    if (x > n || t.includes(x))
                        continue;
                    if (sum[x] == undefined)
                        sum[x] = t[i] + ' + ' + t[j];
                    if (x == n)
                        return c;
                    b.push(t.clone().concat([x]));
                }
            }
        }
        a = null;
        b = b.map(u => JSON.stringify(u)).unique().map(u => JSON.parse(u));
        // console.log(b);
        a = b;
    } while(c < 15);
}
t0 = performance.now();
sum = [];
console.log(todo(23));
console.table(sum);
t1 = performance.now();
console.log((t1-t0)/1e3, 's');

// algo 4.1
function todo(n) {
    mc = 1;
    a = [[1]];
    c = 0;
    do {
        c++;
        b = [];
        for (k = a.length - 1; k >= 0; --k) {
            t = a[k];
            for (i = t.length - 1; i >= 0; --i) {
                for (j = i; j >= 0; --j) {
                    x = t[i] + t[j];
                    if (x > n || t.includes(x))
                        continue;
                    if (m[x] == undefined) {
                        m[x] = c;
                        if (++mc == n)
                            return;
                    }
                    b.push(t.clone().concat([x]));
                }
            }
        }
        a = null;
        b = b.map(u => JSON.stringify(u)).unique().map(u => JSON.parse(u));
        a = b;
        // console.log(c, mc, m);
    } while(c < 15);
}
n = 120;
t0 = performance.now();
m = [0, 0];
todo(n);
t1 = performance.now();
console.log((t1-t0)/1e3, 's');

// algo 4.1.1
function todo(n) {
    m = [0, 0];
    mc = 1;
    t = new Uint8Array(1);
    t[0] = 1;
    a = [t];
    c = 0;
    do {
        c++;
        b = [];
        for (k = a.length - 1; k >= 0; --k) {
            t = a[k];
            for (i = c - 1; i >= 0; --i) {
                for (j = i; j >= 0; --j) {
                    x = t[i] + t[j];
                    if (x > n || t.includes(x))
                        continue;
                    if (m[x] == undefined) {
                        m[x] = c;
                        if (++mc == n)
                            return;
                    }
                    t2 = new Uint8Array(c + 1);
                    for (p = c - 1; p >= 0; --p)
                        t2[p] = t[p];
                    t2[c] = x;
                    b.push(t2);
                }
            }
        }
        a = null;
        b = b.map(u => JSON.stringify(u)).unique().map(u => {
            q = JSON.parse(u);
            t = new Uint8Array(c + 1);
            for (k = 0; k <= c; ++k)
                t[k] = q[k];
            return t;
        });
        a = b;
        // console.log(c, mc, m);
    } while(c < 15);
}
n = 120;
t0 = performance.now();
m = new Uint8Array(n + 1);
m[0] = m[1] = 0;
todo(n);
t1 = performance.now();
console.log((t1-t0)/1e3, 's');

/*
need check for 23, algo 2 => 7, algo 4 => 6
2 4 5 9 14 23 => 6
*/

// algo 4.2: no array 8byte
function todo(n) {
    m = new Uint8Array(n + 1);
    m[0] = m[1] = 0;
    a = new Uint8Array(1e7);
    a[0] = 1;
    alen = 1;
    t = new Uint8Array(15);
    b = new Uint8Array(1e7);
    mc = 1;
    c = 0;
    
    do {
        c++;
        blen = 0;
        for (k = alen/c - 1; k >= 0; --k) {
            // copy to t
            i = k * c;
            for (j = 0; j < c; ++j)
                t[j] = a[i++];
            
            for (i = c - 1; i >= 0; --i) {
                for (j = i; j >= 0; --j) {
                    x = t[i] + t[j];
                    if (x > n || t.includes(x)) // includes use ok
                        continue;
                    if (m[x] == 0) {
                        m[x] = c;
                        if (++mc == n)
                            return;
                    }
                    
                    for (p = 0; p < c; ++p)
                        b[blen++] = t[p];
                    b[blen++] = x;
                }
            }
        }
        // b = b.map(u => JSON.stringify(u)).unique().map(u => {
            // q = JSON.parse(u);
            // t = new Uint8Array(c + 1);
            // for (k = 0; k <= c; ++k)
                // t[k] = q[k];
            // return t;
        // });
        tm = b; b = a; a = tm;
        alen = blen;
        console.log(c, blen, blen/(c+1));
        // console.log(c, mc, m);
    } while(c < 15);
}
function la() {
    var s = '' + a[0];
    for (var i = 1; i < alen; ++i)
        s += ' ' + a[i];
    return s;
}
function lb() {
    var s = '' + b[0];
    for (var i = 1; i < blen; ++i)
        s += ' ' + b[i];
    return s;
}
n = 23;
t0 = performance.now();
todo(n);
t1 = performance.now();
console.log((t1-t0)/1e3, 's');

/*
algo 4.3: 
no need 
for (i = c - 1; i >= 0; --i) {
    for (j = i; j >= 0; --j) {
        x = t[i] + t[j];
        
just
i = c - 1;
for (j = i; j >= 0; --j) {
    x = t[i] + t[j];

can prove that with i < c - 1, x = t[i] + t[j] already sastify t.includes(x)
speed up!
even not b.unique() yet! 0.34157500000037544 "s"
*/
function todo(n) {
    m = new Uint8Array(n + 1);
    m[0] = m[1] = 0;
    a = new Uint8Array(4 * 1e7);
    a[0] = 1;
    alen = 1;
    t = new Uint8Array(15);
    b = new Uint8Array(4 * 1e7);
    mc = 1;
    c = 0;
    
    do {
        c++;
        blen = 0;
        for (k = alen/c - 1; k >= 0; --k) {
            // copy to t
            i = k * c;
            for (j = 0; j < c; ++j)
                t[j] = a[i++];
            
            i = c - 1;
            for (j = i; j >= 0; --j) {
                x = t[i] + t[j];
                if (x > n || t.includes(x)) // includes use ok
                    continue;
                if (m[x] == 0) {
                    m[x] = c;
                    if (++mc == n)
                        return;
                }
                
                for (p = 0; p < c; ++p)
                    b[blen++] = t[p];
                b[blen++] = x;
            }
        }
        // b = b.map(u => JSON.stringify(u)).unique().map(u => {
            // q = JSON.parse(u);
            // t = new Uint8Array(c + 1);
            // for (k = 0; k <= c; ++k)
                // t[k] = q[k];
            // return t;
        // });
        tm = b; b = a; a = tm;
        alen = blen;
        // console.log(c, blen, blen/(c+1));
        // console.log(c, mc, m);
    } while(c < 15);
}
function la() {
    var s = '' + a[0];
    for (var i = 1; i < alen; ++i)
        s += ' ' + a[i];
    return s;
}
function lb() {
    var s = '' + b[0];
    for (var i = 1; i < blen; ++i)
        s += ' ' + b[i];
    return s;
}
n = 200;
t0 = performance.now();
todo(n);
t1 = performance.now();
console.log((t1-t0)/1e3, 's');
Array.from(m).sum();

/*
above BFS, can not save path
=> DFS, with max depth~12
