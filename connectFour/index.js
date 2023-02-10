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

function clickColumn(clickEvent) {
  const mySquare = clickEvent.target;
  columnNumber = mySquare.classList[0];
  if (mySquare.matches("td")) {
    const myColumnNum = mySquare.classList[0];
    const myColumn = document.getElementsByClassName(myColumnNum);
    for (i = myColumn.length - 1; i >= 0; i--) {
      if (
        !myColumn[i].classList.contains(gameState.colors[0]) &&
        !myColumn[i].classList.contains(gameState.colors[1])
      ) {
        myColumn[i].classList.add("red");
        return checkWin;
      }
    }//the column is already filled
    return null
  }
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
