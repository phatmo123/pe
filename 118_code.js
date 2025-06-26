/*
Backtracking
*/
op = parseInt(location.search.substr(1)); // 1, 0
function todo(i) {
    /*
    [2] [5] [1...] [3...] [7...] [9...]
    to be primes, need 1 3 7 9 in that group?
    */
    if (op) {
        if (a.length > 6)
            return;
        
        if (i == to1 && a[0].length == 1) { // [1]
            a[0].push(to1);
            todo(to);
            a[0].pop();
            return;
        }
    }
    var j;
    if (i >= to) {
        if (op) {
            for (j = 0; j < a.length; ++j) {
                /*
                need to avoid [1] group, check here or check in todo when i = 9
                done at line 14
                */
                if ( // now check
                    a[j].length > 1 && (
                        a[j].sum()%3 == 0
                        || a[j].intersect([1, 3, 7, 9]).length == 0
                    )
                    || a[j].length == 1 && !prime(a[j][0])
                ) { // NG
                    // ng = a[j].max();
                    // console.log(JSON.parse(JSON.stringify(a)), 'NG at', j, ng);
                    return;
                }
            }
        }
        p = 1;
        // cs = [];
        for (j = 0; j < a.length; ++j) { // check permutation
            c = 0;
            for (let per of a[j].permutation())
                if (prime(parseInt(per.join(''))))
                    c++;
            p *= c;
            // cs.push(c);
            if (p == 0)
                break;
        }
        co += p;
        // if (p > 0) console.log(p, cs, JSON.parse(JSON.stringify(a)));
        // t.push(a.map(u => u.join('')).reduce((a1, a2) => a1 + '_' + a2));
        return;
    }
    
    // use a.length or local "len" var ?
    for (j = 0; j < a.length; ++j) {
        a[j].push(i);
        todo(i + 1);
        a[j].pop();
        if (op) {
            // if (ng < i)
                // return;
            // ng = 10;
        }
    }
    a.push([i]);
    todo(i + 1);
    a.length--;
    if (op) {
        // if (ng < i)
            // return;
        // ng = 10;
    }
}
a = [[1]]; // groups
co = 0;
to = 10;
to1 = to - 1;
ng = to;
t = [];
t0 = performance.now();
todo(2);
t1 = performance.now();
console.log((t1-t0)/1e3, 's');
// console.log(t);
// console.log(t.map(u => u.split('_').length).max());
// t.length in https://oeis.org/A000110
co;

/*
What was wrong:
- bug in prime(3) => false

- ng = a[j].max();
    if (ng < i)
        return;
    is wrong, try with to = 8
    "1234567", "123456_7", "123457_6", "12345_67", "12345_6_7", "123467_5", "12346_57", "12346_5_7", "12347_56", "1234_567", "1234_56_7", "12347_5_6", "1234_57_6", "1234_5_67", "1234_5_6_7", "123567_4", "12356_47", "12356_4_7"
    
    jump from 12347_5_6 to 123567_4, miss 1234_5_67 ...

Optimize: 6~10 "s" => ~2 "s"
Amazing! if remove parseInt in "if (prime(parseInt(per.join(''))))" -> slow
*/
