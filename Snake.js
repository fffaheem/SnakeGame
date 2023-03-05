class Snake{

    constructor(width,height,headSize){
        this.width = width;
        this.height = height;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.headSize = headSize;
        this.tail = [];
        this.tail[0] = new Vector(0,0);
        this.food = this.generateFood();
    }

    generateFood(){
        let columns = Math.floor(this.height/(this.headSize));
        let rows = Math.floor(this.width/(this.headSize));
        
        let foodX = this.headSize * Math.floor(Math.random() * (rows-1)) ;
        let foodY = this.headSize * Math.floor(Math.random() * (columns-1));
        for(let i = 0 ; i < this.tail.length; i++){
            if(foodX == this.tail[i].x && foodY == this.tail[i].y){
                // console.log(`invalid food`);
                return this.generateFood();
            }
        }
        return new Vector(foodX,foodY);
    }

    eat(){
        if(this.tail[0].x == this.food.x && this.tail[0].y == this.food.y){
            this.grow();
            this.food = this.generateFood();
            return true;
        }
    }


    grow(){

        let last = this.tail[this.tail.length - 1];
        this.tail.push(new Vector(last.x,last.y));

        for(let i = this.tail.length - 2; i > 0; i--){
            this.tail[i].x = this.tail[i-1].x;
            this.tail[i].y = this.tail[i-1].y;

        }
        this.tail[0].x += this.xSpeed*this.headSize;   
        this.tail[0].y += this.ySpeed*this.headSize;   

        
 
    }

    death(){
        if(
            this.tail[0].x >= this.width ||
            this.tail[0].x < 0 ||
            this.tail[0].y >= this.height ||
            this.tail[0].y < 0
        ){
            this.xSpeed = 0;
            this.ySpeed = 0;
            this.reset();
            return true;
        }

        if(this.suicide()){
            this.reset();
            return true;
        }
        
        return false;
    }

    


    suicide(){

        for(let i = 1; i < this.tail.length; i++){
            if(this.tail[0].x == this.tail[i].x && this.tail[0].y == this.tail[i].y){
                return true;
            }
        }
        return false;
    }

    checkInvalidMove(newX, newY){
        if(this.tail.length == 1) 
            return false;

        let newPosX = this.tail[0].x+(newX*this.headSize);
        let newPosY = this.tail[0].y+(newY*this.headSize);
        // console.table(newPosX, newPosY, this.tail[0].x,this.tail[0].y,this.tail[1].x,this.tail[1].y)
        return newPosX == this.tail[1].x && newPosY == this.tail[1].y
            // return true;
        // }

        // return false;
    }

    reset(){
        this.tail = [];
        this.tail[0] = new Vector(0,0);
    }

    update(){
        for(let i = this.tail.length - 1; i > 0; i--){
            this.tail[i].x = this.tail[i-1].x;
            this.tail[i].y = this.tail[i-1].y;

        }
        this.tail[0].x += this.xSpeed*this.headSize;   
        this.tail[0].y += this.ySpeed*this.headSize;   
    }

    show(){
        ctx.fillStyle = "#FF0000";
        for(let i = 0; i < this.tail.length; i++){
            ctx.fillRect(this.tail[i].x,this.tail[i].y,this.headSize,this.headSize);
        }
        this.showFood();
    }

    showFood(){
        ctx.fillStyle = "#00FF00";
        ctx.fillRect(this.food.x,this.food.y,this.headSize,this.headSize);
    }
    


}