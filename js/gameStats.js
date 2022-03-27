'use strict'

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

function reset() {

}


function gameScore() {

}

var timerInterval;

function stopTimer() {
    clearInterval(timerInterval);
}

function startTimer() {
    const timer = document.getElementById(".timer");
    var milliseconds = 0;
    var seconds = 0;
    var minutes = 0;
    var numSecsInMin = 60;
    timerInterval = setInterval(() => {
        milliseconds++;
        seconds = milliseconds / 100;
        minutes = Math.floor(seconds / numSecsInMin);
        seconds = seconds - minutes * numSecsInMin;

        var newNumber = parseInt(milliseconds.toString().replace(".", ""), 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        timer.innerHTML = minutes + ":" + newNumber;
    }, 10);
}