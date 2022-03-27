'use strict'

const N = 4;
const MINE_IMG = '&#128163';
const MARKED = 'marked';
const NUMBER = 'number';

var gBoard;
var gClickedTile;
var gFirstClick = 0
var gMines = [];
var gDiffLevel;

var gGame = {
    isOn: false,
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

function addMines() {
    var tiles = getMinesRandPos()
    for (var i = 0; i < tiles.length; i++) {
        var tile = tiles[i];
        gBoard[tile.i][tile.j].isMine = true;
    }
    console.log('tiles', tiles)
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

function addNeighborsCount(gBoard) {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var neighborTiles = getNeighborTiles(gBoard, {
                i,
                j
            })
            var mines = neighborTiles.filter(tile => tile.isMine)
            gBoard[i][j].minesAroundCount = mines.length
        }
    }
}

function getNeighborTiles(board, pos) {
    var x = pos.i;
    var y = pos.j;
    var tiles = []

    for (var xOffset = -1; xOffset <= 1; xOffset++) {
        for (var yOffset = -1; yOffset <= 1; yOffset++) {
            var tile = board[x + xOffset]?.[y + yOffset]
            if (tile) tiles.push(tile)
        }
    }

    return tiles
}