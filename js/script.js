// 1. Часы и календарь
const time = document.querySelector('.time')
const dateCurrent = document.querySelector('.date')
const greet = document.querySelector('.greeting')

function showTime() {
    const date = new Date()
    time.textContent = date.toLocaleTimeString()
    showDate()
    showGreeting(date.getHours())
    setTimeout(showTime, 1000)
}
showTime()

function showDate() {
    const date = new Date()
    const options = { weekday: 'long', month: 'long', day: 'numeric' }
    dateCurrent.textContent = date.toLocaleDateString('en-US', options)
}

// 2. Приветствие
function getTimeOfDay(hours) {
    if (hours >= 6 && hours < 12) return 'morning'
    else if (hours >= 12 && hours < 18) return 'afternoon'
    else if (hours >= 18 && hours < 24) return 'evening'
    else return 'night'
}
function showGreeting(hours) {
    const timeOfDay = getTimeOfDay(hours)
    const greetingText = `Good ${timeOfDay} `
    greet.textContent = greetingText
}

// document.querySelector('input.name').value -- значение(value) текстового поля input.name
// set value  from localStorage
function setLocalStorage() {
    localStorage.setItem('name', document.querySelector('input.name').value);
}
window.addEventListener('beforeunload', setLocalStorage)

// get value  from localStorage
function getLocalStorage() {
    if (localStorage.getItem('name')) {
        document.querySelector('input.name').value = localStorage.getItem('name');
    }
}
window.addEventListener('load', getLocalStorage)

// заполняю placeholder
document.querySelector('input.name').placeholder = '[Enter your name]'










console.log(`Self marks:
    1. Часы и календарь +15
    2. Приветствие +10
    3. Слайдер изображений
    4. Виджет погоды
    5. Виджет "цитата дня"
    6. Аудиоплеер
    7. Продвинутый аудиоплеер
    8. Перевод приложения
    9. Получение фонового изображения от API
    10. Настройки приложения`)