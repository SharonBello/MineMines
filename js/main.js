'use strict'

const N = 10;

const WINNER_IMG = '&#127942';

const LIFE_IMG = '&#10084';
const MINE_IMG = '&#128163';
const HIDDEN_IMG = '🟦';
const FLAG_IMG = '&#9873';

const HIDDEN = 'hidden';
const MINE = 'mine';
const MARKED = 'marked';
const NUMBER = 'number';

var gBoard;
var gScore = 0;
var gWinScore = 0;
var gLives = 3;
var gLivesLost = 0;
var gClickedTile;
var gOpenTilesCount = 0;
var gMines = [];
var gFirstClick = 0;

var gGame = {
    score: 0,
    isOn: false,
    markedCount: 0,
    secsPassed: 0
}

var gDiffLevel;

function init() {
    gDiffLevel = {
        size: N,
        mines: Math.floor(getRandomIntInclusive(2, N / 2)),
        lives: 3
    }
    gBoard = buildBoard()
    printMat(gBoard, '.board')
    var mines = getMinesRandPos(gBoard, gDiffLevel.mines)
    if (mines.length < gDiffLevel.lives) {
        gDiffLevel.lives = mines.length 
    }
    addMines(gBoard)
    addNeighborsCount(gBoard)
    renderBoard(gBoard)
    gGame.isOn = true;
}

function addNeighborsCount(gBoard) {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            const adjacentTiles = nearbyTiles(gBoard, {i, j})
            const mines = adjacentTiles.filter(t => t.isMine)
            gBoard[i][j].minesAroundCount = mines.length
        }
    }
}

function buildBoard() {
    var SIZE = N;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board[i] = [];
        for (var j = 0; j < SIZE; j++) {
            var tile = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false,
            }
            board[i].push(tile)
        }
        board.push(board[i])
    }
    return board;
}

function renderBoard(gBoard) {
    var strHTML = '';
    for (var i = 0; i < gBoard.length; i++) {
        strHTML += `<tr>\n`
        for (var j = 0; j < gBoard[0].length; j++) {
            var tileClass = getClassName({
                i: i,
                j: j
            })

            strHTML += `\t<td class="tile ${tileClass}" 
            onclick="tileClicked(this, ${i}, ${j})">
            </td>\n`
        }
        strHTML += `</tr>\n`
    }
    var elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML;
}


function tileClicked(elTile, i, j) {
    gBoard[i][j].isShown = true;

    if (gBoard[i][j].isMine) {
        elTile.classList.add('mine')
        appendElementImg(elTile, MINE_IMG)
        gDiffLevel.lives--;
        isGameOver()
        return
    }

    if (!gBoard[i][j].isMarked) {
        if (gBoard[i][j].minesAroundCount !== 0) {
            var el = document.createElement('span')
            el.innerText = gBoard[i][j].minesAroundCount
            elTile.appendChild(el)
        } else {
            elTile.classList.add('marked')
        }
    }
}

function getMinesRandPos(board, minesCount) {
    var randPos;
    for (var i = 0; i < minesCount; i++) {
        for (var j = 0; j < minesCount; j++) {
            var randomI = getRandomInt(0, board[0].length)
            var randomJ = getRandomInt(0, board[0].length)
            randPos = ({
                i: randomI,
                j: randomJ
            })
        }
        gMines.push(randPos)
    }
    return gMines;
}

function addMines() {
    var tiles = getMinesRandPos()
    for (var i = 0; i < tiles.length; i++) {
        var tile = tiles[i];
        gBoard[tile.i][tile.j].isMine = true;
    }
    console.log('tiles', tiles)
}

function nearbyTiles(board, coords) {
    var x = coords.i;
    var y = coords.j;
    const tiles = []

    for (let xOffset = -1; xOffset <= 1; xOffset++) {
        for (let yOffset = -1; yOffset <= 1; yOffset++) {
        const tile = board[x + xOffset]?.[y + yOffset]
        if (tile) tiles.push(tile)
        }
    }

    return tiles
}

function isGameOver() {
    if (gDiffLevel.lives === 0) {
        alert('Game Over')
        setTimeout(() => {
            init()
        }, 1000)
    }
}

function livesStatus(num) {
    for (var i = 0; i < gBoard.length; i++) {
        var currTile = gBoard[i];
        for (var j = 0; j < currTile.length; j++) {
            // currTile = gBoard[i][j];
            currTile = tileClicked(gClickedTile, gBoard[i][j])
        }
    }
    if (currTile.isMine === true) {
        var elLives = document.querySelector('.lives')
        appendElementImg(elLives, LIFE_IMG)
        if (num !== 0) elLives.innerHTML = LIFE_IMG * num;
        else elLives.innerHTML = LOSE_IMG;
        console.log('elLives', elLives)
    }
}