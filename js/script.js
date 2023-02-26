
const langArr = {
    "placeholder": {
        "English": '[Enter name]',
        "Русский": "[Введи имя]",
    },
    "placeholder-city": {
        "English": '[Enter city]',
        "Русский": "[Введи город]",
    },
    "url": {
        "English": ['https://api.openweathermap.org/data/2.5/weather?q=', '&lang=en&appid=e3c0174eab562c282118d28ef2a476cd&units=metric'],
        "Русский": ['https://api.openweathermap.org/data/2.5/weather?q=', '&lang=ru&appid=e3c0174eab562c282118d28ef2a476cd&units=metric']
    },
    "weatherError": {
        "English": `Error! Nothing to geocode for ''!`,
        "Русский": `Ошибка! Нет информации по городу ''!`,
    },
    "weatherError404": {
        "English": `Error! City not found for `,
        "Русский": `Ошибка! Не найден город `,
    },
    "humidity": {
        "English": 'Humidity: ',
        "Русский": "Влажность: ",
    },
    "wind": {
        "English": ['Wind speed: ', 'm/s'],
        "Русский": ["Скорость ветра: ", 'м/с'],
    },
    "quote": {
        "English": 'data.json',
        "Русский": 'dataRu.json',
    },
    "date": {
        "English": 'en',
        "Русский": 'ru',
    },
    "greeting": {
        "English": ['Good', 'morning', 'afternoon', 'evening', 'night'],
        "Русский": ["Хорошего", 'утра', 'дня', 'вечера', 'сна'],
    },
    'checkWeather': {
        "English": 'Show weather',
        "Русский": 'Показывать погоду',
    },
    'checkPlayer': {
        "English": 'Show player',
        "Русский": 'Показывать плеер',
    },
    'checkCustomPlayer': {
        "English": 'Show custom player',
        "Русский": 'Показывать продвинутый плеер',
    },
    'checkDate': {
        "English": 'Show Date',
        "Русский": 'Показывать дату',
    },
    'checkTime': {
        "English": 'Show Time',
        "Русский": 'Показывать время',
    },
    'checkGreeting': {
        "English": 'Show Greeting',
        "Русский": 'Показывать приветствие',
    },
    'checkQuote': {
        "English": 'Show Quote',
        "Русский": 'Показывать цитату дня',
    },
    'checkBackgroung': {
        "English": 'Choose background source: ',
        "Русский": 'Выберите источник фона: ',
    },
}

// увеличение шрифта
document.querySelector('body').style.fontSize = '20' + 'px'

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
let lang = 'English'

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
    dateCurrent.textContent = date.toLocaleDateString(`${langArr.date[lang]}-US`, options)
}

// 2. Приветствие
function getTimeOfDay(hours) {
    if (hours >= 6 && hours < 12) return langArr.greeting[lang][1]
    else if (hours >= 12 && hours < 18) return langArr.greeting[lang][2]
    else if (hours >= 18 && hours < 24) return langArr.greeting[lang][3]
    else return langArr.greeting[lang][4]
}
function showGreeting(hours) {
    const timeOfDay = getTimeOfDay(hours)
    const greetingText = `${langArr.greeting[lang][0]} ${timeOfDay} `
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
//document.querySelector('input.name').placeholder;

// 3. Слайдер изображений

function getRandomNum() {
    randomNum = Math.floor(Math.random() * 20) + 1
    //randomNum = randomNum
    return randomNum
}
getRandomNum()
let urlBackgroungSrc = `https://raw.githubusercontent.com/vitali007tut/stage1-tasks/assets/images/${timeOfDay}/${randomNum.toString().padStart(2, '0')}.jpg`
function setBg() {
    //randomNum = randomNum.toString().padStart(2, '0')
    const img = new Image()
    img.src = urlBackgroungSrc
    img.onload = () => {
       // console.log('in setBg()')
        console.log(urlBackgroungSrc)
        document.body.style.backgroundImage = `url(${img.src})`
        getWeather()
    }
}

setBg()

function getSlideNext() {
    randomNum++
    randomNum = randomNum === 21 ? 1 : randomNum
    //randomNum = randomNum.toString().padStart(2, '0')
    if (backgroundSourse === 'gitHub') {
        urlBackgroungSrc = `https://raw.githubusercontent.com/vitali007tut/stage1-tasks/assets/images/${timeOfDay}/${randomNum.toString().padStart(2, '0')}.jpg`
        setBg()
    } else if (backgroundSourse === 'unsplash') {
        getLinkToImage()
    } else if (backgroundSourse === 'flickr') {
        randomNumFlickr++
        randomNumFlickr = randomNumFlickr === arrPhotos.length ? 0 : randomNumFlickr
        console.log('randomNumFlickr', randomNumFlickr)
        urlBackgroungSrc = arrPhotos[randomNumFlickr]
        setBg()
    }

}

function getSlidePrev() {
    randomNum--
    randomNum = randomNum === 0 ? 20 : randomNum
    // randomNum = randomNum.toString().padStart(2, '0')
    if (backgroundSourse === 'gitHub') {
        urlBackgroungSrc = `https://raw.githubusercontent.com/vitali007tut/stage1-tasks/assets/images/${timeOfDay}/${randomNum.toString().padStart(2, '0')}.jpg`
        setBg()
    } else if (backgroundSourse === 'unsplash') {
        getLinkToImage()
    } else if (backgroundSourse === 'flickr') {
        randomNumFlickr--
        randomNumFlickr = randomNumFlickr === 0 ? arrPhotos.length - 1 : randomNumFlickr
        urlBackgroungSrc = arrPhotos[randomNumFlickr]
        setBg()
    }
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

async function getWeather() {
    const url = langArr.url[lang][0] + city.value + langArr.url[lang][1]
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod === '404') {
        weatherIcon.className = 'weather-icon owf'
        temperature.textContent = null
        wind.textContent = null
        humidity.textContent = null
        weatherDescription.textContent = null
        weatherError.textContent = langArr.weatherError404[lang] + `'${city.value}' !`
    } else if (city.value === '') {
        weatherIcon.className = 'weather-icon owf'
        temperature.textContent = null
        wind.textContent = null
        humidity.textContent = null
        weatherDescription.textContent = null
        weatherError.textContent = langArr.weatherError[lang]
    } else {
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${data.main.temp.toFixed(0)}°C`
        wind.textContent = langArr.wind[lang][0] + data.wind.speed.toFixed(0) + langArr.wind[lang][1]
        humidity.textContent = langArr.humidity[lang] + data.main.humidity + '%'
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
    const quotes = langArr.quote[lang]
    const res = await fetch(quotes);
    const data = await res.json();
    const index = Math.floor(Math.random() * data.length)
    quote.textContent = `"${data[index].quote}"`
    author.textContent = data[index].author
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

// 8. Перевод приложения

const langButtons = document.querySelectorAll('.lang')

langButtons.forEach(e => {
    e.addEventListener('click', () => {

        if (e.classList.contains('langActive')) {
            langButtons.forEach(elem => elem.classList.add('langActive'))
            e.classList.remove('langActive')
        } else {
            langButtons.forEach(elem => elem.classList.remove('langActive'))
            e.classList.add('langActive')
        }

        lang = document.querySelector('.langActive').textContent
        changeLanguage()
    })
})

function changeLanguage() {
    document.querySelector('input.name').placeholder = langArr['placeholder'][lang]
    city.placeholder = langArr['placeholder-city'][lang]
    getQuotes()
    getWeather()

    for (let key in langArr) {
        let elem = document.querySelector(`.${key}`);
        if (elem) {
            elem.innerHTML = langArr[key][lang];
        }
    }
}

changeLanguage();

// 9. Получение фонового изображения от API

// для unsplash
async function getLinkToImage() {
    const url = 'https://api.unsplash.com/photos/random?orientation=landscape&query=nature&client_id=nkTAiluFjm_LLanf9MP48O8hjUng0SzV_SVykNQV2yo'
    const res = await fetch(url);
    const data = await res.json();
    urlBackgroungSrc = data.urls.regular
    setBg()
    return urlBackgroungSrc
}

// для flickr
// https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=def91e9de3d8d6ce17f9f136b96f9655&tags=nature&extras=url_l&format=json&nojsoncallback=1
let arrPhotos = []
let randomNumFlickr = 0
async function getLinkToImage2() {
    const url = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=def91e9de3d8d6ce17f9f136b96f9655&tags=nature&extras=url_l&format=json&nojsoncallback=1'
    const res = await fetch(url);
    const data = await res.json();
    const arrObjectPhotos = data.photos.photo
    const arr = arrObjectPhotos.filter(elem => elem.url_l).map(e => e.url_l)
    arr.forEach(e => arrPhotos.push(e))
    randomNumFlickr = Math.floor(Math.random() * arrPhotos.length)
    urlBackgroungSrc = arrPhotos[randomNumFlickr]
    setBg()
}



const radioButtons = document.getElementsByName("radio")
for (const radioButton of radioButtons) {
    radioButton.addEventListener('change', showSelected);
}
let backgroundSourse = 'gitHub'
function showSelected(e) {
    if (this.checked) {
        backgroundSourse = this.value
        if (backgroundSourse === 'unsplash') {
            getLinkToImage()
        } else if (backgroundSourse === 'flickr') {
            getLinkToImage2()
        } else if (backgroundSourse === 'gitHub') {
            getRandomNum()
            urlBackgroungSrc = `https://raw.githubusercontent.com/vitali007tut/stage1-tasks/assets/images/${timeOfDay}/${randomNum.toString().padStart(2, '0')}.jpg`
            setBg()
        }
        console.log(this.value)
    }
}



// 10. Настройки приложения
const settingsBtn = document.querySelector('.settings')
const settingsSection = document.querySelector('.settins__section')
settingsBtn.addEventListener('click', popUpSettings)
function popUpSettings() {
    settingsBtn.classList.toggle('settings-close')
    settingsSection.classList.toggle('settings-On')
}

const visibWeather = document.querySelector('.visibWeather')
visibWeather.addEventListener('click', () => {
    if (visibWeather.checked == true) {
        document.querySelector('.weather').style.opacity = 1
    } else {
        document.querySelector('.weather').style.opacity = 0
    }
})

const visibPlayer = document.querySelector('.visibPlayer')
visibPlayer.addEventListener('click', () => {
    if (visibPlayer.checked == true) {
        document.querySelector('.player').style.opacity = 1
    } else {
        document.querySelector('.player').style.opacity = 0
    }
})

const visibCustomPlayer = document.querySelector('.visibCustomPlayer')
visibCustomPlayer.addEventListener('click', () => {
    if (visibCustomPlayer.checked == true) {
        document.querySelector('.contaner').style.opacity = 1
    } else {
        document.querySelector('.contaner').style.opacity = 0
    }
})

const visibDate = document.querySelector('.visibDate')
visibDate.addEventListener('click', () => {
    if (visibDate.checked == true) {
        document.querySelector('.date').style.opacity = 1
    } else {
        document.querySelector('.date').style.opacity = 0
    }
})

const visibTime = document.querySelector('.visibTime')
visibTime.addEventListener('click', () => {
    if (visibTime.checked == true) {
        document.querySelector('.time').style.opacity = 1
    } else {
        document.querySelector('.time').style.opacity = 0
    }
})

const visibGreeting = document.querySelector('.visibGreeting')
visibGreeting.addEventListener('click', () => {
    if (visibGreeting.checked == true) {
        document.querySelector('.greeting-container').style.opacity = 1
    } else {
        document.querySelector('.greeting-container').style.opacity = 0
    }
})

const visibQuote = document.querySelector('.visibQuote')
visibQuote.addEventListener('click', () => {
    if (visibQuote.checked == true) {
        document.querySelector('.quote-of-day').style.opacity = 1
    } else {
        document.querySelector('.quote-of-day').style.opacity = 0
    }
})




/* console.log(`Self marks:
    1. Часы и календарь +15
    2. Приветствие +10
    3. Слайдер изображений +20
    4. Виджет погоды +15
    5. Виджет "цитата дня" +10
    6. Аудиоплеер +15
    7. Продвинутый аудиоплеер +-
    8. Перевод приложения +-
    9. Получение фонового изображения от API
    10. Настройки приложения +-`) */