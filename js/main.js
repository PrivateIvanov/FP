const menu = document.querySelector('.menu');
const characterChooseWeather = document.querySelector('.characterChooseWeather');
const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');
const button3 = document.getElementById('button3');



// Выбор страницы Волка
function goToWolfPage() {
window.location.href = 'wolfPage.html';
}

// Кнопки меню

button1.addEventListener('click', function() { 
menu.style.opacity = '0';
menu.style.pointerEvents = 'none';
menu.style.transition = 'opacity 0.3 ease';


    setTimeout(() => {
        characterChooseWeather.style.opacity = '1';
        characterChooseWeather.style.pointerEvents = 'auto';
    }, 30 )});
