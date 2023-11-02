const board = document.getElementById('board');
const restartButton = document.getElementById('restart');
const playerIndicator = document.getElementById('player-indicator');
const ROWS = 6;
const COLUMNS = 7;
const EMPTY = 0;
const PLAYER1 = 1;
const PLAYER2 = 2;

let currentPlayer = PLAYER1;
let gameBoard = [];
let gameEnded = false;

// Initialize the game board
function initializeBoard() {
    for (let row = 0; row < ROWS; row++) {
        gameBoard[row] = [];
        for (let col = 0; col < COLUMNS; col++) {
            gameBoard[row][col] = EMPTY;
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.setAttribute('data-row', row);
            cell.setAttribute('data-col', col);
            cell.addEventListener('click', () => handleMove(col));
            board.appendChild(cell);
        }
    }
}

// Handle a player's move
function handleMove(col) {
    if (gameEnded) return;

    for (let row = ROWS - 1; row >= 0; row--) {
        if (gameBoard[row][col] === EMPTY) {
            gameBoard[row][col] = currentPlayer;
            const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
            cell.style.backgroundColor = currentPlayer === PLAYER1 ? 'red' : 'yellow';

            if (checkForWin(row, col)) {
                gameEnded = true;
                alert(`Player ${currentPlayer === PLAYER1 ? '1' : '2'} wins!`);
                restartButton.style.display = 'block';
            } else {
                currentPlayer = currentPlayer === PLAYER1 ? PLAYER2 : PLAYER1;
                updatePlayerIndicator();
            }
            break;
        }
    }
}

// Check for a win
function checkForWin(row, col) {
    function checkDirection(dx, dy) {
        let count = 0;
        for (let i = -3; i <= 3; i++) {
            const newRow = row + i * dy;
            const newCol = col + i * dx;
            if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLUMNS) {
                if (gameBoard[newRow][newCol] === currentPlayer) {
                    count++;
                    if (count === 4) return true;
                } else {
                    count = 0;
                }
            }
        }
        return false;
    }

    const directions = [
        [0, 1], [1, 0], [1, 1], [1, -1] // horizontal, vertical, diagonal, anti-diagonal
    ];

    for (const [dx, dy] of directions) {
        if (checkDirection(dx, dy)) {
            return true;
        }
    }

    return false;
}

// Restart the game
function restartGame() {
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLUMNS; col++) {
            gameBoard[row][col] = EMPTY;
            const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
            cell.style.backgroundColor = 'white';
        }
    }
    gameEnded = false;
    restartButton.style.display = 'none';
    currentPlayer = PLAYER1;
    updatePlayerIndicator();
}

// Update the player indicator
function updatePlayerIndicator() {
    playerIndicator.querySelector('.player-text').textContent = `Player ${currentPlayer}`;
}

initializeBoard();
updatePlayerIndicator();
