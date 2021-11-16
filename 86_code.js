t0 = performance.now();
c = 0; i = 1;
do {
    for (j = 1; j <= i; ++j) {
       for (k = 1; k <= j; ++k) {
           r = Math.min(i**2 + (j+k)**2, j**2 + (i+k)**2, k**2 + (i+j)**2);
           if (Math.sqrt(r)%1 == 0)
               c++;
       }
   }
   i++;
} while(c <= 1e6);
t1 = performance.now();
console.log((t1-t0)/1e3);
i-1;