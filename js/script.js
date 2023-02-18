// увеличение шрифта
document.querySelector('body').style.fontSize = '22' + 'px'

// 1. Часы и календарь
const time = document.querySelector('.time')
const dateCurrent = document.querySelector('.date')
const greet = document.querySelector('.greeting')
let randomNum
const slideNext = document.querySelector('.slide-next')
const slidePrev = document.querySelector('.slide-prev')
let date
let timeOfDay
let hours
let city = document.querySelector('.city')
city.value = 'Minsk'
let isPlay = false
let playNum = 0
const audio = new Audio()

function showTime() {
    date = new Date()
    hours = date.getHours()
    timeOfDay = getTimeOfDay(hours)
    time.textContent = date.toLocaleTimeString()
    showDate()
    showGreeting(hours)
    if (audio.ended) playNext()
    setTimeout(showTime, 1000)
}
showTime()

function showDate() {
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
    city.value = city.value === '' ? 'Minsk' : city.value
    localStorage.setItem('city', city.value)
}
window.addEventListener('beforeunload', setLocalStorage)

// get value  from localStorage
function getLocalStorage() {
    if (localStorage.getItem('name')) {
        document.querySelector('input.name').value = localStorage.getItem('name');
    }
    if (localStorage.getItem('city') || localStorage.getItem('city') === '') {
        city.value = localStorage.getItem('city')
        getWeather()
    }
}
window.addEventListener('load', getLocalStorage)

// заполняю placeholder
document.querySelector('input.name').placeholder = '[Enter your name]'

// 3. Слайдер изображений

function getRandomNum() {
    randomNum = Math.floor(Math.random() * 20) + 1
    return randomNum
}

function setBg() {
    randomNum = randomNum.toString().padStart(2, '0')
    const img = new Image()
    img.src = `https://raw.githubusercontent.com/vitali007tut/stage1-tasks/assets/images/${timeOfDay}/${randomNum}.jpg`
    img.onload = () => {
        document.body.style.backgroundImage = `url(${img.src})`
        getWeather()
    }
}
getRandomNum()
setBg()

function getSlideNext() {
    randomNum++
    randomNum = randomNum === 21 ? 1 : randomNum
    setBg()
}

function getSlidePrev() {
    randomNum--
    randomNum = randomNum === 0 ? 20 : randomNum
    setBg()
}

slideNext.addEventListener('click', getSlideNext)
slidePrev.addEventListener('click', getSlidePrev)

// 4. Виджет погоды (?при перезагрузке страницы подтягивает сперва Minsk, а потом город из localStorage)

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature')
const weatherError = document.querySelector('.weather-error')
const wind = document.querySelector('.wind')
const humidity = document.querySelector('.humidity')
const weatherDescription = document.querySelector('.weather-description')

city.placeholder = `[Enter city]`

async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=e3c0174eab562c282118d28ef2a476cd&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod === '404') {
        weatherIcon.className = 'weather-icon owf'
        temperature.textContent = null
        wind.textContent = null
        humidity.textContent = null
        weatherDescription.textContent = null
        weatherError.textContent = `Error! City not found for '${city.value}'!`
    } else if (city.value === '') {
        weatherIcon.className = 'weather-icon owf'
        temperature.textContent = null
        wind.textContent = null
        humidity.textContent = null
        weatherDescription.textContent = null
        weatherError.textContent = `Error! Nothing to geocode for ''!`
    } else {
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${data.main.temp.toFixed(0)}°C`
        wind.textContent = `Wind speed: ${data.wind.speed.toFixed(0)} m/s`
        humidity.textContent = `Humidity: ${data.main.humidity}%`
        weatherDescription.textContent = data.weather[0].description;
        weatherError.textContent = null
    }

}

city.addEventListener('change', function () {
    getWeather()
})

// 5. Виджет "цитата дня"

let quote = document.querySelector('.quote')
let author = document.querySelector('.author')
let changeQuote = document.querySelector('.change-quote')

async function getQuotes() {
    const quotes = 'data.json';
    const res = await fetch(quotes);
    const data = await res.json();
    const index = Math.floor(Math.random() * data.length)
    quote.textContent = `"${data[index].q}"`
    author.textContent = data[index].a
}
getQuotes()
changeQuote.addEventListener('click', getQuotes)

// 6. Аудиоплеер

import playList from './playList.js'

const playBtn = document.querySelector('.play');
const playPrevBtn = document.querySelector('.play-prev')
const playNextBtn = document.querySelector('.play-next')
const activeItems = document.querySelectorAll('.play-item')
const playItems = document.querySelectorAll('li')

const playLength = playList.length


function playAudio() {
    if (!isPlay) {
        activeItems.forEach(item => item.classList.remove('item-active'))
        audio.src = playList[playNum].src
        playItems[playNum].classList.add('item-active')
        audio.currentTime = 0;
        audio.play();
        isPlay = true
        playBtn.classList.toggle('pause')
        
    } else {
        audio.pause()
        isPlay = false
        playBtn.classList.toggle('pause')
    }
}

function playNext() {
    playNum++
    playNum = playNum === playLength ? 0 : playNum
    isPlay = false
    playAudio()
}
function playPrev() {
    playNum--
    playNum = playNum === -1 ? playLength - 1 : playNum
    isPlay = false
    playAudio()
}

playBtn.addEventListener('click', playAudio)
playPrevBtn.addEventListener('click', playPrev)
playNextBtn.addEventListener('click', playNext)

// 7. Продвинутый аудиоплеер








/* console.log(`Self marks:
    1. Часы и календарь +15
    2. Приветствие +10
    3. Слайдер изображений +20
    4. Виджет погоды +15
    5. Виджет "цитата дня" +10
    6. Аудиоплеер +15
    7. Продвинутый аудиоплеер
    8. Перевод приложения
    9. Получение фонового изображения от API
    10. Настройки приложения`) */