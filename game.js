function loop(){
    setTimeout(() => {
        requestAnimationFrame(loop)
        step++
    }, 1000 / fps);
    width = container.clientWidth
    height = container.clientHeight
    if( canvas.width != width ) canvas.width = width 
    if( canvas.height != height ) canvas.height = height 

    c.clearRect(0, 0, width, height)

    //input
    if(mouse.scroll){
        camera.z *= 1+(mouse.scroll*mouse.scrollSensitivity)
    }
    if(!camera.isLocked){
        if(mouse.z){
            camera.x += ( mouse.dx / camera.z ) * mouse.sensitivity
            camera.y += ( mouse.dy / camera.z ) * mouse.sensitivity
        }
    } else {
        camera.x = Math.floor(-camera.lockedTo.pos.x)
        camera.y = Math.floor(-camera.lockedTo.pos.y)
    }

    // simulation
    world.forEach((e)=>{e.update()})

    // render
    world.forEach((e)=>{e.render()})

    mouse.scroll = 0
}

world = []
for(let i = 0; i < 30; i++) world.push(new RigidShape( {x:rdm(width), y:rdm(height)}, random(0,pi*2), randomColor(),
    [
        {x: -10, y: -10},
        {x: 5, y: -10},
        {x: 10, y: 10},
        {x: 0, y: 10},
        {x: -10, y: 15},
    ]))
for(let i = 0; i < 30; i++) world.push(new RigidSprite( {x:rdm(width), y:rdm(height)}, './images/image.jpg', random(20, 50), random(20, 50)))


loop()