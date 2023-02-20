import playList from './playList.js'
//console.log(playList)

playList.forEach(el => {
    const li = document.createElement('li')
    li.classList.add('play-item')
    li.textContent = el.title
    document.querySelector('.play-list').append(li)
})