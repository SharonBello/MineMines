'use strict';

function init() {
    gDiffLevel = {
        size: N,
        mines: Math.floor(getRandomIntInclusive(3, N * 2)),
        lives: 3
    }

    gBoard = buildBoard()
    printMat(gBoard, '.board')
    changeLevel(gDiffLevel.size)
    var mines = getMinesRandPos(gBoard, gDiffLevel.mines)
    if (mines.length < gDiffLevel.lives) {
        gDiffLevel.lives = mines.length
    }
    addMines(gBoard)
    addNeighborsCount(gBoard)
    renderBoard(gBoard)
    gGame.isOn = true;
}

function tileClicked(elTile, i, j) {

    if (gBoard[i][j].isShown) return
    if (gFirstClick === 1) {
        startTimer();
    }

    gBoard[i][j].isShown = true;
    playAudioClick();

    if (gBoard[i][j].isMine) {
        elTile.classList.add('marked')
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
            elTile.classList.add('marked')
            elTile.appendChild(el)
        } else {
            elTile.classList.add('marked')
        }
    }
}

function isGameOver() {
    if (gDiffLevel.lives === 0) {
        alert('Game Over')
        setTimeout(() => {
            init()
        }, 1000)
    }
}

function playAudioClick() {
    var audio = new Audio('sound/button_click_fast_short.mp3')
    audio.play();
}