
function appendElementImg(parentElem, img) {
  var elImg = document.createElement('span')
  elImg.innerHTML = img;
  parentElem.appendChild(elImg);
}


function printMat(mat, selector) {
  var strHTML = '<table border="0"><tbody>';
  for (var i = 0; i < mat.length; i++) {
      strHTML += '<tr>';
      for (var j = 0; j < mat[0].length; j++) {
        var cell = mat[i][j];
        var className = 'cell cell-' + i + '-' + j;
        strHTML += '<td class="' + className + '"> ' + cell + ' </td>'
      }
      strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';
    var elContainer = document.querySelector(selector);
    elContainer.innerHTML = strHTML;
  }
  
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function getClassName(pos) {
    var tileClass = 'tile-' + pos.i + '-' + pos.j;
    return tileClass;
}

  // location such as: {i: 2, j: 7}
  function renderCell(location, value) {
    // Select the elCell and set the value
    var elCell = document.querySelector(`.cell-${location.i}-${location.j}`);
    elCell.innerHTML = value;
  }
  
  function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  
  // const HINT = '&#128161';
  // const SAFE = '&#129686';
  // const MANUAL = '&#128075';
  // const SEVEN_BOOM = '&#10128;';
  // const UNDO = '&#129318';
  // const BEST_SCORE = '&#128285';
  // const MINE = '&#128165';
  // const FLAG = '&#9873';
  // const FLOOR = '';
  // const EMPTY = '';
  
  function renderCell(position, value) {
      var cellSelector = '.' + getClassName(position) // '.cell-2-5'
      var elCell = document.querySelector(cellSelector);
      elCell.innerHTML = value;
  }
  