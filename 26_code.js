max = maxb = 0;
for (b = 2; b < 1e1; ++b) {
	re = parseInt('1' + '0'.repeat((b).toString().length));
	res = [];
	do {
		re = re%b;
		if (ind = res.indexOf(re) > -1) {
			c = res.length - ind + 1;
			break;
		}
		res.push(re);
		re *= 10;
	} while(1);
	if (max < c) {
		max = c;
		maxb = b;
	}
}
console.log(max, maxb);
