class Bird {
    constructor(img, x, y) {
        this.img = img
        this.width = img.width
        this.height = img.height

        this.x = x
        this.y = y

        this.dy = 0
        this.gravity = 0.2
    }

    display() {
        image(this.img, this.x, this.y)
    }

    update() {
        this.dy += this.gravity
        this.y += this.dy
        this.y = constrain(this.y, 0, 264)
    }

    jump(currentPoints) {
        // Calculate how many sets of 10 points the player has
        let level = Math.floor(currentPoints / 10)

        // Base jump strength is -3 so we subtract 0.5 for each level
        this.dy = -3 - (level * 0.5)
    }

    reset(y) {
        this.y = y
        this.dy = 0
        this.gravity = 0.2
    }

    collides(pipe) {
        if (this.x + 5 > pipe.x + pipe.width / 2 || pipe.x > this.x + this.width - 5) {
            return false
        }

        if (this.y + 5 > pipe.y - pipe.gap && pipe.y > this.y + this.height - 5) {
            return false
        }
        return true
    }
}
