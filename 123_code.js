/*
n even -n*p + 1 + n*p + 1 => r = 2
n odd n*p - 1 + n*p + 1 => r = 2np%p2 = 2np (easy ot proof 2n < p)
*/
seive(2.5 * 1e5);
seive_check();
i = ps.length - (ps.length % 2 == 0 ? 2 : 1); // only (n odd => i even) work
do {
    if (2 * (i + 1) * ps[i] <= 1e10)
        break;
    i -= 2; // only (n odd => i even) work
} while (i > 7037);
i + 2 + 1; // +2 to reverse last i -= 2; +1 to correct index
