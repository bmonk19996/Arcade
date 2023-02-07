const myBoard = document.getElementById('board')

const gameState = {
    board: [],
    boardSize:3,
    pTwoHuman:null,
    letters:['X','O'],
    playerOneTurn:true
}
//updates the board the user sees with the square changed
function playerMove(isPlayerOne,mySquare){
    if(isPlayerOne){
        mySquare.innerText = gameState.letters[0]
        gameState.playerOneTurn = false
        return gameState.letters[0]
    }else{
        mySquare.innerText = gameState.letters[1]
        gameState.playerOneTurn = true
        return gameState.letters[1]
    }
}
//updates the board in JS
function updateBoard(letter, squareNumber){
    let row =  Math.floor(squareNumber / gameState.board[0].length)
    let column = squareNumber % gameState.board[0].length
    console.log(row, gameState.board[0].length)
    console.log(column, gameState.board.length)
    gameState.board[row][column] = letter
    console.log(gameState.board)
}
//checks if the move wins the game
function checkWin(letter, squareNumber){

}

//when a player clicks on a square
function selectSquare(event){
    const mySquare = event.target
    squareNumber = mySquare.id
    letter = playerMove(gameState.playerOneTurn,mySquare)
    updateBoard(letter,squareNumber)
    let win = checkWin(letter, squareNumber)
}
//creates the board in JS and html
function createBoard(rows, columns){
    
    let squareCount = 0
    for(let i = 0; i < rows; i++){
        const newHTMLRow = document.createElement('tr')
        let newRow = []
        for(let j = 0; j < columns; j++){
            const newHTMLSquare = document.createElement('td')
            newHTMLSquare.innerText = squareCount
            if(j > 0 && j < columns - 1){
                newHTMLSquare.classList.add('inner-column')
            }
            if(i > 0 && i < rows - 1){
                newHTMLSquare.classList.add('inner-row')
            }
            newRow.push(squareCount)
            squareCount++
            newHTMLRow.appendChild(newHTMLSquare)
        }
        gameState.board.push(newRow)
        myBoard.appendChild(newHTMLRow)
    }
}


createBoard(3,3)

myBoard.addEventListener('click', selectSquare)