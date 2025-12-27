const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');

let currentPlayer = "X";
let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

cells.forEach(cell => cell.addEventListener('click', handleClick));

function handleClick(e) {
    const index = e.target.dataset.index;

    if (board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    checkResult();
}

function checkResult() {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;

        if (board[a] &&
            board[a] === board[b] &&
            board[a] === board[c]) {

            gameActive = false;
            statusText.textContent = `🎉 Player ${currentPlayer} Wins!`;

            [a, b, c].forEach(i => cells[i].classList.add('win'));
            return;
        }
    }

    if (!board.includes("")) {
        statusText.textContent = "😄 It's a Draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `👉 Player ${currentPlayer}'s Turn`;
}

function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    statusText.textContent = "";

    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove('win');
    });
}
