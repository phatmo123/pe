/*
2 1
3 2
4 4
5 6
6 10
7 14
8 21
9 29
10 41
f(n-1) + Math.floor(n/2) + Math.floor(n-1 / 2)


4+1
3+2
3+1+1
2+2+1
2+1+1+1
1+1+1+1+1

arr[n]
- list 2
- i in Math.floor(n/2) -> n-2 => + arr[n-i]
How n=100: 47 49 4 can be generated??
*/

seive(100); seive_check();
need = rest = 10; co = 0; r = []; // try need = 71
function search(i, last) {
    if (rest == 0) {
        co++;
        // console.log(r);
        return;
    }
    else if (rest == 1) {
        return;
    }
    max = last > rest ? rest : last;
    for (var k = ps.length - 1; k >= 0; --k)
        if (ps[k] <= max)
            break;
    for (var j = k; j >= 0; --j) {
        rest -= ps[j];
        // r[r.length] = ps[j];
        search(i+1, ps[j]);
        // r.length--;
        rest += ps[j];
    }
} search(0, need-1); co;
