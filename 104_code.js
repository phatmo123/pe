/*
brute-force => slow
*/
t0 = performance.now();
fn_2 = fn_1 = 1n; i = 3;
do {
    fn = fn_1 + fn_2;
	if (i > 2749) {
        f = fn.toString();
        t = [...new Set(f.substr(0, 9).split(''))];
        if (t.length == 9 && !t.includes('0')) {
            t = [...new Set(f.substr(f.length - 9, 9).split(''))];
            if (t.length == 9 && !t.includes('0'))
                break;
        }
    }
	fn_2 = fn_1;
	fn_1 = fn;
    i++;
} while(1);
t1 = performance.now();
console.log((t1-t0)/1e3, 's');
i;

-----------------------------------------------------

t0 = performance.now();
fn_2 = fn_1 = 1n; i = 3; c = 1; bi = BigInt(1e9);
do {
    fn = fn_1 + fn_2;
    f = fn.toString();
    t = [...new Set(f.substr(f.length - 9, 9).split(''))];
    if (t.length == 9 && !t.includes('0')) {
        c--;
        if (c == 0)
            break;
    }
	fn_2 = fn_1 % bi;
	fn_1 = fn % bi;
    i++;
} while(1);
t1 = performance.now();
console.log((t1-t0)/1e3, 's');
i;

-----------------------------------------------------

// compare list of 10 first digit from 2 way, keep all digit and keep d digit
// hypothesis: to calculate to i = 2*10**j, should keep at least d=9+j+1 digit
// i=2, get affect from 10th digits, 20, from 11th, 200, from 12th ...
t0 = performance.now();
fn_2 = fn_1 = 1n; i = 3; c = 1; s = ''; d = 20;
// if fn_1 has more digit than fn_2, keep to d+1 digit for fn_1
dp1flag = 0;
do {
    fn = fn_1 + fn_2;
    f = fn.toString();
    t = [...new Set(f.substr(0, 9).split(''))];
    if (t.length == 9 && !t.includes('0')) {
        c--;
        if (c == 0)
            break;
    }
    f1 = fn_1.toString();
    fn_2 = parseInt(f1.substr(0, d));
    if (dp1flag) {
        fn_1 = parseInt(f.substr(0, d));
        dp1flag = 0;
    }
    else
        fn_1 = parseInt(f.substr(0, f.length));
    if (f.length > d)
        dp1flag = 1;
    s += f.substr(0, 9) + "\n";
    i++;
} while(1);
t1 = performance.now();
console.log((t1-t0)/1e3, 's');
copy(s);
i;

// => final ver
t0 = performance.now();

fn_2 = fn_1 = 1; i = 3; ito = 1e6;
head = []; d = 9 + Math.ceil(Math.log10(ito/2)); dp1flag = 0;
do {
    fn = fn_1 + fn_2;
    f = fn.toString();
    t = [...new Set(f.substr(0, 9).split(''))];
    if (t.length == 9 && !t.includes('0'))
        head.push(i);
    f1 = fn_1.toString();
    fn_2 = parseInt(f1.substr(0, d));
    if (dp1flag) {
        fn_1 = parseInt(f.substr(0, d));
        dp1flag = 0;
    }
    else
        fn_1 = parseInt(f.substr(0, f.length));
    if (f.length > d)
        dp1flag = 1;
    i++;
} while(i < ito);

t1 = performance.now();
console.log((t1-t0)/1e3, 's');
t0 = performance.now();

fn_2 = fn_1 = 1; i = 3;
tail = [];
do {
    fn = fn_1 + fn_2;
    f = fn.toString();
    t = [...new Set(f.substr(f.length - 9, 9).split(''))];
    if (t.length == 9 && !t.includes('0'))
        tail.push(i);
	fn_2 = fn_1 % 1e9;
	fn_1 = fn % 1e9;
    i++;
} while(i < ito);

t1 = performance.now();
console.log((t1-t0)/1e3, 's');
head.intersect(tail);

// test: ito = 1e6 d=15 ok d=14 fail

// or 2 in 1 ver
t0 = performance.now();

fn_2h = fn_1h = 1;
fn_2t = fn_1t = 1;
i = 3;
d = 20; dp1flag = 0; c = 3;
do {
    fnh = fn_1h + fn_2h;
    fh = fnh.toString();
    th = [...new Set(fh.substr(0, 9).split(''))];

	fnt = fn_1t + fn_2t;
    ft = fnt.toString();
    tt = [...new Set(ft.substr(ft.length - 9, 9).split(''))];

    if (th.length == 9 && !th.includes('0') && tt.length == 9 && !tt.includes('0')) {
		console.log('i = ', i);
		c--;
		if (c == 0)
        	break;
    }
	f1h = fn_1h.toString();
    fn_2h = parseInt(f1h.substr(0, d));
    if (dp1flag) {
        fn_1h = parseInt(fh.substr(0, d));
        dp1flag = 0;
    }
    else
        fn_1h = parseInt(fh.substr(0, fh.length));
    if (fh.length > d)
        dp1flag = 1;

	fn_2t = fn_1t % 1e9;
	fn_1t = fnt % 1e9;

    i++;
} while(1);

t1 = performance.now();
console.log((t1-t0)/1e3, 's');
