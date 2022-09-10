class Entity{
    constructor(pos, rot){
        this.id = Math.random()
        this.pos = pos
        this.rot = rot
    }
}

class Sprite extends Entity{
    constructor(pos, src, w, h){
        super(pos, 0)
        this.src = src
        this.w = w
        this.h = h
    }
    global(){
        return [
            {x: this.pos.x, y: this.pos.y},
            {x: this.pos.x+this.w, y: this.pos.y},
            {x: this.pos.x+this.w, y: this.pos.y+this.h},
            {x: this.pos.x, y: this.pos.y+this.h},
        ]
    }
    render(){
        let img = new Image()
        img.src = this.src
        c.drawImage(img, (this.pos.x+camera.x)*camera.z + width/2, (this.pos.y+camera.y)*camera.z + height/2, this.w*camera.z, this.h*camera.z)
    }
}
class RigidSprite extends Sprite{
    constructor(pos, src, w, h){
        super(pos, src, w, h)
        this.vel = {x:random(-1,1), y:random(-1,1)}
        this.velR = random(-0.2,0.2)
    }
    update(){
        this.pos.x += this.vel.x
        this.pos.y += this.vel.y
        this.rot += this.velR
    }
}
class StaticSprite extends Sprite{
    constructor(pos, src, w, h){
        super(pos, src, w, h)
    }
    update(){}
}

class Shape extends Entity{
    constructor(pos, rot, color, shape){
        super(pos, rot)
        this.shape = shape
        this.color = color
    }
    global(){
        return this.shape.map( p => {
            let alpha = Math.atan2( p.y , p.x)
            let d = Math.sqrt(p.x**2 + p.y**2)
            let newX = Math.cos(alpha + this.rot) * d
            let newY = Math.sin(alpha + this.rot) * d
            return {x: newX, y: newY}
        })
    }
    render(){
        c.fillStyle = this.color
        c.strokeStyle = this.color
        c.beginPath()
        c.moveTo(this.pos.x, this.pos.y)
        let shapeGlobal = this.global()

        c.beginPath()
        shapeGlobal.forEach( p => {
            c.lineTo((this.pos.x + p.x + camera.x)*camera.z + width/2 , (this.pos.y + p.y + camera.y)*camera.z + height/2 )
        })
        c.lineTo((this.pos.x + shapeGlobal[0].x + camera.x)*camera.z + width/2 , (this.pos.y + shapeGlobal[0].y + camera.y)*camera.z + height/2 )
        c.fill()
    }
}
class RigidShape extends Shape{
    constructor(pos, rot, color, shape){
        super(pos, rot, color, shape)
        this.vel = {x:random(-1,1), y:random(-1,1)}
        this.velR = random(-0.2,0.2)
    }
    update(){
        this.pos.x += this.vel.x
        this.pos.y += this.vel.y
        this.rot += this.velR
    }
}
class StaticShape extends Shape{
    constructor(pos, rot, color, shape){
        super(pos, rot, color, shape)
    }
    update(){}
}










