import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty,
} from "./updateCustomProperty.js"

const SPEED = 0.01
// const groundElems = document.querySelectorAll("[data-ground]")
const groundElems = document.querySelector("[data-ground]")

export function setupGround(feiisselected) {
  if (feiisselected === 1){
    groundElems.src = `imgs/level-f.png`
  }
  if (feiisselected === 0){
    groundElems.src = `imgs/level-s.png`
  }
  // setCustomProperty(groundElems[0], "--left", 0)
  setCustomProperty(groundElems, "--left", 0)
  console.log();
}

export function updateGround(delta, speedScale, end) {
  // groundElems.forEach(ground => {
  incrementCustomProperty(groundElems, "--left", delta * speedScale * SPEED * -1)
  // })
}
