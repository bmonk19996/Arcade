const myBoard = document.getElementById("board");
const winMessage = document.getElementById("win-message");
const startButton = document.getElementById("start");
const selectLetter = document.getElementById('letter-sel');
const selectPlayer = document.getElementById('player-sel');
const selectRow = document.getElementById('row-sel')
const selectColumn = document.getElementById('column-sel')
const replacementText = document.getElementById("replacement-text")
const selectChoices = {
  board: [],
  rows: 3,
  columns: 3,
  winNum: 3,
  pTwoHuman: false,
  letters: ["X", "O"],
  playerOneTurn: true,
  start: true,
  computerStart: false
}
const gameState = {
  board: [],
  rows: 3,
  columns: 3,
  winNum: 3,
  pTwoHuman: false,
  letters: ["X", "O"],
  playerOneTurn: true,
  start: false,
  computerStart: false
};
//updates the board the user sees with the square changed
function playerMove(isPlayerOne, mySquare) {
  if (isPlayerOne) {
    mySquare.innerText = gameState.letters[0];
    return gameState.letters[0];
  } else {
    mySquare.innerText = gameState.letters[1];

    return gameState.letters[1];
  }
}
//updates the board in JS
function updateBoard(letter, row, column) {
  gameState.board[row][column] = letter;
}
//checks if the move wins the game
function checkWin(letter, row, column) {
  let count = 0;
  //check column
  for (let i = 0; i < gameState.board.length; i++) {
    if (gameState.board[i][column] === letter) {
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
    if (gameState.board[row][i] === letter) {
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
    if (gameState.board[myCoordinate[0]][myCoordinate[1]] === letter) {
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
    if (gameState.board[myCoordinate[0]][myCoordinate[1]] === letter) {
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
//checks if the square is available to change
function isValidSquare(row, column) {
  if (gameState.board[row][column] !== null) {
    return false;
  }
  return true;
}
//creates the win game message and stops future moves
function winGame() {
  let winner = "";
  if (gameState.playerOneTurn) {
    winner = "player one";
  } else if (gameState.pTwoHuman) {
    winner = "player two";
  } else {
    winner = "the computer";
  }
  endGame();
  winMessage.innerText = `${winner} has won the game`;
}
//when a player clicks on a square
function selectSquare(event) {

  const mySquare = event.target;
  if (gameState.start) {
    if (mySquare.matches("td")) {
      let squareNumber = mySquare.id;
      let row = Math.floor(squareNumber / gameState.board[0].length);
      let column = squareNumber % gameState.board[0].length;
      if (isValidSquare(row, column)) {
        letter = playerMove(gameState.playerOneTurn, mySquare);
        updateBoard(letter, row, column);
        console.log(gameState.board)
        if (checkWin(letter, row, column)) {
          winGame();
        }
      
      //change player turn and check if computer is other player
      gameState.playerOneTurn = !gameState.playerOneTurn;
      if (!gameState.pTwoHuman) {
        let win = computerMove();
        if (win) {
          winGame();
        }
        //return to player one turn
        gameState.playerOneTurn = !gameState.playerOneTurn;
      }
    }
    } else {
      //invalid square
    }
  }
}
//creates the board in JS and html
function createBoard(rows, columns) {
  let squareCount = 0;
  for (let i = 0; i < rows; i++) {
    const newHTMLRow = document.createElement("tr");
    let newRow = [];
    for (let j = 0; j < columns; j++) {
      const newHTMLSquare = document.createElement("td");
      newHTMLSquare.innerText = "";
      newHTMLSquare.id = squareCount;
      if (j > 0) {
        newHTMLSquare.classList.add("inner-column");
      }
      if (i > 0) {
        newHTMLSquare.classList.add("inner-row");
      }
      newRow.push(null);
      squareCount++;
      newHTMLRow.appendChild(newHTMLSquare);
    }
    gameState.board.push(newRow);
    myBoard.appendChild(newHTMLRow);
  }
}
//does the computer move and returns true if the move won the game
function computerMove() {
  //get all available moves and check for a draw
  if (gameState.start) {
    freeSquares = validSquares();
    if (freeSquares.length === 0) {
      drawGame();
      return false;
    }
    if (freeSquares.length === 1) {
      const mySquare = document.getElementById(freeSquares[0][0]);
      playerMove(false, mySquare);
      updateBoard(
        playerMove(false, mySquare),
        freeSquares[0][1],
        freeSquares[0][2]
      );
      drawGame();
      return false;
    }
    let squareCount = 0;
    //check for winning moves and do them
    for (let i = 0; i < gameState.board.length; i++) {
      for (let j = 0; j < gameState.board[0].length; j++) {
        if (isValidSquare(i, j)) {
          updateBoard(gameState.letters[1], i, j);
          if (checkWin(gameState.letters[1], i, j)) {
            const mySquare = document.getElementById(squareCount);
            mySquare.innerText = gameState.letters[1];

            return true;
          }
          updateBoard(null, i, j);
        }
        squareCount++;
      }
    }
    //check to stop winning moves for player one and do them
    squareCount = 0;
    for (let i = 0; i < gameState.board.length; i++) {
      for (let j = 0; j < gameState.board[0].length; j++) {
        if (isValidSquare(i, j)) {
          updateBoard(gameState.letters[0], i, j);
          if (checkWin(gameState.letters[0], i, j)) {
            updateBoard(gameState.letters[1], i, j);
            const mySquare = document.getElementById(squareCount);
            mySquare.innerText = gameState.letters[1];
            return false;
          }
          updateBoard(null, i, j);
        }
        squareCount++;
      }
    }
    //choose one at random

    let ranNum = Math.floor(Math.random() * freeSquares.length);
    const mySquare = document.getElementById(freeSquares[ranNum][0]);
    playerMove(false, mySquare);
    updateBoard(
      playerMove(false, mySquare),
      freeSquares[ranNum][1],
      freeSquares[ranNum][2]
    );
  }
  return false;
}
//returns an array of all valid squareNumbers with their row and column
function validSquares() {
  squares = [];
  let squareNumber = 0;
  for (let i = 0; i < gameState.board.length; i++) {
    for (let j = 0; j < gameState.board[0].length; j++) {
      if (isValidSquare(i, j)) {
        squares.push([squareNumber, i, j]);
      }

      squareNumber++;
    }
  }

  return squares;
}
//no free squares end the game in a draw
function drawGame() {
  winMessage.innerText = `the game has ended in a draw`;
  endGame();
}
//stop any more changes from happening
function endGame() {
  gameState.start = false;
}

function startGame() {
  //clear old board
  while (myBoard.firstElementChild) {
    myBoard.removeChild(myBoard.firstElementChild);
  }
  for(let key in selectChoices){
    gameState[key] = selectChoices[key]
  }
  while(gameState.board.length){
    gameState.board.pop()
  }
  createBoard(gameState.rows, gameState.columns);
  startButton.innerText = "RESTART";
  winMessage.innerText = "";
  if(gameState.computerStart === true){
    computerMove()
  }
}
function changePlayer(clickEvent){
  if(clickEvent.target.value === "human"){
    selectLetter.classList.add('hide')
    replacementText.classList.remove('hide')
    selectChoices.pTwoHuman = true
  }
  if(clickEvent.target.value === "computer"){
    selectLetter.classList.remove('hide')
    replacementText.classList.add('hide')
    selectChoices.pTwoHuman = false
  }

}
function changeLetter(clickEvent){

}
function changeColumn(clickEvent){
  
}
function changeRow(clickEvent){
  
}

selectRow.addEventListener("change", changeRow);
selectColumn.addEventListener("change", changeColumn);
selectLetter.addEventListener("change", changeLetter);
selectPlayer.addEventListener("change", changePlayer);
myBoard.addEventListener("click", selectSquare);
startButton.addEventListener("click", startGame);
