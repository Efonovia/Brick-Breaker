class Paddle {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.width = 150
        this.height = 30
        this.color = "red"
        this.speed = 20
    }

    draw() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }

    isCollidingWithWall(wall) {
        if(wall === "right") {
            if((this.x+this.width) >= canvasWidth) {
                return true
            } else {
                return false
            }
        }

        if(wall === "left") {
            if(this.x <= 0) {
                return true
            } else {
                return false
            }
        }
    }

}