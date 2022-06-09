/*
n even -n*a + 1 + n*a + 1 => r = 2
n odd n*a - 1 + n*a + 1 => r = 2na%a2 => r max when n max but 2n < a
r = Math.max(2, Math.floor((a-1)/2)*2*a)
*/
c = 0;
for (a = 3; a <= 1000; ++a)
    c += Math.max(2, Math.floor((a-1)/2)*2*a);
c;
