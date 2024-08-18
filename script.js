
// Select all the cells in the grid
const cells = document.querySelectorAll('[data-cell]');
// Get the turn indicator and restart button elements
const turnIndicator = document.getElementById('turnIndicator');
const restartButton = document.getElementById('restartButton');
const alertBox = document.getElementById('alertBox');

// Variables to keep track of the game state
let isXTurn = true;
let gameActive = true;
let board = ['', '', '', '', '', '', '', '', ''];

// Function to handle cell clicks
function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    // Check if the cell is already filled or if the game is over
    if (board[cellIndex] !== '' || !gameActive) return;

    // Update the board state
    board[cellIndex] = isXTurn ? 'X' : 'O';
    cell.textContent = board[cellIndex];

    // Check for a winner or a draw
    if (checkWin()) {
        alertBox.textContent = `${isXTurn ? 'X' : 'O'} Wins!`;
        alertBox.classList.remove('alert-info');
        alertBox.classList.add('alert-success');
        alertBox.style.display = 'block';
        gameActive = false;
    } else if (board.every(cell => cell !== '')) {
        alertBox.textContent = 'Draw!';
        alertBox.classList.remove('alert-info');
        alertBox.classList.add('alert-warning');
        alertBox.style.display = 'block';
        gameActive = false;
    } else {
        // Switch turns
        isXTurn = !isXTurn;
        turnIndicator.textContent = `${isXTurn ? 'X' : 'O'}'s Turn`;
    }
}

// Function to check for a win
function checkWin() {
    // All possible win conditions
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    return winConditions.some(condition => {
        return condition.every(index => {
            return board[index] === (isXTurn ? 'X' : 'O');
        });
    });
}

// Function to restart the game
function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    isXTurn = true;
    gameActive = true;
    turnIndicator.textContent = "X's Turn";
    cells.forEach(cell => cell.textContent = '');
    alertBox.style.display = 'none';
}

// Add event listeners to each cell
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
// Add event listener to the restart button
restartButton.addEventListener('click', restartGame);
