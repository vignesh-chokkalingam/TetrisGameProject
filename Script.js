const shapes=[
    [
       [0,1,0,0],
       [0,1,0,0],
       [0,1,0,0],
       [0,1,0,0]

    ],
    [
        [0,1,0],
        [0,1,0],
        [1,1,0]

    ],
    [
        [0,1,0],
        [0,1,0],
        [0,1,1]
        
    ],
    [
        [1,1,0],
        [0,1,1],
        [0,0,0]
    ],
    [
        [0,1,1],
        [1,1,0],
        [0,0,0]
    ],
    [
        [1,1,1],
        [0,1,0],
        [0,0,0]
    ],
    [
        [1,1],
        [1,1]
    ]

]

const colors=[
    "#fff",
    "#9b5fe0",
    "#16a4d8",
    "#60dbe8",
    "#8bd346",
    "#efdf48",
    "#f9a52c",
    "#d64e12"
]

const rows=20;
const cols=10;

let canvas=document.querySelector("#tetris");
let scoreboard=document.querySelector("h2");
let ctx=canvas.getContext("2d");
ctx.scale(30,30);


let pieceObj=generatrRandomPiece();
let grid=generateGrid();
let score=0;
// console.log(grid)
// console.log(pieceObj);

function generatrRandomPiece(){
    let ran=Math.floor(Math.random()*7);
    // console.log(shapes[ran])
    let piece=shapes[ran];
    let colorIndex=ran+1;
    let x=4;
    let y=0;
    return{piece,x,y,colorIndex}

}

setInterval(newGameState,500);

function newGameState(){
    checkGrid();
    if(pieceObj==null){
        pieceObj=generatrRandomPiece();
        renderPiece();
    }
    moveDown();
}
 
function checkGrid(){
    let count=0;
    for (let i=0;i<grid.length;i++){
        let allfilled=true;
        for(let j=0;j<grid[i].length;j++){
            if(grid[i][j]==0){
                allfilled=false
            }

        }
        if(allfilled){
            grid.splice(i,1);
            grid.unshift([0,0,0,0,0,0,0,0,0,0]);
            count++;
        }
    }
    if(count==1){
        score+=10;
    }else if(count==2){
        score+=30;
    }else if(count==3){
        score+=50;
    }else if(count>3){
        score+=100;
    }
    scoreboard.innerHTML="Score"+score;
}


renderPiece();
function renderPiece(){
    let piece=pieceObj.piece;
    for (let i=0;i<piece.length;i++){
        for(let j=0;j<piece[i].length;j++){
            if(piece[i][j]==1){
                ctx.fillStyle=colors[pieceObj.colorIndex];
                ctx.fillRect(pieceObj.x+j,pieceObj.y+i,1,1)
                 
            }
        }
    }
}


 moveDown();
 function moveDown(){
    pieceObj.y+=1;
    renderGrid();
 } 



 function generateGrid(){
    let grid=[];
    for(let i=0;i<rows;i++){
        grid.push([]);
        for(let j=0;j<cols;j++){
            grid[i].push(0)
        }
    }
    return grid;

 }

 function renderGrid(){
    for (let i=0;i<grid.length;i++){
        for (let j=0;j<grid[i].length;j++){
            ctx.fillStyle=colors[grid[i][j]];
            ctx.fillRect(j,i,1,1);
        }
    }
    renderPiece();
 }


function moveDown(){
    if (!collision (pieceObj.x,pieceObj.y+1))
    pieceObj.y+=1;
    else{
        for(i=0;i<pieceObj.piece.length;i++){
            for(let j=0;j<pieceObj.piece[i].length;j++){
                if (pieceObj.piece[i][j]==1){
                    let p=pieceObj.x+j;
                    let q=pieceObj.y+i;
                    grid[q][p]=pieceObj.colorIndex
                }
            }
        }
        if(pieceObj.y==0){
            alert ("game over");
            grid=generateGrid();
            score=0;
        }
        pieceObj=generatrRandomPiece();
        
    }
    renderGrid();
}


function moveLeft(){
    if (!collision (pieceObj.x-1,pieceObj.y))
    pieceObj.x-=1;
    renderGrid();
}

function moveRight(){
    if (!collision (pieceObj.x+1,pieceObj.y))
    pieceObj.x+=1;
    renderGrid();
}

function rotate(){
    let rotatePiece=[];
    let piece=pieceObj.piece;
    for(let i=0;i<piece.length;i++){
        rotatePiece.push([]);
        for(let j=0;j<piece[i].length;j++){
            rotatePiece[i].push(0)
        }
    }

    for(let i=0;i<piece.length;i++){
        for(let j=0;j<piece[i].length;j++){
            rotatePiece[i][j]=piece[j][i]
        }
    }

    for(let i=0;i<rotatePiece.length;i++){
        rotatePiece[i]=rotatePiece[i].reverse();
    }

   if(!collision(pieceObj.x,pieceObj.y,rotatePiece))
        pieceObj.piece=rotatePiece  
    renderGrid()   
}



function collision(x,y,rotatePiece){
    let piece=rotatePiece || pieceObj.piece;
    for(let i=0;i<piece.length;i++){
        for(let j=0;j<piece[i].length;j++){
            if(piece[i][j]==1){
                let p=x+j;
                let q=y+i;
                if(p>=0 && p<cols && q>=0 && q<rows){
                    if(grid[q][p]>0){
                        return true
                    }

                }else{
                    return true;
                }
            }
        }
    }
    return false;

    
}




document.addEventListener("keydown",function(event){
    let key=event.code;
    // console.log(key)

    if(key=="ArrowDown"){
        moveDown();
    }
    else if(key=="ArrowLeft"){
           moveLeft();
    }
    else if(key=="ArrowRight"){
           moveRight();
    }
    else if(key=="ArrowUp"){
        rotate();
    }
})









 



