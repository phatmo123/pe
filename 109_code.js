/*
Last one must be double
Can throw 1,2, or 3 dart

D3	 	 	 = 10
D1	D2	 	 = 8
S2	D2	 	 = 9
D2	D1	 	 = 5
S4	D1	 	 = 6
S1	S1	D2	 = 7
S1	T1	D1	 = 0
S1	S3	D1	 = 1
D1	D1	D1	 = 2
D1	S2	D1	 = 3
S2	S2	D1	 = 4

*/

// 0.2171750001143664 "s"
a = [];
for (i = 1; i <= 20; ++i) {
    a.push({n: 'S' + i, s: i, t: 'S'}); // n=name, s=score, t=type
    a.push({n: 'D' + i, s: 2*i, t: 'D'});
    a.push({n: 'T' + i, s: 3*i, t: 'T'});
}
a.push({n: 'S' + 25, s: 25, t: 'S'});
a.push({n: 'D' + 25, s: 50, t: 'D'});
a.sort((a,b) => a.s - b.s);

function todo(i, lastj) {
    // to prevent permutation of dart
    // make a rule the second dart must after (or same) the first dart
    // implement it by lastj
    if (i == 3) {
        // must end here, record it
        if (sum == tar)
            r.push(b.map(u => a[u].n).reverse());
        return;
    }
    for (var j = lastj; j < n; ++j) {
        // reverse the sequence
        // and the first dart (actually the last) must D
        if (i == 0 && a[j].t != 'D')
            continue;
        if (sum + a[j].s > tar)
            break;
        b[i] = j;
        sum += a[j].s;
        if (sum == tar) {
            // record it
            r.push(b.map(u => a[u].n).reverse()); // reverse() is mutating
        }
        else
            todo(i + 1, i == 0 ? 0 : j);
        sum -= a[j].s;
        b.length = i;
    }
}
r = [];
t0 = performance.now();
for (tar = 1; tar <= 99; ++tar) {
    n = a.length;
    sum = 0;
    b = [];
    todo(0, 0);
}
t1 = performance.now();
console.log((t1-t0)/1e3, 's');
r.length;

//-------------------------------------------------------------

// reverse version of above: "no for loop of tar" 0.04466999997384846 "s"
a = [];
for (i = 1; i <= 20; ++i) {
    a.push({n: 'S' + i, s: i, t: 'S'}); // n=name, s=score, t=type
    a.push({n: 'D' + i, s: 2*i, t: 'D'});
    a.push({n: 'T' + i, s: 3*i, t: 'T'});
}
a.push({n: 'S' + 25, s: 25, t: 'S'});
a.push({n: 'D' + 25, s: 50, t: 'D'});
a.sort((a,b) => a.s - b.s);

function todo(i, lastj) {
    // to prevent permutation of dart
    // make a rule the second dart must after (or same) the first dart
    // implement it by lastj
    if (i == 3)
        return;
    for (var j = lastj; j < n; ++j) {
        // reverse the sequence
        // and the first dart (actually the last) must D
        if (i == 0 && a[j].t != 'D')
            continue;
        if (sum + a[j].s > tarup)
            break;
        b[i] = j;
        sum += a[j].s;
        if (tardown <= sum && sum <= tarup) {
            // record it
            r.push(b.map(u => a[u].n).reverse()); // reverse() is mutating
        }
        todo(i + 1, i == 0 ? 0 : j);
        sum -= a[j].s;
        b.length = i;
    }
}
r = [];
t0 = performance.now();
tarup = 99;
tardown = 1;
n = a.length;
sum = 0;
b = [];
todo(0, 0);
t1 = performance.now();
console.log((t1-t0)/1e3, 's');
r.length;
