const myBoard = document.getElementById("board");
const winMessage = document.getElementById("win-message");
const warningMessage = document.getElementById("warning");
const startButton = document.getElementById("start");
const selectTurn = document.getElementById("turn-sel");
const selectPlayer = document.getElementById("player-sel");
const selectRow = document.getElementById("row-sel");
const selectColumn = document.getElementById("column-sel");
const selectWin = document.getElementById("win-sel");
const selectColor = document.getElementById("color-sel")
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

function updateBoard(color, row, column) {
  gameState.board[row][column] = color;
}

function clickColumn(clickEvent) {
  const mySquare = clickEvent.target;
  columnNumber = mySquare.classList[0];
  if ( mySquare.matches("span")  && gameState.start === true) {
    const myColumnNum = mySquare.classList[0];
    const myColumn = document.getElementsByClassName(myColumnNum);
    let myColor = gameState.colors[0];
    if (!gameState.playerOneTurn) {
      myColor = gameState.colors[1];
    }
    for (row = myColumn.length - 1; row >= 0; row--) {
      if (
        !myColumn[row].classList.contains(gameState.colors[0]) &&
        !myColumn[row].classList.contains(gameState.colors[1])
      ) {
        myColumn[row].classList.add(myColor);
        updateBoard(myColor, row, myColumnNum);
        let win = checkWin(myColor, row, myColumnNum);
        if (win) {
          winGame();
          return
        }
        if (availableMoves().length === 0) {
          drawGame();
          return
        }
        gameState.playerOneTurn = !gameState.playerOneTurn;
        if (gameState.pTwoHuman === false) {
          let win = computerMove();
          if (win) {
            winGame();
            return
          }
          if (availableMoves().length === 0) {
            drawGame();
            return
          }
          gameState.playerOneTurn = !gameState.playerOneTurn;
        }
        return;
      }
    } //the column is already filled
    return null;
  }
}
function computerMove() {
  if (gameState.start) {
    //get all available moves
    moves = availableMoves();
    if (moves.length === 0) {
      drawGame();
      return false;
    }
    //check for winning moves
    for (let i = 0; i < moves.length; i++) {
      updateBoard(gameState.colors[1], moves[i][0], moves[i][1]);
      if (checkWin(gameState.colors[1], moves[i][0], moves[i][1])) {
        const myColumn = document.getElementsByClassName(moves[i][1]);
        myColumn[moves[i][0]].classList.add(gameState.colors[1]);
        return true;
      }
      updateBoard(null, moves[i][0], moves[i][1]);
    }
    //check to stop winning moves
    for (let i = 0; i < moves.length; i++) {
      updateBoard(gameState.colors[0], moves[i][0], moves[i][1]);
      if (checkWin(gameState.colors[0], moves[i][0], moves[i][1])) {
        const myColumn = document.getElementsByClassName(moves[i][1]);
        myColumn[moves[i][0]].classList.add(gameState.colors[1]);
        updateBoard(gameState.colors[1], moves[i][0], moves[i][1]);
        return false;
      }
      updateBoard(null, moves[i][0], moves[i][1]);
    }
    //random move
    let ranNum = Math.floor(Math.random() * moves.length);
    const myColumn = document.getElementsByClassName(moves[ranNum][1]);
    myColumn[moves[ranNum][0]].classList.add(gameState.colors[1]);
    updateBoard(gameState.colors[1], moves[ranNum][0], moves[ranNum][1]);
    return false;
  }
}
//checks if the move wins the game
function checkWin(color, row, column) {
  let count = 0;
  //check column
  row = Number(row);
  column = Number(column);
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
function availableMoves() {
  let moves = [];
  //check each column for its move
  for (let col = 0; col < gameState.board[0].length; col++) {
    let found = false;
    for (let row = gameState.board.length - 1; row >= 0; row--) {
      if (!found && gameState.board[row][col] === null) {
        moves.push([row, col]);
        found = true;
      }
    }
  }
  return moves;
}
function createBoard(rows, columns) {
  for (let i = 0; i < rows; i++) {
    const newHTMLRow = document.createElement("tr");
    let newRow = [];
    for (let j = 0; j < columns; j++) {
      const newHTMLSquare = document.createElement("td");
      const innerSquare = document.createElement("span");
      //this class is its column number
      innerSquare.classList.add(`${j}`);
      if (j > 0) {
        newHTMLSquare.classList.add("inner-column");
      }
      if (i > 0) {
        newHTMLSquare.classList.add("inner-row");
      }
      newRow.push(null);
      newHTMLSquare.appendChild(innerSquare)
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
function drawGame() {
  winMessage.innerText = `the game has ended in a draw`;
  endGame();
}
//stop any more changes from happening
function endGame() {
  gameState.start = false;
}
//creates the win game message and stops future moves
function winGame() {
  let winner = "";
  if (gameState.playerOneTurn) {
    if (gameState.pTwoHuman) {
      winner = "player one has";
    } else {
      winner = "You have";
    }
  } else if (gameState.pTwoHuman) {
    winner = "player two has";
  } else {
    winner = "the computer has";
  }
  endGame();
  winMessage.innerText = `${winner} won the game`;
}
function changePlayer(clickEvent) {
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
function changeColor(){
  selectChoices.colors.unshift(gameState.colors.pop())
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
selectColor.addEventListener("change", changeColor)
myBoard.addEventListener("click", clickColumn);
startButton.addEventListener("click", startGame);
