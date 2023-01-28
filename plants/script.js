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

const serviceButtons = document.querySelectorAll('.service_button')
const imgGardens = document.querySelectorAll('.itemGardens')
const imgLawn = document.querySelector('.itemLawn')
const imgPlanting = document.querySelectorAll('.itemPlanting')

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

// part 3 prices 

var acc = document.getElementsByClassName("prices_dropdown");
var i;
for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {

    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      document.querySelectorAll('.openedPrice').forEach((el) => el.style.maxHeight = null)
      document.querySelectorAll('.prices_dropdown').forEach((el) => el.classList.remove('openedTitle'))
    } else {
      document.querySelectorAll('.openedPrice').forEach((el) => el.style.maxHeight = null)
      document.querySelectorAll('.prices_dropdown').forEach((el) => el.classList.remove('openedTitle'))
      this.classList.add('openedTitle')
      panel.style.maxHeight = 110 +'px'
    }
  })
}

// part 3 -- contacts 

const buttonCity = document.querySelector('.dropbtn')
const selectItem = document.querySelectorAll('.select_item')

buttonCity.addEventListener('click', () => {
  buttonCity.classList.toggle('openedCity')
  buttonCity.parentElement.classList.toggle('isActive')
  //document.querySelector('.dropdown').classList.toggle('isActive')
}
)

selectItem.forEach(item => item.addEventListener('click', selectChoose))

function selectChoose() {
let text = this.innerText;
currentText = this.closest('.dropdown').querySelector('.dropbtn')
currentText.innerText = text
this.closest('.dropdown').classList.remove('isActive')
}


