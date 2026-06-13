class Sprite {
    constructor(img, x, y , type) {
        this.img = img
        this.x = x
        this.y = y
        this.w = img.width
        this.h = img.height
        this.type = type
        this.collidable = COLLIDABLES.includes(type) ? true : false
    }

    display() {
        image(this.img, this.x, this.y, this.w, this.h)
    }

    getTop() {
        return this.y
    }

    getBottom() {
        return this.y + this.h
    }

    getLeft() {
        return this.x
    }

    getRight() {
        return this.x + this.w
    }

    setTop(y) {
        this.y = y
    }

    setBottom(y) {
        this.y = y - this.h
    }

    setLeft(x) {
        this.x = x
    }

    setRight(x) {
        this.x = x - this.w
    }
}

class AnimatedSprite extends Sprite {
    constructor(img, x, y, type, walking, idle, jumping) {
        super(img, x, y, type)
        this.dx = 0
        this.dy = 0
        this.state = 'idle'
        this.walking = walking
        this.idle = idle
        this.jumping = jumping
    }

    display() {
        if (this.state == 'idle') {
            this.animation = this.idle
        }
        else if (this.state == 'walking') {
            this.animation = this.walking
        }
        else if (this.state == 'jumping') {
            this.animation = this.jumping
        }

        let numImages = this.animation.length

        image(this.animation[frameCount % numImages], this.x, this.y)
    }
}

class Enemy extends AnimatedSprite {
    constructor(img, x, y, boundaryLeft, boundaryRight, type, idle, walking) {
        super(img, x, y, type, walking, idle, idle)
        this.dx = WALKING_SPEED / 2
        this.dy = 0
        this.state = 'walking'
        this.walking = walking
        this.boundaryLeft = boundaryLeft
        this.boundaryRight = boundaryRight
        this.collidable = true
    }

    update() {
        this.x += this.dx
        if (this.getLeft() < this.boundaryLeft) {
            this.setLeft(this.boundaryLeft)
            this.dx = -this.dx
        }
        else if (this.getRight() > this.boundaryRight) {
            this.setRight(this.boundaryRight)
            this.dx = -this.dx
        }
    }
}
