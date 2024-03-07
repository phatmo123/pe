a = [];
for (n = 1; n <= 10; ++n)
    a.push(1 - n + n**2 - n**3 + n**4 - n**5 + n**6 - n**7 + n**8 - n**9 + n**10);
// [1, 683, 44287, 838861, 8138021, 51828151, 247165843, 954437177, 3138105961, 9090909091]

// b0 + b1*n + b2*n2 ...
s = a[0];
x = [a[0]];
for (i = 2; i <= 10; ++i) {
	x.push(a[i-1]);
	A = [];
	k = 1;
	do {
		t = [];
    	for (j = 0; j < i; ++j)
        	t.push(k**j);
		A.push(t);
		k++;
    } while(k <= i);
    console.log('A = ', A); // why console.log(A) weird? "value below was evaluated just now"
	console.log('x = ', x);
    b = gauss(A, x);
    t = 0;
    for (j = 0; j < i; ++j)
        t += b[j]*(i+1)**j;
	console.log('b = ', b);
	console.log('t = ', t);
    s += t;
} s;
// s in float form => maybe divide to some number not 2, 5
