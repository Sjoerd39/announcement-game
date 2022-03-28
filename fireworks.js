import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty,
} from "./updateCustomProperty.js"

const fwElem = document.querySelector("[data-fw]")
const F_FRAME_COUNT = 29
const FRAME_TIME = 225

let fwFrame
let currentFrameTime

export function setupfw() {
  setCustomProperty(fwElem, "--left", 0)
  fwFrame = 0
  currentFrameTime = 0
}

export function updatefw(delta, speedScale) {
  // incrementCustomProperty(fwElem, "--left", delta * speedScale * SPEED * -1)
  handlefwdisplay(delta, speedScale)
}

function handlefwdisplay(delta, speedScale) {
  if (currentFrameTime >= FRAME_TIME) {
    fwFrame = (fwFrame + 1) % F_FRAME_COUNT
    fwElem.src = `imgs/fireworks-${fwFrame}.png`
    currentFrameTime -= FRAME_TIME
  }
  currentFrameTime += delta * speedScale

}