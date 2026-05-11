const menu = document.querySelector('.menu');
const characterChooseWeather = document.querySelector('.characterChooseWeather');
const characterChooseOracle = document.querySelector('.characterChooseOracle');
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
function goToDragonPage() {
window.location.href = 'dragonPage.html'; 
}

// Кнопки меню

button1.addEventListener('click', function() { 
menu.classList.add('moved-left');
button.button1.style.paddingRight = '186px';
button.button2.style.paddingRight = '42px';
button.button3.style.paddingRight = '209px';
button.button1.classList.add('activeButton1');
button.button2.classList.remove('activeButton2');


    setTimeout(() => {
        characterChooseWeather.style.opacity = '1';
        characterChooseWeather.style.pointerEvents = 'auto';
        characterChooseWeather.style.transition = 'opacity 1s ease-in-out'; 
        characterChooseOracle.style.opacity = '0';
        characterChooseOracle.style.pointerEvents = 'none';
        characterChooseOracle.style.transition = 'opacity 1s ease-in-out'; 
    }, 700 )});

button2.addEventListener('click', function() { 
menu.classList.add('moved-left');
button.button1.style.paddingRight = '186px';
button.button2.style.paddingRight = '42px';
button.button3.style.paddingRight = '209px';
button.button2.classList.add('activeButton2');
button.button1.classList.remove('activeButton1');


    setTimeout(() => {
        characterChooseOracle.style.opacity = '1';
        characterChooseOracle.style.pointerEvents = 'auto';
        characterChooseOracle.style.transition = 'opacity 1s ease-in-out'; 
    }, 700 )});


    // Rays
    const wolfCard = document.querySelector('.characterImg[data-character="wolf"]');
    const blueRay = document.getElementById('blue-ray');

wolfCard.addEventListener('mouseenter', () => {
  blueRay.style.backgroundImage = 'url("img/patternBlue7395fa.png")';
  blueRay.style.opacity = '1';
});
wolfCard.addEventListener('mouseleave', () => {
  blueRay.style.opacity = '0';
});

const foxCard = document.querySelector('.characterImg[data-character="fox"]');
const orangeRay = document.getElementById('orange-ray');

foxCard.addEventListener('mouseenter', () => {
  orangeRay.style.backgroundImage = 'url("img/patternOrangeec7c12.png")';
  orangeRay.style.opacity = '1';
});
foxCard.addEventListener('mouseleave', () => {
  orangeRay.style.opacity = '0';
});

const pandaCard = document.querySelector('.characterImg[data-character="panda"]');
const lightblueRay = document.getElementById('lightblue-ray');

pandaCard.addEventListener('mouseenter', () => {
  lightblueRay.style.backgroundImage = 'url("img/patternLightBlue21ebf1.png")';
  lightblueRay.style.opacity = '1';
});
pandaCard.addEventListener('mouseleave', () => {
  lightblueRay.style.opacity = '0';
});