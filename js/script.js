// 1. Часы и календарь
const time = document.querySelector('.time')
const dateCurrent = document.querySelector('.date')

function showTime() {
    const date = new Date()
    time.textContent = date.toLocaleTimeString()
    showDate()
    setTimeout(showTime, 1000)
  }
  showTime()

function showDate() {
    const date = new Date()
    const options = { weekday: 'long', month: 'long', day: 'numeric' }
    dateCurrent.textContent = date.toLocaleDateString('en-US', options)
}
