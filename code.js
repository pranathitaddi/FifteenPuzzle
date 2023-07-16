let moves = 0;
let moves_counter =  document.getElementById("nomoves");
moves_counter.innerHTML = moves;
let win = false;


function swapTiles(cell1,cell2) {
    var temp = document.getElementById(cell1).className;
    document.getElementById(cell1).className = document.getElementById(cell2).className;
    document.getElementById(cell2).className = temp;

    var temp = document.getElementById(cell1).name;
    document.getElementById(cell1).name = document.getElementById(cell2).name;
    document.getElementById(cell2).name = temp;

    var temp = document.getElementById(cell1).innerHTML;
    document.getElementById(cell1).innerHTML = document.getElementById(cell2).innerHTML;
    document.getElementById(cell2).innerHTML = temp;
}
// nice

function check(row,column){
    var cell = document.getElementById("cell"+row+column);
    var num = cell.innerHTML;
    if (num == (row-1)*4+column){
        cell.style.background = "#5a547b";

    }
    else{
        cell.style.background = "#9FB8AD";
    }
}

function checkCell(row,column){
    var cell = document.getElementById("cell"+row+column);
    var num = cell.innerHTML;
    if (num == (row-1)*4+column){
        return true;
    }
    else{
        return false;
    }
}

function onClickfunc(){
    start_game = true;
             if(start_timer==false){
                startTimer();
                start_timer = true;
            }
}

let row_space = 0;
let column_space = 0;
function check_space(){
    for (var row=1;row<=4;row++) { 
        for (var column=1;column<=4;column++) {
            var cell = document.getElementById("cell"+row+column);
            var num = cell.innerHTML;
            if(num==''){
                row_space = row;
                column_space = column;
                break;
            }
       } 
    }
}

function on_key(){
    addCount();
    onClickfunc();
    check_space();
}
function keyboard(){
    check_space();
    var cell_space = document.getElementById("cell"+row_space+column_space);
    var cell_left = document.getElementById("cell"+row_space+(column_space-1));
    var cell_right = document.getElementById("cell"+row_space+(column_space+1));
    var cell_down = document.getElementById("cell"+(row_space+1)+column_space);
    var cell_up = document.getElementById("cell"+(row_space-1)+column_space);
    document.onkeydown = function(event) {
        if(win==false&&timer_toggle.innerHTML == "Pause"){
        switch (event.keyCode) {
           case 37:
            // ('Left key');
              swapTiles("cell"+row_space+column_space,"cell"+row_space+(column_space-1));
              check(row_space,(column_space-1));
              check(row_space,column_space);
              
           break;
           case 38:
            //   alert('Up key');
              swapTiles("cell"+row_space+column_space,"cell"+(row_space-1)+column_space);
              addCount();
              check((row_space-1),(column_space));
              check(row_space,column_space);
              onClickfunc();
              check_space();
           break;
           case 39:
            //   alert('Right key');
              swapTiles("cell"+row_space+column_space,"cell"+row_space+(column_space+1));
              addCount();
              check(row_space,(column_space+1));
              check(row_space,column_space);
              onClickfunc()
              check_space();
           break;
           case 40:
            //   alert('Down key');
              swapTiles("cell"+row_space+column_space,"cell"+(row_space+1)+column_space);
              check((row_space+1),(column_space));
              check(row_space,column_space);
              addCount();
              onClickfunc()
              check_space();
           break;
        }
    }
     };
     if(win==true){
        clearInterval(int);
        var win_seconds = seconds;
        var win_minutes = minutes;
        var win_moves = moves;

        let item = document.createElement('li');
        item.textContent = `Played in time - ${win_minutes} : ${win_seconds}`;

        leader_list.appendChild(item);
        start_game = false;
    }
}




function checkBoard(){
    for (var row=1;row<=4;row++) { 
        for (var column=1;column<=4;column++) {
            // check(row,column);
            if(checkCell(row,column)==true){
                continue;
            }
            else{
                return false;
            };
       } 
    }
    return true;
}

win = checkBoard();

int = null;

let mins = document.getElementById('mins');
let secs = document.getElementById('secs');
var milliseconds = 0;
var seconds = 0;
var minutes = 0;
let timer = true;
  
function shuffle() {
    for (var row=1;row<=4;row++) { 
        for (var column=1;column<=4;column++) {
    
        var row2=Math.floor(Math.random()*4 + 1);
        var column2=Math.floor(Math.random()*4 + 1);
       
        swapTiles("cell"+row+column,"cell"+row2+column2);
        } 
    }
    clearInterval(int);

    moves = 0;
    moves_counter.innerHTML = moves;

    milliseconds = 0;
    seconds = 0;
    minutes = 0;

    displayTimer();

    start_timer = false;
    timer_toggle.innerHTML = "Pause"
    
    for (var row=1;row<=4;row++) { 
        for (var column=1;column<=4;column++) {
            check(row,column);
    } 
    }
    // check_space();
    keyboard();

    
}

function displayTimer(){
    milliseconds+=10;
    if(milliseconds == 1000){
        milliseconds = 0;
        seconds++;
        if(seconds == 60){
            seconds = 0;
            minutes++;
        }
    }
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;
    let ms = milliseconds < 10 ? "00" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds;

    mins.innerHTML = `${m}`;
    secs.innerHTML = `${s}`;
}

function startTimer(){
    if(int!==null){
        clearInterval(int);
    }
    int = setInterval(displayTimer,10);
    timer = true;
}
// nice

function addCount(){
    moves = moves + 1;
    moves_counter.innerHTML = moves;
    
}
 
let leader_list = document.getElementById("leader_board");
let start_game = false;
let start_timer = false;

function clickTile(row,column) {
    var cell = document.getElementById("cell"+row+column);
    var tile = cell.className;
    if(win==false&&timer_toggle.innerHTML == "Pause"){
    if (tile!="tile16") { 
         if (column<4) {
           if ( document.getElementById("cell"+row+(column+1)).className=="tile16") {
             swapTiles("cell"+row+column,"cell"+row+(column+1));
             addCount();
             check(row,(column+1));
             check(row,column);
             onClickfunc();
             return;
           }
         }
         if (column>1) {
           if ( document.getElementById("cell"+row+(column-1)).className=="tile16") {
             swapTiles("cell"+row+column,"cell"+row+(column-1));
             addCount();
             check(row,(column+1));
             check(row,column);
             onClickfunc();
             return;
           }
         }
         if (row>1) {
           if ( document.getElementById("cell"+(row-1)+column).className=="tile16") {
             swapTiles("cell"+row+column,"cell"+(row-1)+column);
             addCount();
             check((row-1),column);
             check(row,column);
             onClickfunc();
             return;
           }
         }
         if (row<4) {
           if (document.getElementById("cell"+(row+1)+column).className=="tile16") {
             swapTiles("cell"+row+column,"cell"+(row+1)+column);
             addCount();
             check((row+1),column);
             check(row,column);
             onClickfunc();
             return;
           }
        } 
    }
    }
    if(win==true){
        clearInterval(int);
        var win_seconds = seconds;
        var win_minutes = minutes;
        var win_moves = moves;

        let item = document.createElement('li');
        item.textContent = `Played in time - ${win_minutes} : ${win_seconds}`;

        leader_list.appendChild(item);
        start_game = false;
    }
}


let timer_toggle = document.getElementById("timer_toggle")
function toggle(){
    if (timer_toggle.innerHTML == "Pause"&&win!=true&&start_game==true){
        clearInterval(int);
        timer_toggle.innerHTML = "Play";
    }
    else if (timer_toggle.innerHTML == "Play"&&win!=true&&start_game==true){
        int = setInterval(displayTimer,10);
        timer_toggle.innerHTML = "Pause";
    }
}