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
    gBoard = buildBoard();
    printMat(gBoard, '.board');
    getMinesRandPos(gBoard, gDiffLevel.mines);
    addMines(gBoard);
    addNeighborsCount(gBoard);
    renderBoard(gBoard);
    gGame.isOn = true;
}

function addNeighborsCount(gBoard) {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            gBoard[i][j].minesAroundCount = findNeighborsCount(gBoard, i, j);
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
            board[i].push(tile);
        }
        board.push(board[i]);
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
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}


function tileClicked(elTile, i, j) {
    var tile = gBoard[i][j]
    gBoard[i][j].isShown = true;
    gBoard[i][j].minesAroundCount = findNeighborsCount(gBoard[i][j]);

    if (gBoard[i][j].isMine) {
        elTile.classList.add('mine')
        appendElementImg(elTile, MINE_IMG);
        gDiffLevel.lives--;
        gameOver()
    }

    if (!gBoard[i][j].isMarked) elTile.classList.add('marked');
}

function getMinesRandPos(board, minesCount) {
    var randPos;
    for (var i = 0; i < minesCount; i++) {
        for (var j = 0; j < minesCount; j++) {
            var randomI = getRandomInt(0, board[0].length);
            var randomJ = getRandomInt(0, board[0].length);
            randPos = ({
                i: randomI,
                j: randomJ
            });
        }
        gMines.push(randPos);
    }
    return gMines;
}

function addMines() {
    var tiles = getMinesRandPos();
    for (var i = 0; i < tiles.length; i++) {
        var tile = tiles[i];
        gBoard[tile.i][tile.j].isMine = true;
    }
    console.log('tiles', tiles);
}

function findNeighborsCount(board, rowIdx, colIdx) {
    var count = 0;
    var mineTiles = getMinesRandPos();
    // console.log('mineTile', mineTiles);
    for (var i = 0; i < mineTiles.length; i++) {
        var rowIdx = (mineTiles[i]);
        // console.log('rowIdx', rowIdx);
        var indexes = Object.entries(rowIdx);
        // console.log('indexes', indexes);
        rowIdx = indexes[0][1];
        // console.log('rowIdx', rowIdx);
        var colIdx = indexes[1][1];
        // console.log('colIdx', colIdx);
    }
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > board.length - 1) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j > board.length - 1) continue;
            if (i === rowIdx && j === colIdx) continue;
            var currTile = gBoard[rowIdx][colIdx];
            if (currTile.isMine) count++;
        }
    }
    // console.log('count', count);
    return count;
}

function gameOver() {
    if (gDiffLevel.lives === 0) {
        alert('Game Over');
        init()
    }
}

function livesStatus(num) {
    for (var i = 0; i < gBoard.length; i++) {
        var currTile = gBoard[i];
        for (var j = 0; j < currTile.length; j++) {
            // currTile = gBoard[i][j];
            currTile = tileClicked(gClickedTile, gBoard[i][j]);
        }
    }
    if (currTile.isMine === true) {
        var elLives = document.querySelector('.lives');
        appendElementImg(elLives, LIFE_IMG);
        if (num !== 0) elLives.innerHTML = LIFE_IMG * num;
        else elLives.innerHTML = LOSE_IMG;
        console.log('elLives', elLives);
    }
}