t0 = performance.now();
w1 = w.map(u => u.split('').sort().join(''));
a = {};
w1.forEach(
    (u, i) => a[u] ? (a[u].push(w[i])) : (a[u] = [w[i]])
);
w1 = null;
for (i in a)
    a[i].length == 1 && delete(a[i]);
w = {};
Object.keys(a).sort(
    (b, a) => a.length - b.length
).forEach(u => w[u] = a[u]);
a = null;

len = 0; nu = []; max = 0;
for (i in w) {
    if (len != i.length) {
        if (max > 0)
            break;
        len = i.length;
        nu = [];
        f = Math.ceil(Math.sqrt(t = 10**(len-1)));
        t = Math.floor(Math.sqrt(t*10 - 1));
        for (j = f; j <= t; ++j)
            nu.push('' + j**2);
        nu1 = nu.map(u => u.toString().split('').sort().join(''));
        nu2 = {};
        nu1.forEach(
            (u, i) => nu2[u] ? (nu2[u].push(nu[i])) : (nu2[u] = [nu[i]])
        );
        nu1 = null;
        nu = nu2;
        for (j in nu)
            nu[j].length == 1 && delete(nu[j]);
    }
    ti = i.split('');
    for (n in nu) {
        tn = n.split('');
        for (j = 1; j < len; ++j) {
            if (ti[j] != ti[j-1] && tn[j] == tn[j-1]
                || ti[j] == ti[j-1] && tn[j] != tn[j-1])
                break;
        }
        if (j == len) {
            ti = ti.unique();
            tn = tn.unique();
            for (let per of tn.permutation()) {
                map = {};
                for (k = ti.length - 1; k > -1; --k)
                    map[ti[k]] = per[k];
                c = 0;
                maxtmp = max;
                w[i].map(u => {
                    t = u.split('').map(u => map[u]).join('');
                    if (nu[n].includes(t)) {
                        c++;
                        maxtmp = Math.max(maxtmp, t);  
                    }
                });
                if (c > 1)
                    max = maxtmp;
            }
        }
    }
}
t1 = performance.now();
console.log((t1-t0)/1e3, 's');
max;

----------------------------------------------------------------------

function todo(i) {
    if (i == ikey.length) {
        c = 0;
        maxtmp = max;
        wo.map(u => {
            t = u.split('').map(u => map[u]).join('');
            if (nu[n].includes(t)) {
                c++;
                maxtmp = Math.max(maxtmp, t);  
            }
        });
        if (c > 1)
            max = maxtmp;
        return;
    }
    for (var k = 0; k < ikey.length; ++k) {
        // not check all permutation like above,
        // but check freq (char, digit frequency) matching or not
        if (mark[k] == 0 && ifreq[ikey[i]] == nfreq[nkey[k]]) {
            mark[k] = 1;
            map[ikey[i]] = nkey[k];
            todo(i+1);
            delete map[ikey[i]];
            mark[k] = 0;
        }
    }
}

t0 = performance.now();
w1 = w.map(u => u.split('').sort().join(''));
a = {};
w1.forEach(
    (u, i) => a[u] ? (a[u].push(w[i])) : (a[u] = [w[i]])
);
w1 = null;
for (i in a)
    a[i].length == 1 && delete(a[i]);
w = {};
Object.keys(a).sort(
    (b, a) => a.length - b.length
).forEach(u => w[u] = a[u]);
a = null;

len = 0; nu = []; max = 0;
for (i in w) {
    if (len != i.length) {
        if (max > 0)
            break;
        len = i.length;
        nu = [];
        f = Math.ceil(Math.sqrt(t = 10**(len-1)));
        t = Math.floor(Math.sqrt(t*10 - 1));
        for (j = f; j <= t; ++j)
            nu.push('' + j**2);
        nu1 = nu.map(u => u.toString().split('').sort().join(''));
        nu2 = {};
        nu1.forEach(
            (u, i) => nu2[u] ? (nu2[u].push(nu[i])) : (nu2[u] = [nu[i]])
        );
        nu1 = null;
        nu = nu2;
        for (j in nu)
            nu[j].length == 1 && delete(nu[j]);
    }
    ti = i.split('');
    ifreq = {}; // frequency of each char
    ti.map(u => { ifreq[u] != undefined ? ifreq[u]++ : (ifreq[u] = 1) });
    ikey = Object.keys(ifreq);
    for (n in nu) {
        tn = n.split('');
        for (j = 1; j < len; ++j) {
            if (ti[j] != ti[j-1] && tn[j] == tn[j-1]
                || ti[j] == ti[j-1] && tn[j] != tn[j-1])
                break;
        }
        if (j == len) {
            nfreq = {};  // frequency of each digit
            tn.map(u => { nfreq[u] != undefined ? nfreq[u]++ : (nfreq[u] = 1) });
            nkey = Object.keys(nfreq);
            wo = w[i];
            map = {};
            mark = [];
            for (k = ikey.length - 1; k > -1; --k)
                mark.push(0);
            todo(0);
        }
    }
}
t1 = performance.now();
console.log((t1-t0)/1e3, 's');
max;
