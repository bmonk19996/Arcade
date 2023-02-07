const myBoard = document.getElementById('board')

const gameState = {
    board: [],
    winNum:3,
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
function updateBoard(letter, row, column){
    gameState.board[row][column] = letter
}
//checks if the move wins the game
function checkWin(letter, row, column){
    let count = 0
    //check column
    for(let i = 0; i< gameState.board.length; i++){
        if(gameState.board[i][column] === letter){
            count++
        }else{
            count = 0
        }
        if(count === gameState.winNum){
            return true
        }

    }
    count = 0
    //check row
    for(let i = 0; i< gameState.board[0].length; i++){
        if(gameState.board[row][i] === letter){
            count++
            console.log(count)
        }else{
            count = 0
        }
        if(count === gameState.winNum){
            return true
        }
    }
    count = 0
    //check left to rightdiagonal
    
    return false
}

function isValidSquare(row, column){
return  true
}
//when a player clicks on a square
function selectSquare(event){
    const mySquare = event.target

    if(mySquare.matches('td')){

        squareNumber = mySquare.id
        let row =  Math.floor(squareNumber / gameState.board[0].length)
    let column = squareNumber % gameState.board[0].length
        if(isValidSquare(row, column)){
            letter = playerMove(gameState.playerOneTurn,mySquare)
            updateBoard(letter,row, column)
            let win = checkWin(letter, row, column)
             console.log(win) 
        }else{
            //invalid square
        }
    }

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
            newHTMLSquare.id = squareCount
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