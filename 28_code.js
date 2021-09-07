function cal(s) {
    var c = s + 1, l = c, b8 = s; for (var i = 0; i < 499; ++i) {
        b8 += 8; l += b8; c += l;
    }
    return c;
}
cal(2)+cal(4)+cal(6)+cal(8)+1

/*
Go to thread and search "generating function"
the sum of 16i(i+1), which with a little generating function knowledge (here comes the sledgehammer!!) can be seen to be equal to 16 time the second derivative of (1-t502)/(1-t) evaluated at 1.

sum i=1-500 i(i+1)
= sum i=-1-500 i(i+1)

f = sum i=-1-500 x^(i+1)
=> f'' = sum i=-1-500 i(i+1)x^(i-1)
