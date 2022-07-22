let box = document.getElementsByClassName("box")
let btnClear = document.getElementById("btnClear");
let btnSolve = document.getElementById("btnSolve");
let btnGenerate = document.getElementById("btnGenerate");
let difficulty = document.getElementById("difficulty");
let arr = [[], [], [], [], [], [], [], [], []];


(function () {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            arr[3 * Math.floor(i / 3) + Math.floor(j / 3)].push(box[i].children[j])
        }
    }
})();

function clearSudoku() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            arr[i][j].value = '';
        }
    }
}

function fillArray(n = 16) {
    clearSudoku();
    let count = 16;
    while (count > 0) {
        let i = Math.floor(Math.random() * 9), j = Math.floor(Math.random() * 9)
        if (arr[i][j].value == '') {
            let x = "" + Math.floor(1 + Math.random() * 9);
            if (canPlace(arr, i, j, x)) {
                arr[i][j].value = x;
                count--;
            }
        }
    }

    if (n >= 81) n = 81;
    if (n >= 17) {
        solveSudoku(arr, 0, 0);
        n = 81 - n;
        while (n > 0) {
            let i = Math.floor(Math.random() * 9), j = Math.floor(Math.random() * 9)
            if (arr[i][j].value != '') {
                arr[i][j].value = '';
                n--;
            }
        }
    }
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (arr[i][j].value !== '') {
                arr[i][j].disabled = true;
            }
        }
    }
}

function canPlace(b, i, j, n) {
    for (let k = 0; k < 9; k++) {
        if (b[i][k].value === n || b[k][j].value === n)
            return false;
    }

    let p = 3 * Math.floor(i / 3), q = 3 * Math.floor(j / 3);
    for (let k = p; k < p + 3; k++) {
        for (let l = q; l < q + 3; l++) {
            if (b[k][l].value === n)
                return false;
        }
    }
    return true;
}

function solveSudoku(b = arr, i = 0, j = 0) {
    if (i === 9) return true
    if (j === 9) return solveSudoku(b, i + 1, 0)
    if (b[i][j].value === '') {
        let k = 1;
        while (k < 10) {
            if (canPlace(b, i, j, k + "")) {
                b[i][j].value = k + "";
                if (solveSudoku(b, i, j + 1))
                    break
                else
                    b[i][j].value = ''
            }
            k++;
        }
        if (k == 10) return false;
        return true
    }
    return solveSudoku(b, i, j + 1)
}

btnClear.addEventListener("click", () => {
    return clearSudoku();
})

btnSolve.addEventListener("click", () => {
    return solveSudoku();
});

// $(document).ready(fillArray);

btnGenerate.addEventListener("click", () => {
    return fillArray(Number(difficulty.value));
});