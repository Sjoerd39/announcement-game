import { getendtriggerRect, getjointriggerRect, getjointriggerRect2, getleavetriggerRect, 
  setupjointrigger, setupjointrigger2, setupendtrigger, setupleavetrigger, 
  updateendtrigger, updatejointrigger, updatejointrigger2, updateleavetrigger } from "./trigger.js"
import { updateGround, setupGround } from "./ground.js"
import { updates, setups, getsRect, setsLose, setsEnd } from "./persons.js"
import { setupwm, updatewm, getwmRects } from "./windmill.js"
import { setfEnd, setfjoin, setfleave, setfLose, setupf, updatef } from "./follower.js"
import { updateb, setupb, getbRect, setbEnd, setbendscreen} from "./baby.js"
import { setupfw, updatefw } from "./fireworks.js"

// to do:
// clean up texts layout

const WORLD_WIDTH = 75  
const WORLD_HEIGHT = 30
const SPEED_SCALE_INCREASE = 0.0000001

const worldElem = document.querySelector("[data-world]")
const scoreElem = document.querySelector("[data-score]")
const startScreenElem = document.querySelector("[data-start-screen]")
const fElem = document.querySelector("[data-f]")
const endtextElem = document.querySelector("[data-end-text]")
const fwElem = document.querySelector("[data-fw]")
const charselelem = document.querySelector("[data-charsel")
const gameelem = document.querySelector("[data-game")
const endelem = document.querySelector("[data-endscreen")

setPixelToWorldScale()
window.addEventListener("resize", setPixelToWorldScale)
document.addEventListener("DOMContentLoaded", startscreen, {once: true })


let lastTime
let speedScale
let score
let join 
let end 
let babyrun
let feiisselected
let selectfei
let selectsjoerd
let selectend

feiisselected = 2


function startscreen(){
  fElem.classList.add("hide")
  fwElem.classList.add("hide")
  endtextElem.classList.add("hide")
  gameelem.classList.add("hide")
  endelem.classList.add("hide")
  charselelem.classList.remove("hide")
  setupwm()
  // startscreen controls
  selectfei = document.getElementById('selfei')
  selectfei.addEventListener("click", feiselected, { once: true })
  selectfei.addEventListener("touchend", feiselected, { once: true }) 

  selectsjoerd = document.getElementById('selsjoerd')
  selectsjoerd.addEventListener("click", sjoerdselected, { once: true })
  selectsjoerd.addEventListener("touchend", sjoerdselected, { once: true })
}

function feiselected(){
  feiisselected = 1
  setTimeout(() => {
    document.addEventListener("keydown", handleStart, { once: true })
    document.addEventListener("touchend", handleStart, { once: true })
  }, 350)
  gameelem.classList.remove("hide")
  charselelem.classList.add("hide")
  setups(feiisselected)
  setupGround(feiisselected)
  music.background.play()
  music.ending.stop()
  sfx.choosef.play()
}

function sjoerdselected(){
  feiisselected = 0
  setTimeout(() => {
    document.addEventListener("keydown", handleStart, { once: true })
    document.addEventListener("touchend", handleStart, { once: true })
  }, 350)
  gameelem.classList.remove("hide")
  charselelem.classList.add("hide")
  setups(feiisselected)
  setupGround(feiisselected)
  music.background.play()
  music.ending.stop()
  sfx.chooses.play()
}

function update(time) {
  if (lastTime == null) {
    lastTime = time
    window.requestAnimationFrame(update)
    return
  }
  const delta = time - lastTime

  if (end <= 0) {
    updateGround(delta, speedScale)
    updates(delta, speedScale, feiisselected)
    if (join >= 1) updatef(delta, speedScale, join, feiisselected)
    updatewm(delta, speedScale, feiisselected)
    updateSpeedScale(delta, end)
    updateScore(delta)
    updateendtrigger(delta, speedScale)
    updatejointrigger(delta, speedScale)
    updatejointrigger2(delta, speedScale)
    updateleavetrigger(delta, speedScale)
  }

  if (end === 1) music.background.stop()
  if (end === 1 & !music.ending.playing()) music.ending.play()
  if (end === 1 & !sfx.fireworks.playing()) sfx.fireworks.play()

  if (babyrun <= 0) updateb(delta, speedScale)
  updatefw(delta, speedScale)
  
  if (checkLose()) return handleLose()
  if (checkjoin()) handleJoin()
  if (checkleave()) handleLeave()
  if (checkjoin2()) handleJoin()
  if (checkEnd()) handleEnd()
  if (checkbabystop()) handlebabystop() 

  lastTime = time
  window.requestAnimationFrame(update)
}

function checkLose() {
  const sRect = getsRect()
  return getwmRects().some(rect => isCollision(rect, sRect))
}

function checkEnd() {
  const sRect = getsRect()
  const rect = getendtriggerRect()
  return isCollision(rect, sRect)
}

function checkjoin() {
  const sRect = getsRect()
  const rect = getjointriggerRect()
  return isCollision(rect, sRect)
}

function checkjoin2() {
  const sRect = getsRect()
  const rect = getjointriggerRect2()
  return isCollision(rect, sRect)
}

function checkleave() {
  const sRect = getsRect()
  const rect = getleavetriggerRect()
  return isCollision(rect, sRect)
}

function checkbabystop(){
  const sRect = getsRect()
  const brect = getbRect()
  return isCollision(sRect, brect)
}

function isCollision(rect1, rect2) {
  return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top
  )
}

function updateSpeedScale(delta) {
  speedScale += delta * SPEED_SCALE_INCREASE
}

function updateScore(delta) {
  score += delta * 0.01
  scoreElem.textContent = Math.floor(score)
}

function handleStart() {
  lastTime = null
  speedScale = 1
  score = 0
  join = 0
  end = 0
  babyrun = 0
  setupwm()
  setupb()
  setupfw()
  startScreenElem.classList.add("hide")
  fwElem.classList.add("hide")
  fElem.classList.add("hide")
  window.requestAnimationFrame(update)
  setupendtrigger(feiisselected)  
  setupjointrigger(feiisselected)
  setupjointrigger2(feiisselected)
  setupleavetrigger(feiisselected)
}

function handleLose() {
  setsLose(feiisselected)
  if (join >= 1) setfLose(feiisselected)
  setTimeout(() => {
    document.addEventListener("keydown", rld, { once: true })
    document.addEventListener("touchend", rld, { once: true })

  }, 100)
  if(!sfx.leave.playing()) sfx.leave.play()
}


function handleJoin() {
  join = 1
  setfjoin()
  fElem.classList.remove("hide")
  if(!sfx.join.playing()) sfx.join.play()
}

function handleLeave() {
  join = 2
  setfleave()
  if(!sfx.leave.playing()) sfx.leave.play()
}

// 
function handleEnd() {
  end = 1
  setsEnd(feiisselected)
  setfEnd(feiisselected)
  setupwm()
  fwElem.classList.remove("hide")
  setTimeout(() => {
    document.addEventListener("keydown", endscreen, { once: true })
    document.addEventListener("touchend", endscreen, { once: true })
  }, 1500)
}

function handlebabystop() {
  babyrun = 1
  setbEnd()
  endtextElem.classList.remove("hide")
}

function endscreen(){
  gameelem.classList.add("hide")
  setbendscreen()
  endelem.classList.remove("hide")
  selectend = document.getElementById('babyend')
  setTimeout(() => {
    selectend.addEventListener("click", rld, {once : true})
    selectend.addEventListener("touchend", rld, {once : true})
  }, 500)
}

function setPixelToWorldScale() {
  let worldToPixelScale
  if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
    worldToPixelScale = window.innerWidth / WORLD_WIDTH
  } else {
    worldToPixelScale = window.innerHeight / WORLD_HEIGHT
  }

  worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`
  worldElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`
  charselelem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`
  charselelem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`
}

function rld() {
  document.location.reload()
}


// sounds
var sfx = {
  join: new Howl({
    src: ['https://www.mboxdrive.com/kiss.mp3'],
    // src: ['/sounds/kiss.mp3'],
    volume: 0.15
  }),

  leave: new Howl({
    // src: ['/sounds/ohno.mp3'],
    src: ['https://www.mboxdrive.com/ohno.mp3'],
    volume: 0.15
  }),

  fireworks: new Howl({
    src: ['https://www.mboxdrive.com/FireworksSF.mp3'],
    // src: ['/sounds/FireworksSF.mp3'],
    volume: 0.3,
    loop: true,
    html5: true
  }),

  choosef: new Howl({
    // src: ['/sounds/fei.mp3'],
    src: ['https://www.mboxdrive.com/fei.mp3'],
    volume: 0.2
  }),
  
  chooses: new Howl({
    src: ['https://www.mboxdrive.com/sjoerd.mp3'],
    // src: ['/sounds/sjoerd.mp3'],
    volume: 0.2
  })
}

var music = {
  background: new Howl({
    src: ['https://www.mboxdrive.com/backgroundmusic.mp3'],
    // src: ['/sounds/backgroundmusic.mp3'],
    volume: 0.1,
    loop:true,
    html5: true
  }),

  ending: new Howl({
    src: ['https://www.mboxdrive.com/fireworkmusic.mp3'],
    // src: ['/sounds/fireworkmusic.mp3'],
    volume: 0.09,
    loop:true,
    html5: true
  })
}