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
    playerOneTurn: true,
    start: false,
    computerStart: false,
  };


console.log(selectPlayer)



  function changePlayer(clickEvent) {
    console.log('hello')
    if (clickEvent.target.value === "human") {
      selectTurn.parentElement.classList.add("hide")
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
    warning()
  }
  function changeRow(clickEvent) {
    selectChoices.rows = clickEvent.target.value;
    warning();
  }
  function changeWin(clickEvent) {
    selectChoices.winNum = Number(clickEvent.target.value);
    warning()
  }
  //display error if new board is not able to be created in a way that can be won
  function warning(){
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

