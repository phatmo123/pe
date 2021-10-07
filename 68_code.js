function gen(i) {
    if (i == imax) {
        a.push([...next]);
        // calc here?
        return;
    }
    for (var j = 0; j < l; ++j) {
        if (m[j] != undefined) continue;
        if (black[i] && black[i].includes(j)) continue;
        if (j == 1 && m[l-1] < i) return; // not allow "pick e before b"
        m[j] = i;
        next[i] = su[j];
        gen(i+1);
        m[j] = undefined;
    }
}
l = 5;
b = Array.from({length: 2*l-1}, (v, i) => i+1);
for (su of b.subsets()) {
    if (su.length == l && su.reduce((a,b) => a+b)%l == 0) {
        a = [];
        
        // ab...e
        m = new Array(l);
        m[0] = 0; m[1] = 1; m[l-1] = l-1;
        next = []; next[0] = su[0];
        next[1] = su[1]; next[l-1] = su[l-1];
        black = [];
        imax = l-1;
        gen(2);
        // a[a.length] = undefined;
        
        // a!b...e
        m = new Array(l);
        m[0] = 0; m[l-1] = l-1;
        next = []; next[0] = su[0];
        next[l-1] = su[l-1];
        // at index i of next, can not use su[i] if black[i] = 1
        black = []; black[1] = [1];
        imax = l-1;
        gen(1);
        // a[a.length] = undefined;
        
        // ab...!e
        m = new Array(l);
        m[0] = 0; m[1] = 1;
        next = []; next[0] = su[0];
        next[1] = su[1];
        black = []; black[l-1] = [l-1];
        imax = l;
        gen(2);
        // a[a.length] = undefined;
        
        // a!b...!e
        m = new Array(l);
        m[0] = 0;
        next = []; next[0] = su[0];
        black = []; black[1] = black[l-1] = [1, l-1];
        imax = l;
        gen(1);
        
        // console.table(a);
        a.forEach((u) => {
            u[u.length] = u[0]; min = 1e2; max = 0; mini = maxi = 0;
            for (i = u.length - 1; i > 0; --i) {
                var t = u[i] + u[i-1];
                if (min > t) {
                    min = t;
                    mini = i-1;
                }
                else if (max < t) {
                    max = t;
                    maxi = i-1;
                }
            }
            // u.length--;
            
            sum = min + 2*l;
            a2 = Array.from({length: 2*l}, (v, i) => 0);
            for (i = 0; i < l; ++i) a2[u[i]] = 1;
            for (i = 1; i < a2.length; ++i)
                if (!a2[i]) {
                    exleast = i;
                    a2[i] = 1;
                    break;
                }
            if (max + exleast != sum)
                return;
            
            o = [];
            for (i = u.length - 1; i > 0; --i) {
                var t = sum - u[i] - u[i-1];
                o[i] = t;
                
                if (i == mini || i == maxi) continue;
                if (a2[t])
                    return;
                a2[t] = 1;
            }
            
            console.log('inner =', u, 'sum =', sum, 'outer =', o);
        });
    }
} console.log('done');

