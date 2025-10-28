const menu = document.querySelector('.menu');
const characterChooseWeather = document.querySelector('.characterChooseWeather');
const button = {
button1: document.getElementById('button1'),
button2: document.getElementById('button2'),
button3: document.getElementById('button3'),
};


// Выбор страниц
function goToWolfPage() {
window.location.href = 'wolfPage.html';
}

function goToFoxPage() {
window.location.href = 'foxPage.html';
}

function goToPandaPage() {
window.location.href = 'pandaPage.html';
}

// Кнопки меню

button1.addEventListener('click', function() { 
menu.classList.add('moved-left');
button.button1.style.paddingRight = '165px';
button.button2.style.paddingRight = '42px';
button.button3.style.paddingRight = '165px';


    setTimeout(() => {
        characterChooseWeather.style.opacity = '1';
        characterChooseWeather.style.pointerEvents = 'auto';
        characterChooseWeather.style.transition = 'opacity 1.5s ease-in-out'; 
    }, 2000 )});
