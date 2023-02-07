const myTable = document.getElementsByTagName('table')[0]


const gameState = {
    board: [[null, null, null],
            [null, null, null],
            [null, null, null]],
    boardSize:3,
    pTwoHuman:null,
    letters:['X','O'],
    playerOneTurn:true
}

function playerMove(isPlayerOne,mySquare){
    if(isPlayerOne){
        mySquare.innerText = gameState.letters[0]
        gameState.playerOneTurn = false
    }else{
        mySquare.innerText = gameState.letters[1]
        gameState.playerOneTurn = true
    }
    return letter


}

function checkWin(){
}

function selectSquare(event){
    const mySquare = event.target
    squareNumber = mySquare.id
    letter = playerMove(gameState.playerOneTurn,mySquare)

    checkWin(letter, squareNumber)
}





myTable.addEventListener('click', selectSquare)