'use strict'


const EASIER = document.querySelector(".levels span");
EASIER.classList.add('ensign')
EASIER.innerText = 'ensign'
const EASY = document.querySelector(".levels span");
EASIER.classList.add('lieutenant')
EASY.innerText = 'lieutenant'
const MEDIUM = document.querySelector(".levels span");
EASIER.classList.add('commander')
MEDIUM.innerText = 'commander'
const HARD = document.querySelector(".levels span");
EASIER.classList.add('captain')
HARD.innerText = 'captain'
const CRAZY = document.querySelector(".levels span");
EASIER.classList.add('admiral')
CRAZY.innerText = 'admiral'

function changeLevel(size) {
    if (gGame === false) {
        EASIER = 4;
        EASY = 6;
        MEDIUM = 8;
        HARD = 10;
        CRAZY = 12;
    }
    return size;
}


