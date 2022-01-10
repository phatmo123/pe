function isValid(board, row, col, k) {
    for (let i = 0; i < 9; i++) {
        const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
        const n = 3 * Math.floor(col / 3) + i % 3;
        if (board[row][i] == k || board[i][col] == k || board[m][n] == k) {
            return false;
        }
    }
    return true;
}

// --------------------------------------------------------------

function solve(data, i) { // stack 1295 => done flag => 293
    // console.log(++stack, 'i = ', i);
    if (i == 81) {
        s += parseInt('' + data[0][0] + data[0][1] + data[0][2]);
        done = 1;
        return;
    }
    
    var r = Math.floor(i/9);
    var c = i%9;
    
    if (data[r][c] != '0')
        solve(data, i + 1);
    else { 
        for (let k = 1; k <= 9; k++) {
            if (isValid(data, r, c, k)) {
                data[r][c] = `${k}`;
                solve(data, i + 1);
                data[r][c] = '0';
                if (done) return;
            }
        }
    }
}

// try minimize stack level
function solve2(data, i) { // stack 929 => done flag => 201
    // console.log(++stack, 'i = ', i);
    if (i == 81) {
        s += parseInt('' + data[0][0] + data[0][1] + data[0][2]);
        done = 1;
        return;
    }
    
    do {
        var r = Math.floor(i/9);
        var c = i%9;
        if (data[r][c] != '0')
            i++;
        else
            break;
        if (i == 81) {
            s += parseInt('' + data[0][0] + data[0][1] + data[0][2]);
            done = 1;
            return;
        }
    } while(1);
    
    for (let k = 1; k <= 9; k++) {
        if (isValid(data, r, c, k)) {
            data[r][c] = `${k}`;
            solve2(data, i + 1);
            data[r][c] = '0';
            if (done) return;
        }
    }
}

// both above, slower than solve3 ?? => count stack call ! => done flag

stack = 0;
t0 = performance.now();
s = 0; for (i = 0; i < 450; ++i) {
    if (i%9 == 0)
        board = [];
    board.push(a[i].split(''));
    if (board.length == 9) {
        done = 0;
        solve(board, 0);
    }
}
t1 = performance.now();
console.log((t1-t0)/1e3, 's');
s;

// --------------------------------------------------------------

function solve3(data, m) { // stack 201
    // console.log(++stack, 'i = ', m);
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (data[i][j] == '0') {
                for (let k = 1; k <= 9; k++) {
                    if (isValid(data, i, j, k)) {
                        data[i][j] = `${k}`;
                        if (solve3(data, i*9+j)) {
                            return true;
                        } else {
                            data[i][j] = '0';
                        }
                    }
                }
                return false;
            }
        }
    }
    return true;
}

stack = 0;
t0 = performance.now();
s = 0; for (i = 0; i < 450; ++i) {
    if (i%9 == 0)
        board = [];
    board.push(a[i].split(''));
    if (board.length == 9) {
        solve3(board);
    	s += parseInt('' + board[0][0] + board[0][1] + board[0][2]);
    }
}
t1 = performance.now();
console.log((t1-t0)/1e3, 's');
s;