/* pairwise
1) 6k+1 and 6k+5 can not be in same group or concat and %3 = 0
=> if 3 in group, the rest is all 6k+1 or all 6k+2
=> if 3 not in group, all 6k+1 or all 6k+2
2) try to find upper bound with code in line 27
3) try make upper bound lower with code in line 115
*/


a = ["97"]; len = a.length; need = 5;
for (i = parseInt(a[0]) + 6; i < 1e9;) {
    if (seive_ar[i] == 1) {
        for (j = 0; j < len; ++j) {
            if (seive_ar[a[j] + i] == -1 || seive_ar[i + a[j]] == -1) break;
        }
        if (j == len) {
            a.push(i.toString()); len = a.length;
            if (len == need)
                break;
        }
    }
    i += 6;
} console.log(a);



c = []; for (k = 1e3; k < 1e4; ++k) seive_ar[k] == 1 && c.push(k.toString());
b = []; for (k = 0; k < c.length; ++k) {
    a = []; a.push(c[k]); len = a.length; need = 5;
    for (i = parseInt(a[0]) + 6; i < 1e9;) {
        if (seive_ar[i] == 1) {
            for (j = 0; j < len; ++j) {
                if (seive_ar[a[j] + i] == -1 || seive_ar[i + a[j]] == -1) break;
            }
            if (j == len) {
                a.push(i.toString()); len = a.length;
                if (len == need)
                    break;
            }
        }
        i += 6;
    } b.push(a);
}
=> found upper
["5381", "5507", "7877", "41621", "47237"]
107623


for (k = 0; k < b.length; ++k) console.log(prime(b[k][4] + b[k][0]) && prime(b[k][4] + b[k][1]) && prime(b[k][4] + b[k][2]) && prime(b[k][4] + b[k][3]));


for (k = 0; k < b.length; ++k) console.log(prime(b[k][0] + b[k][1]) && prime(b[k][0] + b[k][2]) && prime(b[k][0] + b[k][3]) && prime(b[k][0] + b[k][4]) && prime(b[k][1] + b[k][0]) && prime(b[k][1] + b[k][2]) && prime(b[k][1] + b[k][3]) && prime(b[k][1] + b[k][4]) && prime(b[k][2] + b[k][0]) && prime(b[k][2] + b[k][1]) && prime(b[k][2] + b[k][3]) && prime(b[k][2] + b[k][4]) && prime(b[k][3] + b[k][0]) && prime(b[k][3] + b[k][1]) && prime(b[k][3] + b[k][2]) && prime(b[k][3] + b[k][4]) && prime(b[k][4] + b[k][0]) && prime(b[k][4] + b[k][1]) && prime(b[k][4] + b[k][2]) && prime(b[k][4] + b[k][3]));


for (k = 0; k < b.length; ++k) console.log(prime('' + i + j) && prime('' + i + k) && prime('' + i + m) && prime('' + i + n) && prime('' + j + i) && prime('' + j + k) && prime('' + j + m) && prime('' + j + n) && prime('' + k + i) && prime('' + k + j) && prime('' + k + m) && prime('' + k + n) && prime('' + m + i) && prime('' + m + j) && prime('' + m + k) && prime('' + m + n) && prime('' + n + i) && prime('' + n + j) && prime('' + n + k) && prime('' + n + m));



r = true; for (p = 0; p < 5; ++p) for (q = 0; q < 5; ++q) {
    if (p == q) continue;
    r = r && prime(b[k][p] + b[k][q]);
} console.log(r);


["3", "7", "109", "673"],
["3", "11", "701", "8747"],
["3", "13", "331", "196927"],
["3", "17", "449", "2069"],
["3", "19", "31", "1237"],
["3", "23", "1481", "39671"],
["3", "29", "137", "9857"],
["3", "31", "1237", "6571"],
["3", "37", "67", "2377"],
["3", "41", "719", "12413"],
["3", "43", "271", "1025383"],
["3", "47", "947", "808307"],
["3", "53", "1481", "32687"],
["3", "59", "929", "1002359"],
["3", "61", "331", "3637"],
["3", "67", "2377", "118861"],
["3", "71", "719", "947"],
["3", "73", "607", "18523"],
["3", "79", "613", "68743"],
["3", "83", "449", "78893"],
["3", "89", "137", "908549"],
["3", "91", "331", "10771"],
["3", "97", "373", "846877"],
["7", "19", "97", "3727"],
["11", "23", "743", "1871"],
["13", "19", "577", "28219"],
["17", "83", "449", "362897"],
["19", "31", "181", "9679"],
["23", "47", "1481", "4211"],
["29", "71", "2477", "100829"],
["31", "139", "907", "90247"],
["37", "67", "1303", "113017"],
["41", "227", "593", "56093"],
["43", "97", "1381", "8521"],
["47", "149", "251", "1002377"],
["53", "113", "5333", "30491"],
["59", "167", "2087", "98081"],
["61", "151", "4657", "111187"],
["67", "139", "547", "22039"],
["71", "233", "1163", "100937"],
["73", "277", "1933", "109849"],
["79", "193", "1627", "105373"],
["83", "227", "719", "1000253"],
["89", "107", "1061", "4973"],
["91", "127", "331", "663589"],
["97", "157", "10627", "20959"]

["5381", "5507", "7877", "41621", "47237"]
107623

seive(107623); seive_check(); len = ps.length; seive_ar = null; s = 1e6;
for (i = 5; i < len; ++i) {
    console.log('i =',i);
    for (j = i+1; j < len; ++j) {
        if ((ps[j]-ps[i])%6 != 0)
            continue;
        if (!(prime('' + ps[i] + ps[j]) && prime('' + ps[j] + ps[i])))
            continue;
        for (k = j+1; k < len; ++k) {
            if ((ps[k]-ps[j])%6 != 0)
                continue;
            if (!(prime('' + ps[i] + ps[k]) && prime('' + ps[j] + ps[k]) && prime('' + ps[k] + ps[i]) && prime('' + ps[k] + ps[j])))
                continue;
            for (m = k+1; m < len; ++m) {
                if ((ps[m]-ps[k])%6 != 0)
                    continue;
                if (!(prime('' + ps[i] + ps[m]) && prime('' + ps[j] + ps[m]) && prime('' + ps[k] + ps[m]) && prime('' + ps[m] + ps[i]) && prime('' + ps[m] + ps[j]) && prime('' + ps[m] + ps[k])))
                    continue;
                for (n = m+1; n < len; ++n) {
                    if ((ps[n]-ps[m])%6 != 0)
                        continue;
                    if (!(prime('' + ps[i] + ps[n]) && prime('' + ps[j] + ps[n]) && prime('' + ps[k] + ps[n]) && prime('' + ps[m] + ps[n]) && prime('' + ps[n] + ps[i]) && prime('' + ps[n] + ps[j]) && prime('' + ps[n] + ps[k]) && prime('' + ps[n] + ps[m])))
                        continue;
                    if (s > (ps[i]+ps[j]+ps[k]+ps[m]+ps[n])) {
                        s = ps[i]+ps[j]+ps[k]+ps[m]+ps[n];
                        console.log(ps[i],ps[j],ps[k],ps[m],ps[n],s);
                    }
                }
            }
        }
    }
}
=> from 107623, when found new one, update upper bound to seive()
7 1237 2341 12409 18433 = 34427 => try answer => incorrect
13 5197 5701 6733 8389 = 26033 => try answer => correct