import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty,
} from "./updateCustomProperty.js"


const endtrigger = document.querySelector("[data-endtrigger]")
const jointrigger = document.querySelector("[data-jointrigger]")
const jointrigger2 = document.querySelector("[data-jointrigger2]")
const leavetrigger = document.querySelector("[data-leavetrigger]")
const SPEED = 0.01


// jointrigger
export function setupjointrigger() {
  setCustomProperty(jointrigger, "--left", 240)
  setCustomProperty(jointrigger, "--bottom", 0)
}

export function updatejointrigger(delta, speedScale) {
  incrementCustomProperty(jointrigger, "--left", delta * speedScale * SPEED * -1)
}

export function getjointriggerRect() {
  return jointrigger.getBoundingClientRect()
}

// leavetrigger
export function setupleavetrigger() {
  setCustomProperty(leavetrigger, "--left", 380)
  setCustomProperty(leavetrigger, "--bottom", 0)
}

export function updateleavetrigger(delta, speedScale) {
  incrementCustomProperty(leavetrigger, "--left", delta * speedScale * SPEED * -1)
}

export function getleavetriggerRect() {
  return leavetrigger.getBoundingClientRect()
}

// jointrigger2
export function setupjointrigger2() {
  setCustomProperty(jointrigger2, "--left", 480)
  setCustomProperty(jointrigger2, "--bottom", 0)
}

export function updatejointrigger2(delta, speedScale) {
  incrementCustomProperty(jointrigger2, "--left", delta * speedScale * SPEED * -1)
}

export function getjointriggerRect2() {
  return jointrigger2.getBoundingClientRect()
}

// endtrigger
export function setupendtrigger() {
  setCustomProperty(endtrigger, "--left", 635)
  // setCustomProperty(endtrigger, "--left", 50)
  setCustomProperty(endtrigger, "--bottom", 0)
}

export function updateendtrigger(delta, speedScale) {
  incrementCustomProperty(endtrigger, "--left", delta * speedScale * SPEED * -1)
}

export function getendtriggerRect() {
  return endtrigger.getBoundingClientRect()
}
