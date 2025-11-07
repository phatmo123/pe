/*
n = ***p1
n ≡ 0 mod p2
n ≡ p1 mod 10^k (k = digits num of p1)

use chinese remainder theorem here!

if p1 = 19, p2 = 23:
10^2 * y1 ≡ 1 mod 23
23 * y2 ≡ 1 mod 10^2

y2 = 87 & n ≡ (19 mod 10^2) * 23 * 87 mod (23 * 10^2) ≡ 1219
*/

seive(1e6+20);
seive_check();
len = ps.length - 1;
exp = 10n;
explen = 1;
su = 0n;
ps[2] = BigInt(ps[2]);
for (i = 2; i < len; ++i) {
    ps[i+1] = BigInt(ps[i+1]);
    if (ps[i] >= exp) {
        exp *= 10n;
        explen++;
    }
    inv = bigInverseMod(ps[i+1], exp);
    // if (inv == null) {
        // console.log(i+1, ps[i+1], exp, 'no inverse');
        // break;
    // }
    t = (ps[i] * ps[i+1] * inv) % (ps[i+1] * exp); // too big, must use BigInt
    // if (t % exp != ps[i] || t % ps[i+1] != 0n) {
        // console.log(i, ps[i], ps[i+1], t, 'wrong');
        // break;
    // }
    su += t;
}
su;
