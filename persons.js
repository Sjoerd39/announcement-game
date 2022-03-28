import {
  incrementCustomProperty,
  setCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js"

const sElem = document.querySelector("[data-s]")
const JUMP_SPEED = 0.45
const GRAVITY = 0.0015
const S_FRAME_COUNT = 2
const FRAME_TIME = 100

let isJumping
let sFrame
let currentFrameTime
let yVelocity
export function setups() {
  isJumping = true
  sFrame = 0
  currentFrameTime = 0
  yVelocity = 0
  setCustomProperty(sElem, "--bottom", 0)
  document.removeEventListener("keydown", onJump)
  document.addEventListener("keydown", onJump)
}

export function updates(delta, speedScale) {
  handleRun(delta, speedScale)
  handleJump(delta)
}

export function getsRect() {
  return sElem.getBoundingClientRect()
}

export function setsLose() {
  sElem.src = "imgs/f-lose.png"
}

export function setsEnd() {
  sElem.src = "imgs/f-end.png"
  setCustomProperty(sElem, "--bottom", 0)
}


function handleRun(delta, speedScale) {
  if (isJumping) {
    sElem.src = `imgs/f-stationary.png`
    return
  }

  if (currentFrameTime >= FRAME_TIME) {
    sFrame = (sFrame + 1) % S_FRAME_COUNT
    sElem.src = `imgs/f-run-${sFrame}.png`
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
  if (e.code !== "Space" || isJumping) return

  yVelocity = JUMP_SPEED
  isJumping = true
}
