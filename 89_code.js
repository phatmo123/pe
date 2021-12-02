/*
https://projecteuler.chat/viewtopic.php?t=765
*/

a = [];
b = {'M': 1000, 'D': 500, 'C': 100, 'L': 50, 'X': 10, 'V': 5, 'I': 1};

a.map(a => a.length).reduce((a,b) => a+b)
-
a.map(u => u.replace(/IV/g, 'IIII').replace(/IX/g, 'VIIII')
    .replace(/XL/g, 'XXXX').replace(/XC/g, 'LXXXX')
    .replace(/CD/g, 'CCCC').replace(/CM/g, 'DCCCC')
)   
.map(u => u.split('').map(u => b[u]).reduce((a,b) => a+b))
.map(u => {
    u = (u).toString().split('').map(u => parseInt(u));
    s = 0;
    for (i = 0; i < u.length; ++i) {
        if (u[i] <= 3)
            p = u[i];
        else if (u[i] == 4)
            if (u.length == 4 && i == 0)
                p = 4;
            else
                p = 2;
        else if (5 <= u[i] && u[i] <= 8)
            p = u[i] - 4;
        else
            p = 2;
        s += p;
    }
    return s;
})
.reduce((a,b) => a+b)
