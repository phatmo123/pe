/*
use http://mathafou.free.fr/pba_en/sol044.html
copy to 129_Repunits.html

or
"For an arbitrary integer n the length {\displaystyle \lambda (n)}\lambda (n) of the repetend of 1/n divides {\displaystyle \phi (n)}\phi (n), where {\displaystyle \phi }\phi  is the totient function"
in https://en.wikipedia.org/wiki/Repeating_decimal
*/
(function() {
    b = 1e6 + 1;
    do {
        a = divisor(phi(b));
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
                if (b % 3 == 0) {
                    if (k % 3 != 0)
                        k *= 3;
                    if (b % 9 == 0)
                        k *= 3;
                    /*
                        what if b % 27 == 0 ?
                        3^* of k need >= 3^* of b !!
                        fix this in 130_code
                    */
                }
                // console.log(b, 'p = 1 at ', k);
                if (k > 1e6) {
                    console.log(b);
                    return;
                }
                break;
            }
            i++;
        } while(i < le);
        
        b += 2;
        if (b % 5 == 0)
            b += 2;
    } while(1);
})();
