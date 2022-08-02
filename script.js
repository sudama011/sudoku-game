let box = document.getElementsByClassName("box")
let btnGenerate = document.getElementById("btnGenerate");
let difficulty = document.getElementById("difficulty");
let arr = [[], [], [], [], [], [], [], [], []];

// storing the 81 input boxes in the 2-D array.
(function () {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            arr[3 * Math.floor(i / 3) + Math.floor(j / 3)].push(box[i].children[j])
        }
    }
})();

function fillArray(n = 16) {
    // clear the Board.
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            arr[i][j].value = '';
        }
    }

    // fill 5 random places with random values.
    let count = 1;
    while (count <= 5) {
        let tobeFilled = 1 + Math.floor(Math.random() * (81 - count));
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (arr[i][j].value == '') {
                    tobeFilled--;

                    if (tobeFilled == 0) {
                        let x = 1;
                        while (x <= 9) {
                            if (canPlace(arr, i, j, x + '')) {
                                arr[i][j].value = x + '';
                                count++;
                                break;
                            }
                            x++;
                        }
                        break;
                    }
                }
            }
            if (tobeFilled == 0)
                break;
        }
    }

    // solve the puzzle and erase some elements so that filled elements equal to n.
    solveSudoku();

    n = 81 - n;
    let erased = 0;
    while (erased < n) {
        let tobeDelete = 1 + Math.floor(Math.random() * (81 - erased));
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (arr[i][j].value !== '') {
                    tobeDelete--;
                    if (tobeDelete === 0) {
                        arr[i][j].value = '';
                        erased++;
                        break;
                    }
                }
            }
            if (tobeDelete === 0) {
                break;
            }
        }
    }

    // disable the filled input fields.
    setTimeout(function () {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (arr[i][j].value == '') {
                    arr[i][j].disabled = false;
                    arr[i][j].style.color = '#3333ff';
                }
                else {
                    arr[i][j].disabled = true;
                    arr[i][j].style.color = '#1a1a1a';
                }
            }
        }
    }, 10);
}

// generate the puzzle on refreshing or opening the website.
$(document).ready(fillArray(81 - Number(difficulty.value)));

function canPlace(b, i, j, n) {
    for (let k = 0; k < 9; k++) {
        if ((b[i][k].value === n && k != j) || (b[k][j].value === n && k != i))
            return false;
    }

    let p = 3 * Math.floor(i / 3), q = 3 * Math.floor(j / 3);
    for (let k = p; k < p + 3; k++) {
        for (let l = q; l < q + 3; l++) {
            if (b[k][l].value === n && k != i && l != j)
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


btnGenerate.addEventListener("click", () => {
    return fillArray(81 - Number(difficulty.value));
});

function clearArray() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (arr[i][j].disabled == false) {
                arr[i][j].style.color = '#3333ff';
                arr[i][j].value = '';
            }
        }
    }
}

function isSolved() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (arr[i][j].value == '' || arr[i][j].style.color == 'red') {
                return false;
            }
        }
    }
    alert("Congratulations!\nYou Solved It!\n\nIncrease The Difficulty Level And Try Again.");
    return true;
}

function check(currentInput) {

    if (currentInput.value == "") {
        currentInput.style.color = "#3333ff";
        return;
    }
    let flag = false;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (arr[i][j] == currentInput) {
                if (canPlace(arr, i, j, currentInput.value) === false) {
                    currentInput.style.color = "red";
                    flag = true;
                    break;
                }
            }
        }
        if (flag) break;
    }
    setTimeout(isSolved, 10);
}