jqka = {J: 11, Q: 12, K: 13, A: 14, T: 10};
function po(a) {
    a = a.split(' ');
    a = a.map(u => {
        u = u.split('');
        jqka[u[0]] && (u[0] = jqka[u[0]]);
        return u;
    });
    b = {}; a.forEach(u => (b[u[0]] == undefined ? b[u[0]] = 1 : b[u[0]]++)); // value
    c = {}; a.forEach(u => (c[u[1]] == undefined ? c[u[1]] = 1 : c[u[1]]++)); // suit
	bk = Object.keys(b); bk = bk.map(u => parseInt(u)).sort(sortNo);
    ck = Object.keys(c); ck.sort(sortNo);
	if (ck.length == 1) {
        if (bk.length == 5) {
            if (bk[0] == 10) return {r: 30}; // Royal Flush: Ten, Jack, Queen, King, Ace, in same suit.
            else if (bk[0] + 4 == bk[4]) return {r: 29, bai: [bk[4]]}; // Straight Flush: All cards are consecutive values of same suit.
        }
        return {r: 26, bai: [bk[4]]}; // Flush: All cards of the same suit.
    }
    if (bk.length == 2) {
        if (b[bk[0]] == 4) return {r: 28, bai: [bk[0]]}; // Four of a Kind: Four cards of the same value.
        else if (b[bk[1]] == 4) return {r: 28, bai: [bk[1]]};
        else if (b[bk[0]] == 3) return {r: 27, bai: [bk[0]]}; // Full House: Three of a kind and a pair.
        else if (b[bk[1]] == 3) return {r: 27, bai: [bk[1]]};
    }
    if (bk.length == 5 && bk[0] + 4 == bk[4]) return {r: 25, bai: [bk[4]]}; // Straight: All cards are consecutive values.
    if (bk.length == 3) {
        if (b[bk[0]] == 3) return {r: 24, bai: [bk[0]]}; // Three of a Kind: Three cards of the same value.
        else if (b[bk[1]] == 3) return {r: 24, bai: [bk[1]]};
        else if (b[bk[2]] == 3) return {r: 24, bai: [bk[2]]};
        else if (b[bk[0]] == 2 && b[bk[1]] == 2) return {r: 23, bai: [bk[1], bk[0], bk[2]]}; // Two Pairs: Two different pairs.
        else if (b[bk[0]] == 2 && b[bk[2]] == 2) return {r: 23, bai: [bk[2], bk[0], bk[1]]};
        else if (b[bk[1]] == 2 && b[bk[2]] == 2) return {r: 23, bai: [bk[2], bk[1], bk[0]]};
    }
    if (bk.length == 4) {
        if (b[bk[0]] == 2) return {r: 22, bai: [bk[0], bk[3], bk[2], bk[1]]}; // One Pair: Two cards of the same value.
        else if (b[bk[1]] == 2) return {r: 22, bai: [bk[1], bk[3], bk[2], bk[0]]};
        else if (b[bk[2]] == 2) return {r: 22, bai: [bk[2], bk[3], bk[1], bk[0]]};
        else if (b[bk[3]] == 2) return {r: 22, bai: [bk[3], bk[2], bk[1], bk[0]]};
    }
    return {r: 21, bai: bk.reverse()};
}

function compArr(a, b) {
	var l = Math.min(a.length, b.length);
	for (var i = 0; i < l; ++i) {
		if (a[i] > b[i]) return 1;
		if (a[i] < b[i]) return -1;
	}
	return 0;
}
l = a.length;
co = 0; j = 0; for (i = 0; i < l; i += 2) {
    j++;
    p = po(a[i]); q = po(a[i+1]);
	// console.log(p, q);
    if (p.r > q.r) { co++; console.log(j, '1 win'); }
	else if (p.r < q.r) console.log(j, '2 win');
	else {
		c1 = compArr(p.bai, q.bai);
		if (c1 == 1) { co++; console.log(j, '1 win'); }
		else if (c1 == -1) console.log(j, '2 win');
		else console.log(j, 'tie');
	}
} console.log(co);

------------------------------------------------------------------------------------

jqka = {J: 11, Q: 12, K: 13, A: 14, T: 10};
function po(a) {
    a = a.split(' ');
    a = a.map(u => {
        u = u.split('');
        jqka[u[0]] && (u[0] = jqka[u[0]]);
        return u;
    });
    
	b = {}; a.forEach(u => (b[u[0]] == undefined ? b[u[0]] = 1 : b[u[0]]++)); // value
    c = {}; a.forEach(u => (c[u[1]] == undefined ? c[u[1]] = 1 : c[u[1]]++)); // suit
    bk = Object.keys(b); bk = bk.map(u => parseInt(u)).sort(sortNo);
    ck = Object.keys(c); ck.sort(sortNo);
    a = []; for (var c in b) a.push({v: parseInt(c), c: b[c]});
	a = a.sort((q, p) => {
		if (p.c != q.c) return p.c - q.c;
		return p.v - q.v;
	});
	b = []; c = [];
	for (var i = 0 ; i < a.length; ++i) {
		b.push(a[i].c);
		c.push(a[i].v);
	}
    
    if (bk.length == 5 && bk[0] + 4 == bk[4]) { // Straight
        b[0] = 3; b[1] = 1.1; // bigger than Three of a Kind
    }
    if (ck.length == 1) { // Flush
        b[0] = 3; b[1] = 1.2; // bigger than Straight
    }
    if (bk.length == 5 && bk[0] + 4 == bk[4] && ck.length == 1) { // Straight Flush
        b[0] = 4.1; // bigger than Four of a Kind
    }
    if (bk.length == 5 && bk[0] == 10 && ck.length == 1) { // Royal Straight Flush
        b[0] = 4.2; // bigger than Straight Flush
    }
    
	return [b, c];
}

function compArr(a, b) {
	var l = Math.min(a.length, b.length);
	for (var i = 0; i < l; ++i) {
		if (a[i] > b[i]) return 1;
		if (a[i] < b[i]) return -1;
	}
	return 0;
}
l = a.length;
co = 0; j = 0; for (i = 0; i < l; i += 2) {
    j++;
    p = po(a[i]); q = po(a[i+1]);
	// console.log(p, q);
    c1 = compArr(p[0], q[0]);
	if (c1 == 1) { co++; console.log(j, '1 win'); }
	else if (c1 == -1) console.log(j, '2 win');
	else if (c1 == 0) {
		c1 = compArr(p[1], q[1]);
		if (c1 == 1) { co++; console.log(j, '1 win'); }
		else if (c1 == -1) console.log(j, '2 win');
		else console.log(j, 'tie');
	}
} console.log(co);

