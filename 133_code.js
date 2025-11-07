su = 7; // 2 and 5
b = 3;
t0 = performance.now();
do {
    if (prime(b)) {
        a = divisor(b-1);
        ez = 0;
        p = 1;
        i = 0;
        le = a.length; 
        do {
            while(ez < a[i]) {
                p *= 10;
                p %= b;
                ez++;
            }
            if (p == 1) {
                k = a[i];
                // "The problem is harder when b is not coprime with 9, that is when b is a multiple of 3. " so ...
                b1 = b;
                k1 = k;
                while (b1 % 3 == 0) {
                    if (k1 % 3 != 0)
                        break;
                    else
                        k1 /= 3;
                    b1 /= 3;
                }
                while (b1 % 3 == 0) {
                    k *= 3;
                    b1 /= 3;
                }
                // console.log(b, 'p = 1 at ', k);
                if (10 % dfa(k).product() != 0) {
                    // so 10^n % a[i] != 0
                    // console.log(b);
                    su += b;
                }
                break;
            }
            i++;
        } while(i < le);
    }
    b += 2;
    if (b % 5 == 0)
        b += 2;
} while(b < 1e5);
t1 = performance.now();
console.log((t1-t0)/1e3, 's');
su;
