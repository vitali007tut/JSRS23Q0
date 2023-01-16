let menuBtn = document.getElementById('img_burger');
let menu = document.querySelector('.nav');

menuBtn.addEventListener('click', function(){
	menuBtn.classList.toggle('active');
	menu.classList.toggle('active');
})


const buttons = document.querySelectorAll('.link');

function handleClick() {
    menuBtn.classList.remove('active');
    menu.classList.remove('active');
  }

buttons.forEach((button) => {
    button.addEventListener('click', handleClick);
  });