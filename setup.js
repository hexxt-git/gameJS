const pi = Math.PI
const container = $('container')
const canvas = $('canvas')
const c = canvas.getContext('2d')
let width = container.clientWidth
let height = container.clientHeight
let fps = 60
let step = 0

let camera = {
    x: -width/2,
    y: -height/2,
    z: 1,
    isLocked: false,
    lockedTo: {x: 0, y: 0}
}

canvas.width = width
canvas.height = height

c.fillStyle = '#CCC'
c.strokeStyle = '#CCC'
c.font = 'bold 30px monospace';

let mouse = {
    x: width/2,
    y: height/2,
    z: false,
    dx: width/2,
    dy: height/2,
    dz: false,
    scroll: 0,
    sensitivity: 1.5,
    scrollSensitivity: 0.07,
}
window.addEventListener( 'mousemove', ( event)=>{
    mouse.dx = event.x - mouse.x
    mouse.dy = event.y - mouse.y
    mouse.x = event.x
    mouse.y = event.y
    if(Math.abs(mouse.dx)<2) mouse.dx = 0
    if(Math.abs(mouse.dy)<2) mouse.dy = 0
})
window.addEventListener('wheel',(event)=>{
    mouse.scroll = - event.deltaY / 100
})
window.addEventListener( 'mousedown', ()=>{
    mouse.z = true
})
window.addEventListener( 'mouseup', ()=>{
    mouse.z = false
})
container.addEventListener( 'mouseleave', ()=>{
    mouse.z = false
    mouse.dx = 0
    mouse.dy = 0
}) 
window.addEventListener( 'keypress', (key)=>{
    if( key.key == 'r') location.reload()
})