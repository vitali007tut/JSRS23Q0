let menuBtn = document.getElementById('img_burger');
let menu = document.querySelector('.nav');

menuBtn.addEventListener('click', function(){
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

  console.log('1. 24\n2. 24\n3. 10\n4. 24')