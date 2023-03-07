const urlParams = new URLSearchParams(window.location.search);
const level = urlParams.get('level');
const obstacle = urlParams.get('obstacle');
// console.log(level);

let modal = document.getElementById("modal");
let scoreCard = document.getElementById("score");
let scoreDifficulty = document.getElementById("scoreDifficulty");
let scoreObstacle = document.getElementById("scoreObstacle");
let intScore = 0;
let bestScore = document.getElementById("bestScore");
let levelString = "";
let boolObstacle = "";
let obstacleAmount = 0;

score.innerHTML = 0;

if(!(level >= 0 && level < 5) || level == "" || level == null){
    window.location = "./index.html";
}

if(!(obstacle == "false" || obstacle == "true")){
    window.location = "./index.html";
}


let FPS = 10;

if(level == 0){
    FPS = 10;
    levelString = "Easy";
    obstacleAmount = 1;
}else if(level == 1){
    FPS = 15;
    levelString = "Medium";
    obstacleAmount = 2;
}else if(level == 2){
    FPS = 20;
    levelString = "Hard";
    obstacleAmount = 3;
}else if(level == 3){
    FPS = 25;
    levelString = "Very Hard";
    obstacleAmount = 4;
}else if(level == 4){
    FPS = 40;
    levelString = "Impossible";
    obstacleAmount = 5;
}

boolObstacle = "Yes";
if(obstacle == "false"){
    boolObstacle = "No";
    obstacleAmount = 0;
}

scoreObstacle.innerHTML = boolObstacle;


scoreDifficulty.innerHTML = levelString;

let localStorageBest = localStorage.getItem(`bestScore${levelString}${boolObstacle}`);
if(localStorageBest==null){
    localStorage.setItem(`bestScore${levelString}${boolObstacle}`,0);
    bestScore.innerHTML = 0;
}else{
    bestScore.innerHTML = localStorageBest;

}





const canvas = document.getElementById("myCanvas");
const HEIGHT = document.querySelector("body").clientHeight;
const WIDTH = document.querySelector("body").clientWidth;

// const HEIGHT = canvas.height;
// const WIDTH = canvas.width;
canvas.width = WIDTH;
canvas.height = HEIGHT;

const ctx = canvas.getContext("2d");
const snakeHeadSize = Math.floor((WIDTH+HEIGHT)/80);




let then = Date.now();

let gamePause = false;
let gameBegin = false;

snake = new Snake(WIDTH,HEIGHT,snakeHeadSize,obstacleAmount);

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
                if(intScore > localStorageBest){
                    localStorageBest = intScore;
                    localStorage.setItem(`bestScore${levelString}${boolObstacle}`,intScore);
                }
                bestScore.innerHTML = localStorageBest;
            }
            
            let isDead = snake.death();
            if(isDead){
                intScore = 0;
                scoreCard.innerHTML = intScore;
                modal.classList.add("active");
                modal.classList.remove("inactive");
                document.querySelector(".active").style.setProperty("--bgColor", "#ff0707");
                modal.innerHTML = "You died";
                gameBegin = false;
            }
            snake.update();


            let isWin = snake.win();
            if(isWin){
                modal.classList.add("active");
                modal.classList.remove("inactive");
                document.querySelector(".active").style.setProperty("--bgColor", "#8bc34a");
                modal.innerHTML = "Hurray, you won";
                gameBegin = false;
                intScore = 0;
                scoreCard.innerHTML = intScore;
            }
        }



    }



}

requestAnimationFrame(gameLoop);

document.addEventListener("keydown",(e)=>{
    // console.log(e);
    let startKey = false;
    if(e.key == "ArrowUp" || e.key.toLowerCase() == "w" || e.key == "8"){
        if(!snake.checkInvalidMove(0,-1)){
            snake.xSpeed = 0;
            snake.ySpeed = -1;
        }
        startKey = true;
    }else if(e.key == "ArrowDown" || e.key.toLowerCase() == "s" || e.key == "5"){
        if(!snake.checkInvalidMove(0,1)){
            snake.xSpeed = 0;
            snake.ySpeed = 1;
        }
        startKey = true;
    }else if(e.key == "ArrowLeft" || e.key.toLowerCase() == "a" || e.key == "4"){
        if(!snake.checkInvalidMove(-1,0)){
            snake.xSpeed = -1;
            snake.ySpeed = 0;
        }
        startKey = true;
    }else if(e.key == "ArrowRight" || e.key.toLowerCase() == "d" || e.key == "6"){
        if(!snake.checkInvalidMove(1,0)){
            snake.xSpeed = 1;
            snake.ySpeed = 0;
        }
        startKey = true;
    }else if(e.key == " " && gameBegin == true){
            if(gamePause){
                modal.classList.remove("active");
                modal.classList.add("inactive");
                gamePause = false;
            }else{
                modal.classList.add("active");
                modal.classList.remove("inactive");
                modal.innerHTML = "Press Space to continue";
                gamePause = true;
            }
    }

    if(!gameBegin){
        if(startKey){
            document.querySelector(".active").style.setProperty("--bgColor", "#8bc34a");
            modal.classList.remove("active");
            modal.classList.add("inactive");
            gameBegin = true;
        }
    }
    
    // else{
    //     snake.grow();
    //     snake.grow();
    //     snake.grow();
    // }
    
})

