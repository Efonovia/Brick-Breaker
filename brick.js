const minWidth = 30
const maxWidth = 150
const gap = 10


function generateRandomColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256)
    const color = `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`;
    return color;
}

class Brick {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.width = minWidth + Math.floor(Math.random() * (maxWidth - minWidth))
        this.height = 50
        this.bottom=this.y+this.height; 
		this.right=this.x+this.width;
        this.color = generateRandomColor()
    }

    draw() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}