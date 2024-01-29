/* 
01 04 09 16 25 36 49 64 81 => 01 04 09 16 25 36 49 81 => 01 04 06 16 25 36 46 81

1) has a DIFFERENT digit (0 to 9) written on it
2) use a constraint:
    6-digit number of cube 1 < cube 2 => avoid double test (count)
3) call 2 dice: a0 => a5, b0 => b5
    then a0 0-4, a[i] < a[i+1], a[0] <= b[0], if = then a[1] <= b[1] ...
4) {..6..9} {..!6..!9} => extended set: 0
   {..!6..9} {..6..!9} => extended set: 1
5) a[i] 0-8 a0 0-3 ??
6) a0 0 => code below, use this constraint only
a1 >= 2 => b0 = 1 => if code is too slow, use this constraint
a1 >= 3 => b0 1 b1 2 => wrong => a1 < 3 => a1 1 2 => WRONG!: b0 > a0, so no care if b1 < a1

0 1 2 3 6 9
0 2 4 5 6 8

0 1 2 3 6 8 
1 3 4 5 6 8 => why code return 0 ? => ta['01'] = 1; done = 1;

backtracking:
    a0 => ... => a5 => b0 => ... => b5 ?
    or
    a0 => b0 => ... => a5 => b5 ? if all combination are ok at a[i] b[i] then set a flag done and just + 1 in the end (no more check), when try a[i+...] b[i+...]
    ※In the end, need check 6 appear in dices and try replace with 9
*/
function todo(ab, ind) {
    if (ab == 0 && ind == 6) {
        if (done == 8)
            // arr.push(a.join('') + ' - ' + b.join(''));
            re++;
        return;
    }
    var fr, to, ar = ab ? b : a, oar = ab ? a : b;
    if (ind == 0)
        fr = 0;
    else
        fr = ar[ind - 1] + 1;
    
    if (ab == 1 && great == -1)
        fr = Math.max(fr, a[ind]);
    
    to = 4 + ind;
    // pick number
    for (var i = fr; i <= to; ++i) {
        ar.push(i);
        if (ab == 1 && great == -1 && i > a[ind])
            great = ind;
        
        var pair = [];
        if (done < 8) {
            // check for new pair
            for (var nu in ta) {
                if (ta[nu]) continue;
                var s = (i == 9 ? 6 : i).toString();
                for (var j = oar.length - 1; j > -1; --j) {
                    if (ta[s + oar[j]] === 0) {
                        ta[s + oar[j]] = 1;
                        pair.push(s + oar[j]);
                        done++;
                    }
                    if (ta[oar[j] + s] === 0) {
                        ta[oar[j] + s] = 1;
                        pair.push(oar[j] + s);
                        done++;
                    }
                }
            }
        }
        
        todo(1 - ab, ab ? ind + 1 : ind);
        
        ar.length -= 1;
        for (var k = pair.length - 1; k > -1; --k) {
            ta[pair[k]] = 0;
            done--;
        }
        if (great == ind)
            great = -1;
    }
}

ta = {};
['01', '04', '06', '16', '25', '36', '46', '81'].map(u => {ta[u] = 0});
arr = []; re = 0;

great = -1; // great, set to i if a[i] b[i] is first pair that a[i] < b[i], and from i+1, no care even if b[i+] < a[i+]
done = 0;
a = [0];
b = [];
todo(1, 0); // ab: a=0, b=1
console.log(arr.length);
re;
