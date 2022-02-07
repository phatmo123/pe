/*
Try "It seems that ..." rule and get right answer

ii. Need check sum of first m+1 num > sum of last m num: m=1->floor(n/2)
so i. Need check for B and C (same set length)

a1+a2 > an
a2 <= an-n+2 (= <=> consecutive sequence a2->an)
=> a1 > n-2
but for n > 4, a1 > n-1 (or a2+a5 = a3+a4 because of consecutive)

upper bound for n=7: sum 255
so ai < ai+1 < (255-(a1+...+ai))/(n-i)

How to check if backtracking: when add a new element:
- can't check ii. until all n elements are added
- check i.
    store list sum s1 = [a1]
    when add a2 => s2 = s1.map(u => u+a2) + [a2] + s1 
        => s2.length = 2*s1.length + 1
    ... => s7 when done

*/

function todo(i) {
    if (i == n+1) {
        // check ii.
        t = Math.floor(n/2);
        fi = a[1];
        la = 0;
        for (m = 1; m <= t; ++m) {
            fi += a[m+1];
            la += a[n-m+1];
            if (fi <= la)
                return;
        }
        t = a.clone();
        t.shift();
        r.push(t);
		return;
    }
    else if (i == 3) {
        sufi2 = a[1] + a[2]; // add this check and done real quick
    }
    else if (i < 3) {
        sufi2 = 1e3;
    }
    
    to = Math.min(Math.ceil((up-su)/(n-i+1)), sufi2);
    for (var j = a[i-1] + 1; j < to; ++j) {
        // check i.
        s[i] = s[i-1].map(u => u+j).concat([j]).concat(s[i-1]).unique();
        if (s[i].length == s[i-1].length * 2 + 1) {
            // go
            a[i] = j;
            su += j;
            todo(i+1);
            su -= j;
            a.length = i;
        }
    }
}
t0 = performance.now();
n = 7;
su = 0;
sufi2 = 1e3; // sum first 2
a = [n-1];
s = [[]];
r = [];
up = 255 + 1; // [20, 31, 38, 39, 40, 42, 45]
todo(1);
t1 = performance.now();
console.log((t1-t0)/1e3, 's');
r;

/*
speed up? : use sufi array, and s[i].max() must < sufi[i+1] ?
...
*/
