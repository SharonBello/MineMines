'use strict';


function appendElementImg(parentElem, img) {
  var elImg = document.createElement('span')
  elImg.innerHTML = img
  parentElem.appendChild(elImg)
}


function printMat(mat, selector) {
  var strHTML = '<table border="0"><tbody>'
  for (var i = 0; i < mat.length; i++) {
    strHTML += '<tr>'
    for (var j = 0; j < mat[0].length; j++) {
      var cell = mat[i][j];
      var className = 'cell cell-' + i + '-' + j
      strHTML += '<td class="' + className + '"> ' + cell + ' </td>'
    }
    strHTML += '</tr>'
  }
  strHTML += '</tbody></table>'
  var elContainer = document.querySelector(selector)
  elContainer.innerHTML = strHTML
}

function getClassName(pos) {
  var tileClass = 'tile-' + pos.i + '-' + pos.j
  return tileClass
}

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function createMat(ROWS, COLS) {
  var mat = []
  for (var i = 0; i < ROWS; i++) {
    var row = []
    for (var j = 0; j < COLS; j++) {
      row.push('')
    }
    mat.push(row)
  }
  return mat
}

//The maximum is exclusive and the minimum is inclusive   
function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

function randHexColor() {

  let str = '#'
  let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
  for (let i = 0; i < 6; i++) {
      let index = Number.parseInt((Math.random() * 16).toString())
  str += arr[index]
}
return str
}
