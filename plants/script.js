let menuBtn = document.getElementById('img_burger');
let menu = document.querySelector('.nav');

menuBtn.addEventListener('click', function () {
  menuBtn.classList.toggle('active');
  menu.classList.toggle('active');
})


const buttons = document.querySelectorAll('.link');
const section = document.querySelectorAll('section')

section.forEach((button) => {
  button.addEventListener('click', handleClick);
})

function handleClick() {
  menuBtn.classList.remove('active');
  menu.classList.remove('active');
}

buttons.forEach((button) => {
  button.addEventListener('click', handleClick);
});

//console.log('1. 24\n2. 24\n3. 10\n4. 24')
// part 3 service

/*
serviceButtons.forEach((button) => {
  button.addEventListener('click', () => {
    button.classList.toggle('activeService')

    if (elem.matches('.activeService')) {
      imgGardens.forEach((img) => {
        img.classList.toggle('blur')
      }
      )
    } 

    if (elemLawn.matches('.activeService')) {
      imgLawn.classList.toggle('blur')
    }

    if (elemPlant.matches('.activeService')) {
      imgPlanting.forEach((img) => {
        img.classList.toggle('blur')
      }
      )
    }

  })
})
*/


const serviceButtons = document.querySelectorAll('.service_button')

const imgGardens = document.querySelectorAll('.itemGardens')
const imgLawn = document.querySelector('.itemLawn')
const imgPlanting = document.querySelectorAll('.itemPlanting')

var elem = document.querySelector("#gardens")
var elemLawn = document.querySelector('#lawn')
var elemPlant = document.querySelector('#planting')
/*
serviceButtons.forEach(() => {
  if (document.getElementsByClassName('activeService').length < 2)
  caps()
})
*/

//function caps() {
  
  serviceButtons[0].addEventListener('click', () => {
    if ((document.getElementsByClassName('activeService').length === 2) && (!serviceButtons[0].matches('.activeService'))) {
return false;
    }

  serviceButtons[0].classList.toggle('activeService')
  if (serviceButtons[1].matches('.activeService') || serviceButtons[2].matches('.activeService')) {
    imgGardens.forEach((img) => img.classList.toggle('blur'))
  } else {
    imgLawn.classList.toggle('blur')
    imgPlanting.forEach((img) => img.classList.toggle('blur'))
  }
})

serviceButtons[1].addEventListener('click', () => {
  if ((document.getElementsByClassName('activeService').length === 2) && (!serviceButtons[1].matches('.activeService'))) {
    return false;
        }

serviceButtons[1].classList.toggle('activeService')
if (serviceButtons[0].matches('.activeService') || serviceButtons[2].matches('.activeService')) {
  imgLawn.classList.toggle('blur')
} else {
  imgPlanting.forEach((img) => img.classList.toggle('blur'))
  imgGardens.forEach((img) => img.classList.toggle('blur'))
}
})

serviceButtons[2].addEventListener('click', () => {
  if ((document.getElementsByClassName('activeService').length === 2) && (!serviceButtons[2].matches('.activeService'))) {
    return false;
        }

serviceButtons[2].classList.toggle('activeService')
if (serviceButtons[0].matches('.activeService') || serviceButtons[1].matches('.activeService')) {
  imgPlanting.forEach((img) => img.classList.toggle('blur'))
} else {
  imgLawn.classList.toggle('blur')
  imgGardens.forEach((img) => img.classList.toggle('blur'))
}
})
//}
  

  


