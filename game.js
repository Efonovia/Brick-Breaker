const canvas = document.querySelector('canvas')
const ctx = canvas.getContext("2d")
const canvasWidth = canvas.width
const canvasHeight = canvas.height
const scoreHtml = document.querySelector('.score')
const lifeHtml = document.querySelector('.life')
let bricks = []
let finished = false

function spawnPaddle() {
    paddle = new Paddle(200, 600)
}

function spawnBall() {
    ball = new Ball(paddle.x + (paddle.width/2), paddle.y, 12)
}

function drawBricks() {
    let x = gap
    let y = gap

    while(y < 300 && x<=canvasWidth) {
        let brick = new Brick(x, y)
        brick.draw()
        bricks.push(brick)
        x+= brick.width+gap
        
        if(x >= canvasWidth) {
            x = gap
            y+=brick.height+gap
        }
    }
}

function end(won){
    ctx.fillStyle="black";
    ctx.globalAlpha=0.5;
    ctx.fillRect(0,0,canvasWidth,canvasHeight);
    ctx.fillStyle="ivory";
    ctx.globalAlpha=1.0;
    ctx.fillRect(0,0,canvasWidth,150);
    ctx.font="40px Arial black";

    if(won){
        ctx.fillStyle="green";
        ctx.fillText("YOU WON!!",270,100);
    }else{
        ctx.fillStyle="red";
        ctx.fillText("You lost, score: "+score,70,100);
    }
    finished = true

}

function createRect() {
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)
}

function update() {
    ball.update()
    bricks.forEach((brick, i) => {
        if(ball.isCollidingWithBrick(brick)) {
            bricks.splice(i, 1)
            score += 10
        } else {
            brick.draw()
        }
    })
    scoreHtml.textContent = score
    lifeHtml.textContent = "x " + lives

    if(lives === 0) {
        end(false)
    }

    if(bricks.length === 0) {
        end(true)
    }

    if(ball.y-ball.radius >= canvasHeight) {
        lives -= 1
        spawnBall()
    }


}

function draw() {
    createRect()
    paddle.draw()
}

function animate() {
    if(!finished) {
        requestAnimationFrame(animate)
        draw()
        update()
    }
}

function init() {
    finished = false
    lives = 3
    score = 0
    spawnPaddle()
    spawnBall()
    drawBricks()
    animate()
}

init()

canvas.addEventListener("mousemove", e => {
    if(e.offsetX >= canvasWidth-paddle.width) {
        return
    }
    paddle.x = e.offsetX
})