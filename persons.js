import {
  incrementCustomProperty,
  setCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js"

const sElem = document.querySelector("[data-s]")
const JUMP_SPEED = 0.45
const GRAVITY = 0.0015
const S_FRAME_COUNT = 2
const FRAME_TIME = 200

let isJumping
let sFrame
let currentFrameTime
let yVelocity

export function setups(feiisselected) {
  isJumping = false
  sFrame = 0
  currentFrameTime = 0
  yVelocity = 0
  setCustomProperty(sElem, "--bottom", 0)
  document.removeEventListener("keydown", onJump)
  document.addEventListener("keydown", onJump)
  document.removeEventListener("touchstart", onJump)
  document.addEventListener("touchstart", onJump)
  
  document.removeEventListener("click", onJump)
  document.addEventListener("click", onJump)

  if (feiisselected === 1){
    sElem.src = `imgs/f-stationary.png`
  }
  if (feiisselected === 0){
    sElem.src = `imgs/s-stationary.png`
  }
}

export function updates(delta, speedScale, feiisselected) {
  handleRun(delta, speedScale, feiisselected)
  handleJump(delta)
}

export function getsRect() {
  return sElem.getBoundingClientRect()
}

export function setsLose(feiisselected) {
  if (feiisselected === 1){
    sElem.src = "imgs/f-lose.png"
  }
  if (feiisselected === 0){
    sElem.src = "imgs/s-lose.png"
  }
}

export function setsEnd(feiisselected) {
  if (feiisselected === 1){
    sElem.src = "imgs/f-end.png"
  }
  if (feiisselected === 0){
    sElem.src = "imgs/s-end.png"
  }  
  setCustomProperty(sElem, "--bottom", 0)
}


function handleRun(delta, speedScale, feiisselected) {
  if (isJumping) {
    if (feiisselected === 1){
      sElem.src = `imgs/f-stationary.png`
    }
    if (feiisselected === 0){
      sElem.src = `imgs/s-stationary.png`
    }
    return
  }

  if (currentFrameTime >= FRAME_TIME) {
    sFrame = (sFrame + 1) % S_FRAME_COUNT
    if (feiisselected === 1){
      sElem.src = `imgs/f-run-${sFrame}.png`
    }
    if (feiisselected === 0){
      sElem.src = `imgs/s-run-${sFrame}.png`
    }
    currentFrameTime -= FRAME_TIME
  }

  currentFrameTime += delta * speedScale
}

function handleJump(delta) {
  if (!isJumping) return

  incrementCustomProperty(sElem, "--bottom", yVelocity * delta)

  if (getCustomProperty(sElem, "--bottom") <= 0) {
    setCustomProperty(sElem, "--bottom", 0)
    isJumping = false
  }

  yVelocity -= GRAVITY * delta
}

function onJump(e) {
  if ((e.code !== "Space" && e.type !== "click") || isJumping) return
  sfx.jump.play()
  yVelocity = JUMP_SPEED
  isJumping = true
}

var sfx = {
  jump: new Howl({
    src: ['/sounds/mariojump.mp3'],
    volume: 0.01
  })
}