const myTable = document.getElementsByTagName('table')[0]








function selectSquare(event){
    const mySquare = event.target
    console.log(mySquare)
}





myTable.addEventListener('click', selectSquare)