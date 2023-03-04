console.log(`hello`);



const canvas = document.getElementById("myCanvas");
const HEIGHT = 600;
const WIDTH = 600;
canvas.width = WIDTH;
canvas.height = HEIGHT;

const ctx = canvas.getContext("2d");
const FPS = 10;
const snakeHeadSize = 20;



let then = Date.now();

let gamePause = false;

snake = new Snake(WIDTH,HEIGHT,snakeHeadSize);

function gameLoop() {

    requestAnimationFrame(gameLoop)
    const elapsed = Date.now() - then;

    if (elapsed > 1000 / FPS) { 
        then = Date.now() - (elapsed % (1000 / FPS));

        if(!gamePause){
            ctx.clearRect(0,0,WIDTH,HEIGHT)
            snake.show();
            snake.eat();
            snake.death();
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
                gamePause = false;
            }else{
                gamePause = true;
            }
    }
    
    else{
        snake.grow();
        snake.grow();
        snake.grow();
    }
    
})

