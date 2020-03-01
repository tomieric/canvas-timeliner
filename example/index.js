import './style.css'
import TimeLiner from '../dist/lib'

const app = document.getElementById('app')
const darkApp = document.getElementById('app-dark')
const points = document.getElementById('points')

const padLeft = n => n >= 10 ? n : `0${n}` 

console.log(padLeft(23))

const gap = 24
const interval = 10
const timeliner = new TimeLiner({
  container: app,
  gap,
  formatMarkText (frame) {
    const m = frame >= gap ? Math.floor(frame / gap) : 0
    const f = frame % 24
    return `00:0${m}:${padLeft(f)}`
  }
})

const timeLiner2 = new TimeLiner({
  container: darkApp,
  gap,
  lineHeight: 4,
  gapHeight: 4,
  lineColor: '#999999', // rgb(51, 51, 51)
  gapColor: '#eeeeee', // rgb(102, 102, 102)
  textStyle: 'rgb(210, 210, 210)',
  formatMarkText (frame) {
    const m = frame >= gap ? Math.floor(frame / gap) : 0
    const f = frame % 24
    return `00:0${m}:${padLeft(f)}`
  }
})

points.addEventListener('change', e => {
  console.log(e.target.value)
  timeliner.draw({
    interval: interval * e.target.value
  })
  timeLiner2.draw({
    interval: interval * e.target.value
  })
})