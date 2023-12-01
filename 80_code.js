// use BigInt

s = 0; k = 2; m = 4; for (i = 2; i < 100; ++i) {
    if (i == m) {
        k++;
        m = k*k;
        continue;
    }
    s += bigDoDivide(bigCalContFrac(genContFracArrForSqrt(i), 174), 99).reduce(sumDigitLambda);
} s;

