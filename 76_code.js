need = rest = 100; co = 0;
function search(i, last) {
    if (rest == 0) {
        co++;
        return;
    }
    max = last > rest ? rest : last;
    for (var j = max; j >= 1; --j) {
        rest -= j;
        search(i+1, j);
        rest += j;
    }
} search(0, need-1); co;

// => new formular: problem 78