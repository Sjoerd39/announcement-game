import {
  incrementCustomProperty,
  setCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js"

const fElem = document.querySelector("[data-f]")
const F_FRAME_COUNT = 2
const FRAME_TIME = 200
const INTRO_FRAME_TIME = 200

let fFrame
let currentFrameTime
let currentintroFrameTime
let introfFrame
let yVelocity
let fors

function feiorsjoerd(feiisselected){
  if (feiisselected === 1){
    return fors =  `s`
  }
  if (feiisselected === 0){
    return fors = 'f'
  }
}

export function setupf() {
  fFrame = 0
  currentFrameTime = 0
  currentintroFrameTime = 0
  introfFrame = 0
  yVelocity = 0
  setCustomProperty(fElem, "--bottom", 0)
}

export function updatef(delta, speedScale, join, feiisselected) {
  handleRun(delta, speedScale, join, feiisselected)
}

export function getfRect() {
  return fElem.getBoundingClientRect()
}

export function setfLose(feiisselected) {
  fors = feiorsjoerd(feiisselected)
  fElem.src = `imgs/${fors}-lose.png`
}

export function setfEnd(feiisselected) {
  fors = feiorsjoerd(feiisselected)
  fElem.src = `imgs/${fors}-end.png`
}

export function setfjoin() {
  fFrame = 0
  currentFrameTime = 0
  currentintroFrameTime = 0
  introfFrame = 0
  fElem.src = `imgs/trigger.png`
  setCustomProperty(fElem, "--bottom", 0)
}

export function setfleave() {
  fFrame = 0
  currentFrameTime = 0
  currentintroFrameTime = 0
  introfFrame = 0
  fElem.src = `imgs/cloud-0.png`
}

function handleRun(delta, speedScale, join, feiisselected) {
  fors = feiorsjoerd(feiisselected)
  if (currentintroFrameTime >= FRAME_TIME & introfFrame <= 4 & join == 1) {
    introfFrame = (introfFrame + 1)
    fElem.src = `imgs/heart-${introfFrame}.png`
    currentintroFrameTime -= INTRO_FRAME_TIME
  }  
  if (currentFrameTime >= FRAME_TIME & introfFrame >= 5 & join == 1) {
    fFrame = (fFrame + 1) % F_FRAME_COUNT
    fElem.src = `imgs/${fors}-run-${fFrame}.png`
    currentFrameTime -= FRAME_TIME
  }

  if (currentintroFrameTime >= FRAME_TIME & introfFrame <= 2 & join == 2) {
    introfFrame = (introfFrame + 1)
    fElem.src = `imgs/cloud-${introfFrame}.png`
    currentintroFrameTime -= INTRO_FRAME_TIME
  }  
  
  if (currentFrameTime >= FRAME_TIME & introfFrame >= 3 & join == 2) {
    fFrame = (fFrame + 1) % F_FRAME_COUNT
    fElem.src = `imgs/airplane.png`
    currentFrameTime -= FRAME_TIME
    incrementCustomProperty(fElem, "--bottom", 0.5 * delta)
  }

  currentFrameTime += delta * speedScale
  currentintroFrameTime += delta * speedScale
  
}
