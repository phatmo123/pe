fac2 = [];
for (i = 0; i < 10; ++i)
    fac2[i] = fac(i);
co = 0;
for (i = 1; i < 1e6; ++i) {
    c = 1;
    j = i;
    a = [i];
    do {
        j = (j).toString().split('').map(u => fac2[u]).reduce((a,b) => a+b);
        if (a.includes(j)) {
            if (c == 60) co++;
            break;
        }
        a.push(j);
        c++;
	} while(1);
} co;