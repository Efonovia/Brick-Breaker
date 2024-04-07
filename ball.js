class Ball {
    constructor(x, y, radius) {
        this.x = x+radius
        this.y = y-radius

        this.radius = radius
        this.speedX = 10
        this.speedY = 10
    }

    draw() {
        ctx.beginPath()
        ctx.fillStyle = `white`
        ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false)
        ctx.fill()
        ctx.closePath()
    }
    
    update() {
        this.draw()
        this.handleWallCollision()
        this.handlePaddleCollision()
        
        this.x += this.speedX
        this.y += this.speedY
    }

    handleWallCollision() {
        if((this.x - this.radius <= 0) || ((this.x + this.radius) >= canvasWidth)) {
            this.speedX = -this.speedX
        }

        if((this.y - this.radius <= 0)) {
            this.speedY = -this.speedY
        }
    }

    handlePaddleCollision () {
        if ((this.y+this.radius-paddle.y==0 || this.y+this.radius-paddle.y==1) && this.x>=paddle.x &&this.x<=paddle.x+paddle.width) { // ball collision with paddle top
            this.speedY = -this.speedY
        } else if(this.y+this.radius+1>paddle.y && ((this.speedX<0 && this.x-(paddle.x+paddle.width)<this.radius && this.x-(paddle.x+paddle.width)>0) || (this.speedX>0 && paddle.x-this.x<this.radius && paddle.x-this.x>0))) {
            this.speedX = -this.speedX
            this.speedY = -this.speedY
            // the ball collides with the paddle edge if the ball center and paddle edge is less than the radius and the the ball's bottom is lower than the paddle top
        }
    }

    isCollidingWithBrick(brick){
        if(ball.x>=brick.x && ball.x<=brick.right && ((ball.y-brick.bottom<=this.radius && ball.y>=brick.bottom) || (brick.y-ball.y<=this.radius && ball.y<brick.y))){
            ball.speedY =-ball.speedY; 
            return true;
        }
        if(ball.y>=brick.y && ball.y<=brick.bottom && ((ball.x-brick.right<=this.radius && ball.x>=brick.right) || (brick.x-ball.x<=this.radius && ball.x<brick.x))){
            ball.speedX = -ball.speedX; 
            return true;
        }
        if(
            (this.isOverlappingWithBrickBottom(brick) && this.isOverlappingWithBrickLeft(brick)) || 
            (this.isOverlappingWithBrickBottom(brick) && this.isOverlappingWithBrickRight(brick)) || 
            (this.isOverlappingWithBrickTop(brick) && this.isOverlappingWithBrickRight(brick)) && 
            (this.isOverlappingWithBrickTop(brick) && this.isOverlappingWithBrickLeft(brick))){
            ball.speedX = -ball.speedX; 
            ball.speedY =-ball.speedY; 
            return true;
        }
        return false;
    }
    isOverlappingWithBrickBottom(brick){
        if(ball.y>brick.bottom && ball.y-brick.bottom<this.radius) return true;
        return false;
    }

    isOverlappingWithBrickTop(brick){
        if(ball.y<brick.y && brick.y-ball.y<this.radius) return true;
        return false;
    }

    isOverlappingWithBrickLeft(brick){
        if(ball.x<brick.x && brick.x-ball.x<this.radius) return true;
        return false;
    }
    isOverlappingWithBrickRight(brick){
        if(ball.x>brick.right && ball.x-brick.right<this.radius) return true;
        return false;
    }

}