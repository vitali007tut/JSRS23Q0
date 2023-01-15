const ButtonBurger = document.getElementById('img_burger');
const NAV = document.getElementsByClassName("nav");
const att = document.createAttribute("nav");

ButtonBurger.addEventListener('click', (event) => {

    event.target.classList.add('active');
    
    //att.value = 'display: block';
    //NAV.classList.classList.add;
})
