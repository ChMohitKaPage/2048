let score = 0;
let board = [
    [2,0,0,0],
    [0,0,16,0],
    [0,8,0,0],
    [0,0,4,32]
];

let gameBoard = document.getElementsByClassName("board")[0];
gameBoard.innerHTML = "";
// console.log(gameBoard);
window.onload = function(){
    board = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ];
    
    setTwo();
    setTwo();
    updateTile();
}
function updateTile(){
    gameBoard.innerHTML = ``;
    for(let i=0;i<4;i++){
        let row = `<div class="row" >`;
        for(let j=0;j<4;j++){
            let tile = `<div class="tile x${board[i][j]}" id="${i+1}-${j+1}">`
            if(board[i][j]>0) tile += `${board[i][j]}`;
            tile += `</div>`;
            row += tile;
        }
        row += `</div>`;
        gameBoard.innerHTML+=row;
        console.log(row);
    }
}
function setTwo(){
    for(let i=0;i<16;i++){
        let r = Math.floor(Math.random()*4);
        let c = Math.floor(Math.random()*4);
        console.log(r,c)
        if(board[r][c] == 0) {
            board[r][c] = 2;
            break;
        }
    }
}

function slideLeft(){
    if(!checkLeft()) return;
    let moves = 0;
    for(let i=0;i<4;i++){
        for(let j=1;j<4;j++){
            let k = j;
            while(k>0 && board[i][k-1] == 0){
                moves++;
                board[i][k-1] = board[i][k];
                board[i][k] = 0;
                k--;
            }
            if(k == 0) continue;
            
            if(board[i][k] == board[i][k-1]) {
                moves++;
                board[i][k-1] *= 2;
                score += board[i][k-1];
                board[i][k] = 0;
            }
        }
    }
    
    if(moves > 0) setTwo();
    updateTile();
}

function slideRight(){
    if(!checkRight()) return;
    let moves = 0;
    for(let i=0;i<4;i++){
        for(let j=2;j>-1;j--){
            let k = j;
            while(k<3 && board[i][k+1] == 0){
                board[i][k+1] = board[i][k];
                board[i][k] = 0;
                k++;
                moves++;
            }
            if(k == 3) continue;
            
            if(board[i][k] == board[i][k+1]) {
                moves++;
                board[i][k+1] *= 2;
                score += board[i][k+1];
                board[i][k] = 0;
            }
        }
    }
    if(moves > 0) setTwo();
    updateTile();
}

function slideUp(){
    if(!checkUp()) return;
    let moves = 0;
    for(let j=0;j<4;j++){
        for(let i=1;i<4;i++){
            let k=i;
            while(k>0 && board[k-1][j]==0){
                board[k-1][j] = board[k][j];
                board[k][j] = 0;
                k--;
                moves++;
            }
            if(k == 0) continue;
            if(board[k-1][j] == board[k][j]){
                board[k-1][j] *= 2;
                board[k][j] = 0;
                score += board[k-1][j];
                moves++;
            }
        }
    }
    if(moves > 0) setTwo();
    updateTile();
}

function slideDown(){
    if(!checkDown()) return;
    let moves = 0;
    for(let j=0;j<4;j++){
        for(let i=2;i>-1;i--){
            let k=i;
            while(k<3 && board[k+1][j]==0){
                board[k+1][j] = board[k][j];
                board[k][j] = 0;
                k++;
                moves++;
            }
            if(k == 3) continue;
            if(board[k+1][j] == board[k][j]){
                board[k+1][j] *= 2;
                board[k][j] = 0;
                score += board[k+1][j];
                moves++;
            }
        }
    }
    if(moves > 0) setTwo();
    updateTile();
}

function checkLeft(){
    for(let i=0;i<4;i++){
        for(let j=1;j<4;j++){
            if(board[i][j] && ( board[i][j-1] == 0 || board[i][j-1] == board[i][j] )) return true;
        }
    }
    return false;
}

function checkRight(){
    for(let i=0;i<4;i++){
        for(let j=0;j<3;j++){
            if(board[i][j] && ( board[i][j+1] == 0 || board[i][j+1] == board[i][j] )) return true;
        }
    }
    return false;
}

function checkUp(){
    for(let j=0;j<4;j++){
        for(let i=1;i<4;i++){
            if(board[i][j] && ( board[i-1][j] == 0 || board[i-1][j] == board[i][j] )) return true;
        }
    }
    return false;
}

function checkDown(){
    for(let j=0;j<4;j++){
        for(let i=0;i<3;i++){
            if(board[i][j] && ( board[i+1][j] == 0 || board[i+1][j] == board[i][j] )) return true;
        }
    }
    return false;
}

document.addEventListener('keyup', (e) => {
    if (e.code == "ArrowLeft") {
        slideLeft();
        // setTwo();
    }
    else if (e.code == "ArrowRight") {
        slideRight();
        // setTwo();
    }
    else if (e.code == "ArrowUp") {
        slideUp();
        // setTwo();

    }
    else if (e.code == "ArrowDown") {
        slideDown();
        // setTwo();
    }
    document.getElementById("score").innerText = score;
})