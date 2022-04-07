import {
  incrementCustomProperty,
  setCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js"

const bElem = document.querySelector("[data-b]")
const babyend = document.querySelector("[babyend]")
const B_FRAME_COUNT = 2
const FRAME_TIME = 190
const SPEED = 0.01

let bFrame
let currentFrameTime
let yVelocity
let randomNumberBaby

randomNumberBaby = Math.floor(Math.random() * 8)

export function setupb() {
  bFrame = 0
  currentFrameTime = 0
  yVelocity = 0
  setCustomProperty(bElem, "--bottom", 0)
  setCustomProperty(bElem, "--left", 725) //725
}

export function updateb(delta, speedScale) {
  handleRun(delta, speedScale)
  incrementCustomProperty(bElem, "--left", delta * speedScale * SPEED * -1)
}

export function setbjoin() {
  bFrame = 0
  currentFrameTime = 0
  bElem.src = `imgs/trigger.png`
  setCustomProperty(bElem, "--bottom", 0)
}

function handleRun(delta, speedScale) {
  if (currentFrameTime >= FRAME_TIME) {
    bFrame = (bFrame + 1) % B_FRAME_COUNT
    bElem.src = `imgs/baby-${randomNumberBaby}-car-${bFrame}.png`
    currentFrameTime -= FRAME_TIME
  }
  currentFrameTime += delta * speedScale  
}

export function setbEnd() {
  bElem.src = `imgs/baby-${randomNumberBaby}-car-0.png`
}

export function setbendscreen() {
  babyend.src = `imgs/baby-${randomNumberBaby}.png`
}

export function getbRect() {
  return bElem.getBoundingClientRect()
}