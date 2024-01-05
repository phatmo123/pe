function randomInt(max) {
    if (typeof max == 'undefined') max = 1/0;
    return 1 + Math.floor(Math.random() * max);
}
a = ["GO", "A1", "CC1", "A2", "T1", "R1", "B1", "CH1", "B2", "B3", "JAIL", "C1", "U1", "C2", "C3", "R2", "D1", "CC2", "D2", "D3", "FP", "E1", "CH2", "E2", "E3", "R3", "F1", "F2", "U2", "F3", "G2J", "G1", "G2", "CC3", "G3", "R4", "CH3", "H1", "T2", "H2"];
re = []; for (i = 0; i < 40; ++i) {
    re.push({
        id: (i).toString().padStart(2, 0),
        name: a[i],
        co: 0
    });
}
function cc(i) {
    return a[i] == 'CC1'
        || a[i] == 'CC2'
        || a[i] == 'CC3';
}
function ch(i) {
    return a[i] == 'CH1'
        || a[i] == 'CH2'
        || a[i] == 'CH3';
}
dice = 4;
function doturn() {
    d1 = randomInt(dice);
    d2 = randomInt(dice);
    
    po += d1+d2;
    po %= 40;
    
	if (d1 == d2) {
        dbl++;
        if (dbl == 3) {
			dbl = 0;
			po = 10;
        }
    }
	else 
		dbl = 0;
	
    if (a[po] == 'G2J') {
		po = 10;
    }
    else if (cc(po)) {
        card = randomInt(16);
        if (card == 1) {
            po = 0;
        }
        else if (card == 2) {
			po = 10;
        }
    }
    else if (ch(po)) {
        card = randomInt(16);
        if (card == 1) {
            po = 0;
        }
        else if (card == 2) {
			po = 10;
        }
        else if (card == 3) {
            po = 11;
        }
        else if (card == 4) {
            po = 24;
        }
        else if (card == 5) {
            po = 39;
        }
        else if (card == 6) {
            po = 5;
        }
        else if (card == 7 || card == 8) {
            do {
                po++;
                po %= 40;
            } while (po%10 != 5);
        }
        else if (card == 9) {
            if (po > 12 && po < 28)
                po = 28;
            else
                po = 12;
        }
        else if (card == 10) {
            po -= 3;
            po %= 40;
            if (po == 33) {
                card = randomInt(16);
                if (card == 1) {
                    po = 0;
                }
                else if (card == 2) {
					po = 10;
                }
            }
        }
    }
    
    re[po].co++;
}
times = 1e7; po = 0; dbl = 0;
for (i = 0; i < times; ++i) {
    doturn();
}
for (i in re) {
    re[i].co = re[i].co*100/times;
}
re.sort((a,b) => b.co - a.co);
console.table(re);
re.length = 3;
re.map(a => a.id).reduce((a,b) => a += b);
