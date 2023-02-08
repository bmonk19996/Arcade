const myBoard = document.getElementById("board");
const winMessage = document.getElementById("win-message");
const gameState = {
  board: [],
  winNum: 3,
  pTwoHuman: false,
  letters: ["X", "O"],
  playerOneTurn: true,
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

  winMessage.innerText = `${winner} has won the game`;
}
//when a player clicks on a square
function selectSquare(event) {
  const mySquare = event.target;

  if (mySquare.matches("td")) {
    let squareNumber = mySquare.id;
    let row = Math.floor(squareNumber / gameState.board[0].length);
    let column = squareNumber % gameState.board[0].length;
    if (isValidSquare(row, column)) {
      letter = playerMove(gameState.playerOneTurn, mySquare);
      updateBoard(letter, row, column);
      if (checkWin(letter, row, column)) {
        winGame();
      }
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
  } else {
    //invalid square
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
      newHTMLSquare.innerText = squareCount;
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
  let squareNumber = 0;
  //check for winning moves and do them
  for (let i = 0; i < gameState.board.length; i++) {
    for (let j = 0; j < gameState.board[0].length; j++) {
      if (isValidSquare(i, j)) {
        updateBoard(gameState.letters[1], i, j);
        if (checkWin(gameState.letters[1], i, j)) {
          const mySquare = document.getElementById(squareNumber);
          console.log(mySquare);
        }
        updateBoard(null, i, j);
      }
      squareNumber++;
    }
  }
  return true;
}

createBoard(5, 5);

myBoard.addEventListener("click", selectSquare);
