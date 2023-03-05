const urlParams = new URLSearchParams(window.location.search);
const level = urlParams.get('level');
const obstacle = urlParams.get('obstacle');
// console.log(level);

let modal = document.getElementById("modal");
let scoreCard = document.getElementById("score");
let scoreDifficulty = document.getElementById("scoreDifficulty");
let intScore = 0;

score.innerHTML = 0;

if(level == null || level < 0 || level > 4 || level == ""){
    window.location = "./index.html";
}

let FPS = 10;

if(level == 0){
    FPS = 10;
    scoreDifficulty.innerHTML = "Easy";
}else if(level == 1){
    FPS = 15;
    scoreDifficulty.innerHTML = "Medium";
}else if(level == 2){
    FPS = 20;
    scoreDifficulty.innerHTML = "Hard";
}else if(level == 3){
    FPS = 25;
    scoreDifficulty.innerHTML = "Very Hard";
}else if(level == 4){
    FPS = 40;
    scoreDifficulty.innerHTML = "Impossible";
}






const canvas = document.getElementById("myCanvas");
const HEIGHT = document.querySelector("body").scrollHeight * 0.8;
const WIDTH = Math.floor(document.querySelector("body").scrollWidth);
// const HEIGHT = canvas.height;
// const WIDTH = canvas.width;
canvas.width = WIDTH;
canvas.height = HEIGHT;

const ctx = canvas.getContext("2d");
const snakeHeadSize = Math.floor((WIDTH+HEIGHT)/35);




let then = Date.now();

let gamePause = false;
let gameBegin = false;

snake = new Snake(WIDTH,HEIGHT,snakeHeadSize);

function gameLoop() {

    requestAnimationFrame(gameLoop)
    const elapsed = Date.now() - then;

    if (elapsed > 1000 / FPS) { 
        then = Date.now() - (elapsed % (1000 / FPS));

        if(!gamePause){
            ctx.clearRect(0,0,WIDTH,HEIGHT)
            snake.show();
            let score = snake.eat();
            if(score){
                
                intScore += 10;
                scoreCard.innerHTML = intScore;
            }
            
            let isDead = snake.death();
            if(isDead){
                intScore = 0;
                scoreCard.innerHTML = intScore;
            }
            snake.update();
        }



    }



}

requestAnimationFrame(gameLoop);

document.addEventListener("keydown",(e)=>{
    // console.log(e);
    if(e.key == "ArrowUp" || e.key.toLowerCase() == "w" || e.key == "8"){
        if(!snake.checkInvalidMove(0,-1)){
            snake.xSpeed = 0;
            snake.ySpeed = -1;
        }
    }else if(e.key == "ArrowDown" || e.key.toLowerCase() == "s" || e.key == "5"){
        if(!snake.checkInvalidMove(0,1)){
            snake.xSpeed = 0;
            snake.ySpeed = 1;
        }
    }else if(e.key == "ArrowLeft" || e.key.toLowerCase() == "a" || e.key == "4"){
        if(!snake.checkInvalidMove(-1,0)){
            snake.xSpeed = -1;
            snake.ySpeed = 0;
        }
    }else if(e.key == "ArrowRight" || e.key.toLowerCase() == "d" || e.key == "6"){
        if(!snake.checkInvalidMove(1,0)){
            snake.xSpeed = 1;
            snake.ySpeed = 0;
        }
    }else if(e.key == " "){
            if(gamePause){
                // modal.classList.remove("active");
                // modal.classList.add("inactive");
                gamePause = false;
            }else{
                // modal.classList.add("active");
                // modal.classList.remove("inactive");
                // modal.innerHTML = "Press Space to continue";
                gamePause = true;
            }
    }
    
    // else{
    //     snake.grow();
    //     snake.grow();
    //     snake.grow();
    // }
    
})

