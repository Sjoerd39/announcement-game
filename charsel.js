import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty,
} from "./updateCustomProperty.js"


const groundElems = document.querySelectorAll("[data-charsel]")

export function setupGround() {
  setCustomProperty(groundElems[0], "--left", 0)
}

export function updateGround(delta, speedScale, end) {
  groundElems.forEach(ground => {
    incrementCustomProperty(ground, "--left", delta * speedScale * SPEED * -1)
  })
}
