'use strict';

function init(level = N * 2) {
    gDiffLevel = {
        size: level,
        mines: Math.floor(getRandomIntInclusive(3, N * 2)),
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
    renderLives()
    renderStart(false)
    resetScore()
    renderScore(0)
    gGame.isOn = true;
}

function tileClicked(elTile, i, j) {
    const ELTILE = document.querySelector(`.tile-${i}-${j}`)
    if (ELTILE.classList.value.includes('shown')) return
    gFirstClick++
    if (gFirstClick === 1) {
        startTimer();
    }

    (gBoard[i][j].isMine) ? playAudioBoom() : playAudioClick()
    
    if (gBoard[i][j].isMine) {
        elTile.classList.add('shown')
        elTile.classList.add('mine')
        appendElementImg(elTile, MINE_IMG)
        gDiffLevel.lives--
        renderLives()
        renderStart(true)
        isGameOver()
        gBoard[i][j].isMine = false
        gBoard[i][j].isShown = true
        renderScore(parseInt(gBoard[i][j].minesAroundCount - 10))
        return
    } else renderStart(false)

    if (!ELTILE.classList.value.includes('shown')) {
        if (gBoard[i][j].minesAroundCount !== 0) {
            var el = document.createElement('span')
            el.innerText = gBoard[i][j].minesAroundCount
            elTile.classList.add('shown')
            elTile.appendChild(el)
            renderScore(parseInt(gBoard[i][j].minesAroundCount * 10))
        } else {
            var el = document.createElement('span')
            elTile.classList.add('shown')
            elTile.appendChild(el)
        }
        gBoard[i][j].isShown = true
    }
}

function isGameOver() {
    if (gDiffLevel.lives === 0) {
        renderStart(true)
        stopTimer()
        alert('Game Over')
        setTimeout(() => {
            init()
        }, 2000)
    }
}

function playAudioBoom() {
    var audio = new Audio('sounds/explode.mp3')
    audio.play()
}

function playAudioClick() {
    var audio = new Audio('button_click_fast_short.mp3')
    audio.play()
}
