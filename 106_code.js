/*
'121212' => 0
'122112' => 1
=> When exist n that the nth '1' has bigger index than nth '2' => 1
*/
function check(a) {
	var n1 = n2 = r = 0;
	var i1, i2, i;
	for (i1 = i2 = i = a.length - 1; i > -1; --i) {
		if (a[i] == 1) {
			i1 = i;
			n1++;
		}
		else if (a[i] == 2) {
			i2 = i;
			n2++;
		}
		if (n1 == n2 && i2 < i1)
			r = 1;
	}
	if (n1 != n2)
		return 0;
	return r;
}

function todo(i) {
    if (i == n) {
        if (a.includes(1) && a.includes(2))
            if (check(a))
				c++;
        return;
    }
    for (var j = 0; j < 3; ++j) {
        if (f == -1) { // still no element get into a set
            if (j == 2) // rule that first element get into a set, must into set 1
                continue;
            if (j == 1) // rule that first element get into a set, must into set 1 (f = that index)
                f = i;
        }
        a[i] = j;
        todo(i+1);
        a.length = i;
        if (f == i)
            f = -1;
    }
}

n = 12;
// mark if some index already is in subset 1 (f = that index), prevent case 1212 vs 2121
// (1 and 2 have same role, so let's make rule that first element get into a set, must into set 1)
f = -1; 
c = 0;
a = [];
todo(0);
c;
