var board = [
        [7, 8, 0, 4, 0, 0, 1, 2, 0, 7, 8, 0, 4, 0, 0, 1, 2, 0],
        [6, 0, 0, 0, 7, 5, 0, 0, 9, 7, 8, 0, 4, 0, 0, 1, 2, 0],
        [0, 0, 0, 6, 0, 1, 0, 7, 8, 7, 8, 0, 4, 0, 0, 1, 2, 0],
        [0, 0, 7, 0, 4, 0, 2, 6, 0, 7, 8, 0, 4, 0, 0, 1, 2, 0],
        [0, 0, 1, 0, 5, 0, 9, 3, 0, 7, 8, 0, 4, 0, 0, 1, 2, 0],
        [9, 0, 4, 0, 6, 0, 0, 0, 5, 7, 8, 0, 4, 0, 0, 1, 2, 0],
        [0, 7, 0, 3, 0, 0, 0, 1, 2, 7, 8, 0, 4, 0, 0, 1, 2, 0],
        [1, 2, 0, 0, 0, 7, 4, 0, 0, 7, 8, 0, 4, 0, 0, 1, 2, 0],
        [0, 4, 9, 2, 0, 6, 0, 0, 7, 7, 8, 0, 4, 0, 0, 1, 2, 0]]
   
var active = "";
var key = [];
var game = "";

function sudoku(){
    console.log("sudoku mode")
    $(".minesweeper").hide()
    $(".sudoku").show()
    genRandomBoard()
    game = "sudoku";
}
function minesweeper(){
    console.log("minesweeper mode")
    $(".minesweeper").show()
    $(".sudoku").hide()
    game = "minesweeper";
    readyMinesweeper()
    plantBombs()
    setHints()
    print_board()
    document.getElementById("numberPad").style.display = "none";
    for (var j = 0; j < 9; j++)
        for (var i = 0; i < 18; i++)
            document.getElementById("img["+j+"]["+i+"]").style.display = "none";              
    while(key.length > 0)
        key.pop()
}


function readyMinesweeper(){
    document.getElementById("solution").innerHTML = "";
    for (var j = 0; j < 9; j++)
        for (var i = 0; i < 18; i++){
            board[j][i] = 0
            document.getElementById("["+j+"]["+i+"]").style.display = "none";
            document.getElementById("btn["+j+"]["+i+"]").style.display = "block";  
            document.getElementById("btn["+j+"]["+i+"]").innerHTML = "";            
        }
}

function plantBombs(){
    console.log("bombs have been planted")
    var bombs = []
    while(bombs.length > 0)
        bombs.pop()
    while (bombs.length < 30 ){
        var row = Math.floor(Math.random() * 9)
        var col = Math.floor(Math.random() * 18);
        if (board[row][col] != "bomb"){
            board[row][col] = "bomb";
            bombs.push(row+""+col)
        }
    }
}

function setHints(){
    for (var j = 0; j < 9; j++)
        for (var i = 0; i < 18; i++)
            if(board[j][i] == "bomb"){
                //top, top-left, top-right, left, right, bottom, bottom-left, bottom-right
                if(j != 0 && board[j-1][i] != "bomb")
                    board[j-1][i]++;
                if(j != 0 && i != 0 && board[j-1][i-1] != "bomb")
                    board[j-1][i-1]++;
                if(j != 0 && i != 18 && board[j-1][i+1] != "bomb")
                    board[j-1][i+1]++;
                if(i != 0 && board[j][i-1] != "bomb")
                    board[j][i-1]++;
                if(i != 18 && board[j][i+1] != "bomb")
                    board[j][i+1]++;
                if(j != 8 && board[j+1][i] != "bomb")
                    board[j+1][i]++;
                if(j != 8 && i != 0 && board[j+1][i-1] != "bomb")
                    board[j+1][i-1]++;
                if(j != 8 && i != 18 && board[j+1][i+1] != "bomb")
                    board[j+1][i+1]++;
            }
}

function probeMinefeild(pos){
    var row = pos.charAt(4)
    var col = pos.charAt(7)
    if(pos.length > 9)
        col += pos.charAt(8)
    key.push(row+""+col)
    document.getElementById("btn["+row+"]["+col+"]").style.display = "none";
    document.getElementById("["+row+"]["+col+"]").style.display = "block";
    
    if (board[row][col] == 0){
        board[row][col] = "clear"
        if(row != 0)
            probeMinefeild("btn["+(parseInt(row)-1)+"]["+col+"]");
        if(row != 0 && col != 0)
            probeMinefeild("btn["+(parseInt(row)-1)+"]["+(parseInt(col)-1)+"]");
        if(row != 0 && col < 17)
            probeMinefeild("btn["+(parseInt(row)-1)+"]["+(parseInt(col)+1)+"]")
        if(col != 0)
            probeMinefeild("btn["+row+"]["+(parseInt(col)-1)+"]")
        if(col < 17)
            probeMinefeild("btn["+row+"]["+(parseInt(col)+1)+"]")
        if(row != 8)
            probeMinefeild("btn["+(parseInt(row)+1)+"]["+col+"]")
        if(row != 8 && col != 0 )
            probeMinefeild("btn["+(parseInt(row)+1)+"]["+(parseInt(col)-1)+"]")
        if(row != 8 && col < 17 )
            probeMinefeild("btn["+(parseInt(row)+1)+"]["+(parseInt(col)+1)+"]")
    }
    if(board[row][col] == "bomb")
        handleBomb()
    checkWin()
    
}

function handleBomb(){
    document.getElementById("solution").innerHTML = "<h1>You Lose</h1>";
    for (var j = 0; j < 9; j++)
        for (var i = 0; i < 18; i++){
            document.getElementById("["+j+"]["+i+"]").style.display = "block";
            document.getElementById("btn["+j+"]["+i+"]").style.display = "none";
            if (board[j][i] == "bomb"){
                document.getElementById("img["+j+"]["+i+"]").style.display = "block"; 
                document.getElementById("["+j+"]["+i+"]").style.display = "none";
            }
                
            
                          
        }
}
function flag(event, pos){
   
    if (event.which == 3 && game == "minesweeper")
        if (document.getElementById(pos).innerHTML.indexOf(String.fromCharCode(9888)) == -1)
            document.getElementById(pos).innerHTML = String.fromCharCode(9888);
        else
            document.getElementById(pos).innerHTML = "";
    
}



function checkWin(){
    for (var j = 0; j < 9; j++)
        for (var i = 0; i < 18; i++)
            if(!key.includes(j+""+i) && board[j][i] != "bomb")
                return false
    document.getElementById("solution").innerHTML = "<h1>You Win</h1>";
}

function startGame() {
    document.getElementById("solution").innerHTML = "";
    for (var j = 0; j < 9; j++)
        for (var i = 0; i < 9; i++)
            if (board[j][i] == 0){
                document.getElementById("["+j+"]["+i+"]").style.display = "none";
                document.getElementById("btn["+j+"]["+i+"]").style.display = "block";  
                document.getElementById("btn["+j+"]["+i+"]").innerHTML = "";
            }
            else{
                document.getElementById("["+j+"]["+i+"]").style.display = "block";
                document.getElementById("btn["+j+"]["+i+"]").style.display = "none";
            }
                
    for (var j = 0; j < 9; j++)
        for (var i = 0; i < 9; i++)
            if (board[j][i] == 0)
                document.getElementById("["+j+"]["+i+"]").innerHTML = "";
            else
                document.getElementById("["+j+"]["+i+"]").innerHTML = board[j][i];
    
    print_board();
    document.getElementById("numberPad").style.display = "none";
    
    while(key.length > 0)
        key.pop()
    for (var j = 0; j < 9; j++)
        for (var i = 0; i < 9; i++)
            if (board[j][i] != 0)
                key.push(j+""+i)
}

function find_empty(){
    for (var j = 0; j < 9; j++)
        for (var i = 0; i < 9; i++)
            if (board[j][i] == 0){
                return j+""+i;
            }
    return null
}

function valid(num, pos){ 
    // Check row
    for (var i = 0; i < 9; i++)
        if (board[pos.charAt(0)][i] == num )
            return false
 
    // Check column
    for (var j = 0; j < 9; j++)
        if (board[j][pos.charAt(1)] == num && pos.charAt(0) != j)
            return false
    
    // Check box
    var box_y = parseInt(pos.charAt(0) / 3)
    var box_x = parseInt(pos.charAt(1) / 3)
    for (j = box_y * 3; j < box_y*3 + 3; j++)
        for (i = box_x * 3; i < box_x*3 + 3; i++)
            if (board[j][i] == num && i+""+j != pos)
                return false 
    
    return true
}

function readySolve(){
    for (var j = 0; j < 9; j++)
        for (var i = 0; i < 9; i++){
            document.getElementById("["+j+"]["+i+"]").style.display = "block";
            document.getElementById("btn["+j+"]["+i+"]").style.display = "none";
        }  
    for (var j = 0; j < 9; j++)
        for (var i = 0; i < 9; i++)
            if (!key.includes(j+""+i)){
                board[j][i] = 0
            }
    console.log(solve());
}

function solve(){
    var pos = find_empty();
    if (pos == null)
        return true;
    
    for(var i = 1; i < 10; i++){
        if(valid(i,pos.charAt(0)+""+pos.charAt(1))){
            board[pos.charAt(0)][pos.charAt(1)] = i;
            if(solve()){
                print_board();
                return true
            }
            board[pos.charAt(0)][pos.charAt(1)] = 0;
        }
    }
    print_board(); 
    return false;
}

function check(){
    var temp = "";
    console.log("checking")
    for (var j = 0; j < 9; j++)
        for (var i = 0; i < 9; i++)
            if (board[j][i] == 0){
                document.getElementById("solution").innerHTML = "<h1>Wrong</h1>";
                return false;
            }   
    
    for (var j = 0; j < 9; j++)
        for (var i = 0; i < 9; i++)
            if (!key.includes(j+""+i)){
                temp = board[j][i];
                board[j][i] = 0;
                if(valid(temp,j+""+i)){
                    document.getElementById("solution").innerHTML = "<h1>Correct</h1>";
                    board[j][i] = temp
                }else{
                    document.getElementById("solution").innerHTML = "<h1>Wrong</h1>";
                    board[j][i] = temp
                    return false;
                }
            } 
    
    for (var j = 0; j < 9; j++)
        for (var i = 0; i < 9; i++)
        {
            temp = board[j][i];
            board[j][i] = 0;
            if(valid(temp,j+""+i)){
                document.getElementById("solution").innerHTML = "<h1>Correct</h1>";
                board[j][i] = temp
            }else{
                document.getElementById("solution").innerHTML = "<h1>Wrong</h1>";
                console.log("awdawdaw")
                board[j][i] = temp
                return false;
            }
        }
}

function genRandomBoard(){
    var firstLine = []
    while (firstLine.length < 9 ){
        var num = Math.floor(Math.random() * 9) +1
        if (!firstLine.includes(num))
            firstLine.push(num)
    }
    console.log("generating sudoku")
    for (var i = 0; i < 9; i++)
        board[0][i]= firstLine.pop()
    for (var i = 0; i < 3; i++)
        board[1][i+6]= board[0][i]
    for (var i = 0; i < 6; i++)
        board[1][i]= board[0][i+3]
    for (var i = 0; i < 3; i++)
        board[2][i+6]= board[1][i]
    for (var i = 0; i < 6; i++)
        board[2][i]= board[1][i+3]
    
    for (var i = 0; i < 8; i++)
        board[3][i]= board[2][i+1]
        board[3][8]= board[2][0]
    for (var i = 0; i < 3; i++)
        board[4][i+6]= board[3][i]
    for (var i = 0; i < 6; i++)
        board[4][i]= board[3][i+3]
    for (var i = 0; i < 3; i++)
        board[5][i+6]= board[4][i]
    for (var i = 0; i < 6; i++)
        board[5][i]= board[4][i+3]
    
    for (var i = 0; i < 8; i++)
        board[6][i]= board[4][i+1]
        board[6][8]= board[4][0]
    for (var i = 0; i < 3; i++)
        board[7][i+6]= board[6][i]
    for (var i = 0; i < 6; i++)
        board[7][i]= board[6][i+3]
    for (var i = 0; i < 3; i++)
        board[8][i+6]= board[7][i]
    for (var i = 0; i < 6; i++)
        board[8][i]= board[7][i+3]
    
    for (var x = 0; x < 70; x++){
        var pos = Math.floor(Math.random() * 9)+""+Math.floor(Math.random() * 9);
        board[pos.charAt(0)][pos.charAt(1)] = 0 
    }
    var temp = []
    for (var j = 0; j < 9; j++)
        for (var i = 0; i < 9; i++)
            temp.push(board[j][i])
    if(solve())
    {
        for (var j = 8; j >= 0; j--)
            for (var i = 8; i >= 0; i--)
            {
                var current = temp.pop()
                board[j][i] = current;
            }         
    }
    else{
        while(temp.length > 0)
            temp.pop()
        genRandomBoard()
    }
    startGame()
}

function readyPad(pos){
    if(game == "sudoku"){
        active = pos.charAt(4)+""+pos.charAt(7);
        document.getElementById("numberPad").style.display = "block";
    }else{
        probeMinefeild(pos)        
    }
}

function assign(num){
    document.getElementById("numberPad").style.display = "none";
    board[active.charAt(0)][active.charAt(1)] = num
    document.getElementById("btn["+active.charAt(0)+"]["+active.charAt(1)+"]").innerHTML = num;
    if (num == 0)
        document.getElementById("btn["+active.charAt(0)+"]["+active.charAt(1)+"]").innerHTML = "";
}

function print_board(){
    for (var j = 0; j < 9; j++)
        for (var i = 0; i < 18; i++)
            if (board[j][i] == 0)
                document.getElementById("["+j+"]["+i+"]").innerHTML = "";
            else
                document.getElementById("["+j+"]["+i+"]").innerHTML = board[j][i];
}
