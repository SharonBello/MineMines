'use strict'

const N = 10;

const RESTART = '&#128515';
const WINNER = '&#127942';
const LOSER = '&#9760';

const LIFE = '&#10084';
const FLOOR = '';

const MINE = '&#128163';
// const MINE = '&#128165';
const EMPTY = '';
const FLAG = '&#9873';
const NUMBER = 1;
// const HINT = '&#128161';
// const SAFE = '&#129686';
// const MANUAL = '&#128075';
// const SEVEN_BOOM = '&#10128;';
// const UNDO = '&#129318';
// const BEST_SCORE = '&#128285';


var gGame = {
    score: 0,
    isOn: false,
    markedCount: 0,
    secsPassed: 0
}

var gDiffLevel = {
    size: N,
    mines: getRandomIntInclusive(2, N / 2),
    lives: 3
}

var gBoard = [];
var gTimeCount = 0;
var gIntervalTime = 0;
var gScore = 0;
var cellCount = 0;
var gLives = 3;

// This is called when page loads
function init() {
    // TODO: Check Level size - if won before
    gBoard = buildBoard()
    printMat(gBoard, '.board-container')
    setMinesAtRandom(gBoard, gDiffLevel.mines);
    // renderTemp
    gGame.isOn = true;
    gLives = 3;
    // console.log('gLives', gLives);
    console.table('gBoard', gBoard);
    // TODO: Do I need to reset the restart emoji?
}

// Builds the board 
// Return the created board

function buildBoard() {
    var SIZE = N;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        var row = [];
        for (var j = 0; j < SIZE; j++) {
            // Start with cell so we can use it to change status afterwards
            var cell = {
                minesAroundCount: 4,
                isShown: true,
                isMine: false,
                isMarked: true,
                type: FLOOR,
                gameElement: NUMBER
            }
            row.push(cell);
        }
        board.push(row);
    }
    console.table('board', board);
    return board;
}


// render the board in table

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j]
            strHTML += '<tr>\n';
            var currCell = board[i][j];
            var cellClass = getClassName({
                i: i,
                j: j
            })
            cellClass += (currCell.type === FLOOR) ? ' floor' : 'wall'
            strHTML += '<td class="cell ' + cellClass + '"  onclick="openCell(' + i + ',' + j + ')">'
            switch (currCell.gameElement) {
                case EMPTY:
                    strHTML += EMPTY;
                    break;
                case MINE:
                    strHTML += MINE;
                    break;
                case NUMBER:
                    strHTML += NUMBER;
                    break;
                case FLAG:
                    strHTML += FLAG;
                    break;
            }
            strHTML += '</tr>';
        }
        var elBoard = document.querySelector('.board');
        elBoard.innerHTML = strHTML;
    }
}




// Set mines at random locations 
function setMinesAtRandom(board, minesCount) {
    var minesPositions = getMinesAtRandom(board, minesCount);
    for (var i = 0; i < minesPositions.length; i++) {
        board[minesPositions[i].i][minesPositions[i].j].isMine = true;
    }
}

// Return array of random board positions each an object of i, j,
// Receives the number of  X amount of mines that is calculated randomly min 2, max N/5
function getMinesAtRandom(board, minesCount) {
    var randPositions = [];
    for (var i = 0; i < minesCount; i++) {
        var randomI = getRandomInt(0, board[0].length);
        var randomJ = getRandomInt(0, board[0].length);
        randPositions.push({
            i: randomI,
            j: randomJ
        });
    }
    console.log('randPos', randPositions);
    return randPositions;
}

// Reflect change of score in DOM
function updateScore(diff) {
    gGame.score += diff;
    document.querySelector('.score span').innerText = gGame.score;
}

// Count mines around each cell 
// Call setMinesNegsCount() 

// set the cell's minesAroundCount.
// function setMinesNegsCount(board) {

// }

// renderBoard(board)
// Render the board as a <table> to the page

// cellClicked(elCell, i, j)
// Called when a cell (td) is clicked

// cellMarked(elCell)
// Called on right click to mark a cell (suspected to be a mine) 
// Search the web (and implement) how to hide the context menu on right click

// checkGameOver()
// Game ends when all mines are marked, and all the other cells are shown

// expandShown(board, elCell, i, j)
// When user clicks a cell with no mines around, we need to open not only that cell, but also its neighbors. 
// NOTE: start with a basic implementation that only opens the non-mine 1st degree neighbors 
// BONUS: if you have the time later, try to work more like the real algorithm (see description at the Bonuses section below)

// The model
// gBoard – A Matrix containing cell objects: 
// Each cell: { 
//     minesAroundCount: 4, 
//     isShown: true, 
//     isMine: false, 
//     isMarked: true 
// }

// This is an object by which the board size is set (in this case: 4x4 board and how many mines to put)
// gLevel = { 
//     SIZE: 4, 
//     MINES: 2 
// };


// This is an object in which you can keep and update the current game state: isOn: Boolean, when true we let the user play shownCount: How many cells are shown markedCount: How many cells are marked (with a flag)
// secsPassed: How many seconds passed
// gGame = { 
//     isOn: false, 
//     shownCount: 0, 
//     markedCount: 0, 
//     secsPassed: 0 
// }

// Step1 – the seed app:
// 1. Create a 4x4 gBoard Matrix containing Objects. Place 2 mines manually when each cell’s isShown set to true.
// 2. Present the mines using renderBoard() function.
// Step2 – counting neighbors:
// 1. Create setMinesNegsCount() and store the numbers (isShown is still true)
// 2. Present the board with the neighbor count and the mines using renderBoard() function.
// 3. Have a console.log presenting the board content – to help you with debugging
// Step3 – click to reveal:
// 1. Make sure your renderBoard() function adds the cell ID to each cell and onclick on each cell calls cellClicked() function.
// 2. Make the default “isShown” to be “false”
// 3. Implement that clicking a cell with “number” reveals the number of this cell
// Step4 – randomize mines' location:
// 1. Randomly locate the 2 mines on the board
// 2. Present the mines using renderBoard() function.
// Next Steps: Head back to Functionality and Features and then on to Further Tasks, and if time permits check out the Bonus Tasks section.

// // UI Guidelines
// This sprint is not a UI-centered project. However, we recommend to try implementing the following UI concepts:
// 1. Board is square and cells are squares
// 2. Cells keep their size when hovered and when revealed
// 3. Board keeps its position (shouldn't move) along all game phases (do not add UI elements dynamically above it)
// 4. Mines look like mines.
// 5. Add a footer at the bottom of the page with your full name.


// Further Tasks
// First click is never a Mine
// Make sure the first clicked cell is never a mine (like in the real game)
// HINT: place the mines and count the neighbors only on first click.
// Lives
// Add support for “LIVES” -
// The user has 3 LIVES:

// When a MINE is clicked, there is an indication to the user that he clicked a mine. The LIVES counter decrease. The user can continue playing.


// Add smiley (feel free to switch icons \ images):
// ● Normal 😃
// ● Sad & Dead – LOSE 🤯 (stepped on a mine)
// ● Sunglasses – WIN 😎
// ● Clicking the smiley should reset the game

// Add support for HINTS
// The user has 3 hints

// When a hint is clicked, it changes its look, example:
// Now, when a cell (unrevealed) is clicked, the cell and its neighbors are revealed for a second, and the clicked hint disappears.
// Best Score
// Keep the best score in local storage (per level) and show it on the page
// Full Expand
// When an empty cell is clicked, open all empty cells that are connected and their numbered neighbors (as is done at the game) this feature is normally implemented using recursion.

// Safe click
// Add a Safe-Click Button:
// The user has 3 Safe-Clicks
// Clicking the Safe-Click button will mark a random covered cell (for a few seconds) that is safe to click (does not contain a MINE).
// Present the remaining Safe-Clicks count


// Manually positioned mines
// Create a “manually create” mode in which user first positions the mines (by clicking cells) and then plays.
// Undo
// Add an “UNDO” button, each click on that button takes the game back by one step (can go all the way back to game start).


// 7 BOOM!
// Add an “7 BOOM!” button, clicking the button restarts the game and locate the MINES according to the “7 BOOM” principles (each cell-index that contains “7” or a multiplication of “7”). Note that the cell-index shall be a continuous number (i.e. in a 8*8 Matrix is shall be between 0 to 63).

// function updateScore(diff) {
//     gGame.score += diff;
//     document.querySelector('h2 span').innerText = gGame.score;

// }

// function checkVictory() {
//     if (gCountFood === gCountEat) gameOver('Victory');
// }

// function gameOver(msg) {
//     gGame.isOn = false;
//     clearInterval(gIntervalGhosts);
//     clearInterval(gIntervalCherry);
//     gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
//     renderCell(gPacman.location, EMPTY);
//     openModal(msg)
// }

// function openModal(msg) {
//     var elModal = document.querySelector('.modal')
//     elModal.style.display = 'block'
//     var elModalH2 = elModal.querySelector('h2')
//     var modalText = `${msg} \n Youre score is: ${gGame.score}`
//     elModalH2.innerText = modalText
// }

// function closeModal() {
//     var elModal = document.querySelector('.modal')
//     elModal.style.display = 'none'
// }

// function addCherry() {
//     var emptyLocations = getEmptyLocations();
//     if (!emptyLocations.length) return
//     var emptyLocation = getRandomEmptyLocation(emptyLocations)
//     gBoard[emptyLocation.i][emptyLocation.j] = CHERRY;
//     renderCell(emptyLocation, CHERRY)
// }

// function getRandomEmptyLocation(emptyLocations) {
//     var randomIndex = getRandomInt(0, emptyLocations.length)
//     var emptyLocation = emptyLocations[randomIndex];
//     return emptyLocation
// }

// function getEmptyLocations() {
//     var emptyLocations = []
//     for (var i = 1; i < gBoard.length; i++) {
//         for (var j = 1; j < gBoard[i].length; j++) {
//             if (gBoard[i][j] === EMPTY) {
//                 emptyLocations.push({ i: i, j: j });
//             }
//         }
//     }
//     return emptyLocations;
// }

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function getClassName(location) {
    var cellClass = 'cell-' + location.i + '-' + location.j;
    return cellClass;
}