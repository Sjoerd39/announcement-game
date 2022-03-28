import {
  setCustomProperty,
  incrementCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js"

const SPEED = 0.05
const FRAME_TIME = 175
const WM_FRAME_COUNT = 3
const WM_INTERVAL_MIN = 3000
const WM_INTERVAL_MAX = 4500
const worldElem = document.querySelector("[data-world]")

let currentFrameTime
let nextWMTime
let wmFrame

export function setupwm() {
  nextWMTime = WM_INTERVAL_MIN
  document.querySelectorAll("[data-wm]").forEach(wm => {
    wm.remove()
  })
}


export function updatewm(delta, speedScale) {
  document.querySelectorAll("[data-wm]").forEach(wm => {
    incrementCustomProperty(wm, "--left", delta * speedScale * SPEED * -1)
     if (getCustomProperty(wm, "--left") <= -10) {
      wm.remove()

    }
    if (currentFrameTime >= FRAME_TIME) {
      wmFrame = (wmFrame + 1) % WM_FRAME_COUNT
      wm.src = `imgs/panda-${wmFrame}.png`
      currentFrameTime -= FRAME_TIME
    }    
  })
  if (nextWMTime <= 0) {
    createwm()
    nextWMTime =
      randomNumberBetween(WM_INTERVAL_MIN, WM_INTERVAL_MAX) / speedScale
  }
  nextWMTime -= delta
  currentFrameTime += delta * speedScale

}

function handleanim(delta, speedScale) {
  document.querySelectorAll("[data-wm]").forEach(wm => {
    if (currentFrameTime >= FRAME_TIME) {
      wmFrame = (wmFrame + 1) % WM_FRAME_COUNT
      wm.src = `imgs/panda-${wmFrame}.png`
      currentFrameTime -= FRAME_TIME
    }
  })
  currentFrameTime += delta * speedScale
}


export function getwmRects() {
  return [...document.querySelectorAll("[data-wm]")].map(wm => {
    return wm.getBoundingClientRect()
  })
}

function createwm() {
  currentFrameTime = 1
  wmFrame = 1
  const wm = document.createElement("img")
  wm.dataset.wm = true
  wm.src = `imgs/panda-${wmFrame}.png`
  wm.classList.add("wm")
  setCustomProperty(wm, "--left", 100)
  worldElem.append(wm)
}

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
