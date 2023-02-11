const myBoard = document.getElementById("board");
const winMessage = document.getElementById("win-message");
const warningMessage = document.getElementById("warning");
const startButton = document.getElementById("start");
const selectTurn = document.getElementById("turn-sel");
const selectPlayer = document.getElementById("player-sel");
const selectRow = document.getElementById("row-sel");
const selectColumn = document.getElementById("column-sel");
const selectWin = document.getElementById("win-sel");
const selectChoices = {
  board: [],
  rows: 6,
  columns: 7,
  winNum: 4,
  pTwoHuman: false,
  colors: ["red", "blue"],
  playerOneTurn: true,
  start: true,
  computerStart: false,
};
const gameState = {
  board: [],
  rows: 6,
  columns: 7,
  winNum: 4,
  pTwoHuman: false,
  colors: ["red", "blue"],
  playerOneTurn: true,
  start: false,
  computerStart: false,
};

//        console.log(newHTMLSquare.classList[0])
function updateBoard(color, row, column){
    gameState.board[row][column] = color
}
function clickColumn(clickEvent) {
  const mySquare = clickEvent.target;
  columnNumber = mySquare.classList[0];
  if (mySquare.matches("td") && gameState.start === true) {
    const myColumnNum = mySquare.classList[0];
    const myColumn = document.getElementsByClassName(myColumnNum);
    let myColor = gameState.colors[0]
    if(!(gameState.playerOneTurn)){
      myColor = gameState.colors[1]
    }
    for (row = myColumn.length - 1; row >= 0; row--) {
      if (
        !myColumn[row].classList.contains(gameState.colors[0]) &&
        !myColumn[row].classList.contains(gameState.colors[1])
      ) {
        myColumn[row].classList.add(myColor);
        updateBoard(myColor, row, myColumnNum)
        let win = checkWin(myColor, row, myColumnNum)
        gameState.playerOneTurn = !gameState.playerOneTurn
        if(win){
          console.log(gameState.board)
           gameState.start = false
        }
        return
      }
    }//the column is already filled
    return null
  }
}

//checks if the move wins the game
function checkWin(color, row, column) {
    let count = 0;
    //check column
    row = Number(row)
    column = Number(column)
    for (let i = 0; i < gameState.board.length; i++) {
      if (gameState.board[i][column] === color) {
        count++;
      } else {
        count = 0;
      }
      if (count === gameState.winNum) {
        return true;
      }
    }
    count = 0;
    //check row
    for (let i = 0; i < gameState.board[0].length; i++) {
      if (gameState.board[row][i] === color) {
        count++;
      } else {
        count = 0;
      }
      if (count === gameState.winNum) {
        return true;
      }
    }
    count = 0;
    //check left to right diagonal starting in the top left of your diagonal
    let myCoordinate = [];
    if (row < column) {
      myCoordinate = [0, column - row];
    } else {
      myCoordinate = [row - column, 0];
    }
    while (gameState.board[myCoordinate[0]] !== undefined) {
      //end the loop because you are checking out of bounds of the board
      if (gameState.board[myCoordinate[0]][myCoordinate[1]] === color) {
        count++;
      } else {
        count = 0;
      }
      if (count === gameState.winNum) {
        return true;
      }
      myCoordinate[0]++;
      myCoordinate[1]++;
    }
    //check right to left diagonal starting in the top right of your diagonal
  if (row < gameState.board[0].length - column) {
    myCoordinate = [0, column + row];
    console.log(myCoordinate)
  } else {
    myCoordinate = [
      row - (gameState.board[0].length - 1 - column),
      gameState.board[0].length - 1,
    ];
  }
  count = 0;

  while (gameState.board[myCoordinate[0]] !== undefined) {

    //end the loop because you are checking out of bounds of the board
    if (gameState.board[myCoordinate[0]][myCoordinate[1]] === color) {
      count++;
    } else {
      count = 0;
    }
    if (count === gameState.winNum) {
      return true;
    }
    myCoordinate[0]++;
    myCoordinate[1]--;
  }

  return false;
}

function createBoard(rows, columns) {
  for (let i = 0; i < rows; i++) {
    const newHTMLRow = document.createElement("tr");
    let newRow = [];
    for (let j = 0; j < columns; j++) {
      const newHTMLSquare = document.createElement("td");
      //this class is its column number
      newHTMLSquare.classList.add(`${j}`);
      if (j > 0) {
        newHTMLSquare.classList.add("inner-column");
      }
      if (i > 0) {
        newHTMLSquare.classList.add("inner-row");
      }
      newRow.push(null);
      newHTMLRow.appendChild(newHTMLSquare);
    }
    gameState.board.push(newRow);
    myBoard.appendChild(newHTMLRow);
  }
}

function startGame() {
  //clear old board
  while (myBoard.firstElementChild) {
    myBoard.removeChild(myBoard.firstElementChild);
  }
  for (let key in selectChoices) {
    gameState[key] = selectChoices[key];
  }
  while (gameState.board.length) {
    gameState.board.pop();
  }
  createBoard(gameState.rows, gameState.columns);
  startButton.innerText = "RESTART";
  winMessage.innerText = "";
  if (gameState.computerStart === true) {
    computerMove();
  }
}

function changePlayer(clickEvent) {
  console.log("hello");
  if (clickEvent.target.value === "human") {
    selectTurn.parentElement.classList.add("hide");
    selectChoices.pTwoHuman = true;
    selectChoices.computerStart = false;
    selectTurn.selectedIndex = 0;
  }
  if (clickEvent.target.value === "computer") {
    selectTurn.parentElement.classList.remove("hide");
    selectChoices.pTwoHuman = false;
  }
}
function changeLetter(clickEvent) {
  if (clickEvent.target.value === "first") {
    selectChoices.computerStart = false;
  }
  if (clickEvent.target.value === "second") {
    selectChoices.computerStart = true;
  }
}
function changeColumn(clickEvent) {
  selectChoices.columns = clickEvent.target.value;
  warning();
}
function changeRow(clickEvent) {
  selectChoices.rows = clickEvent.target.value;
  warning();
}
function changeWin(clickEvent) {
  selectChoices.winNum = Number(clickEvent.target.value);
  warning();
}
//display error if new board is not able to be created in a way that can be won
function warning() {
  if (
    selectChoices.winNum > selectChoices.rows &&
    selectChoices.winNum > selectChoices.columns
  ) {
    warningMessage.innerText = "Warning board to small to win game";
  } else {
    warningMessage.innerText = "";
  }
}

selectRow.addEventListener("change", changeRow);
selectWin.addEventListener("change", changeWin);
selectColumn.addEventListener("change", changeColumn);
selectTurn.addEventListener("change", changeLetter);
selectPlayer.addEventListener("change", changePlayer);
myBoard.addEventListener("click", clickColumn);
startButton.addEventListener("click", startGame);
