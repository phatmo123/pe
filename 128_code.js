function num2pos(n) {
    /*
        1 + 6 + 12 + 18 + ...
        1 + 3 * (r + 1) * r >= n
        3r2 + 3r + 1 - n >= 0
    */    
    var r = Math.ceil((Math.sqrt(9 + 12 * (n - 1)) - 3) / 6);
    var i = 1 + 3 * (r + 1) * r;
    var k = i - n;
    var e = 5 - Math.floor(k / r); // e [0 5]
    var ind = r - k % r; // ind [1 r]
    return [r, e, ind];
    // algo 1 above
    // OR
    // algo 2 below
    var i = 1, j = 0;
    do {
        if (i >= n) {
            var k = i - n;
            var r = j / 6;
            var e = 5 - Math.floor(k / r); // e [0 5]
            var ind = r - k % r; // ind [1 r]
            break;
        }
        j += 6;
        i += j;
    } while(1);
    return [r, e, ind];
}

function pos2num(a) {
    // reverse of num2pos algo 1
    var [r, e, ind] = a; // destructuring assignment
    var i = 1 + 3 * (r + 1) * r;
    var n = i - r * (5 - e) - (r - ind);
    return n;
}

/*
edge = ?
ind = 1, r, or between
    ind = 1
        e = 0: 8
            n+r*6: 20
            n+r*6-1: 19
            n+r*6+1: 21
            n+1: 9
            n-(r-1)*6: 2
            
            n+r*6-1+(r+1)*6 = n+12*r+5: 37
        e > 0: 10
            n+r*6+e: 23
            n+r*6+e-1: 22
            n+r*6+e+1: 24
            n+1: 11
            n-(r-1)*6-e: 3
            
            n-1: 9
        ---------
        r*6+e
        r*6+e-1
        r*6+e+1
        1
        (r-1)*6+e
        e == 0 ? 12*r+5 : 1
        ---------
        
    ind = r
        e = 5: 37
            n-1: 36
            n+r*6+e: 60
            n+r*6+e+1: 61
            n-(r-1)*6-e-1: 19
            n-(r-1)*6-e: 20
            
            n-(r-1)*6-e-1-(r-1)*6+1 = n-(r-1)*12-e: 8
            
            
        e < 5: 22
            n-1: 21
            n+r*6+e: 40
            n+r*6+e+1: 41
            n-(r-1)*6-e-1: 9
            n-(r-1)*6-e: 10
            
            n+1: 23
        ---------
        1
        r*6+e
        r*6+e+1
        (r-1)*6+e+1
        (r-1)*6+e
        e == 5 ? (r-1)*12+e : 1
        ---------
        
    ind between: 21
        n+1: 22
        n-1: 20
        n-(r-1)*6-e-1: 8
        n-(r-1)*6-e: 9
        n+r*6+e: 39
        n+r*6+e+1: 40
        ---------
        1
        1
        (r-1)*6+e+1
        (r-1)*6+e
        r*6+e
        r*6+e+1
        ---------
        
num2pos(32)
[3, 4, 1]
num2pos(35)
[3, 5, 1]
num2pos(34)
[3, 4, 3]
*/
function diff(n) {
    var [r, e, ind] = num2pos(n);
    if (ind == 1)
        return [ // at least 3 ele not prime (check for r*6+e odd or even case)
            r*6+e,
            r*6+e-1,
            r*6+e+1,
            1,
            (r-1)*6+e,
            e == 0 ? 12*r+5 : 1
        ];
    if (ind == r) 
        return [ // at least 3 ele not prime
            1,
            r*6+e,
            r*6+e+1,
            (r-1)*6+e+1,
            (r-1)*6+e,
            e == 5 ? (r-1)*12+e : 1
        ];
    return [ // at least 4 ele not prime
        1,
        1,
        (r-1)*6+e+1,
        (r-1)*6+e,
        r*6+e,
        r*6+e+1
    ];
}

/*
[r, e, ind]
ind [1 r]
e [0 5]
r [1 inf]
*/
max = 0;
Array.prototype.prime = function() {
    var i = this.length - 1, c = 0;
    for (; i >= 0; --i) {
        max < this[i] && (max = this[i]);
        if (seive_ar[this[i]])
            c++;
    }
    return c == 3;
}

seive(1e6);
r = 1;
e = 0;
ind = 1;
co = 0;
do {
    if (ind == 1) {
        if ([
            r*6+e,
            r*6+e-1,
            r*6+e+1,
            (r-1)*6+e,
            e == 0 ? 12*r+5 : 1
        ].prime()) {
            co++;
            nu = [r, e, 1];
        }
        ind = 2; // if ind = r; then if r = 1; make an infinite loop
    }
    else {
        if ([
            r*6+e,
            r*6+e+1,
            (r-1)*6+e+1,
            (r-1)*6+e,
            e == 5 ? (r-1)*12+e : 1
        ].prime()) {
            co++;
            nu = [r, e, r];
        }
        ind = 1;
        e++;
        if (e > 5) {
            r++;
            e = 0;
        }
    }
} while(co < 2000);
console.log('max =', max);
console.log(pos2num(nu));
