'use strict'

var timerInterval

function stopTimer() {
    clearInterval(timerInterval);
}

function startTimer() {
    const timer = document.querySelector('span.timer');
    var milliseconds = 0
    var seconds = 0
    var minutes = 0
    var numSecsInMin = 60
    timerInterval = setInterval(() => {
        milliseconds++;
        seconds = milliseconds / 100
        minutes = Math.floor(seconds / numSecsInMin)
        seconds = seconds - minutes * numSecsInMin

        var newNumber = parseInt(milliseconds.toString().replace(".", ""), 10)
        minutes = minutes < 10 ? "0" + minutes : minutes
        timer.innerHTML = minutes + ":" + newNumber
    }, 10)
}