
// URL вашего API Gateway
const ORACLE_API_URL = 'https://d5d4l3sqabqcaoirvus4.kf69zffa.apigw.yandexcloud.net/make-prediction';



// DOM элементы
const elements = {
  screens: {
    character: document.getElementById('characterScreen'),
  },
  character: {
    images: document.querySelectorAll('.characterImg'),
    selectedImg: document.getElementById('selectedCharacterImg'),
    phrase: document.getElementById('predictionPhrase')
  },
  buttons: {
        buttonOracle: document.getElementById('buttonOracle'),
        backButton: document.getElementById('backButton'),
  },
  rays: {
    ray1: document.getElementById('ray1'),
    ray2: document.getElementById('ray2'),
    ray3: document.getElementById('ray3')
  }
};


const currentCharacter = {
  type: 'dragon',
  name: 'Дракон',
  img: 'img/CharacterDragon.jpg'
};



  elements.buttons.backButton.addEventListener('click', goToMainPage);
  elements.buttons.buttonOracle.addEventListener('click', getPrediction);


// Генерация ответа персонажа через API Gateway

async function getPrediction() {
  startRays();
  try {
    const response = await fetch(ORACLE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
      character: currentCharacter.type
      })
    });

    if (!response.ok) {
      throw new Error(`Ошибка API: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.success) {
    elements.character.phrase.textContent =  data.phrase;
    } else {
      throw new Error(data.error || 'Неизвестная ошибка');
    }

  } catch (error) {
    console.error('Ошибка GPT:', error);
    // Фолбэк ответ если GPT не работает
    return "Я сломался";
  } finally {
    completeRays();   // в любом случае (успех или ошибка) лучи выключаются
  }
}





  // Возврат на главный экран
function goToMainPage() {
window.location.href = 'index.html';
}


// Функция Лучей

let rayInterval = null;

function startRays() {
  // Сбрасываем лучи (очищаем интервал, скрываем)
  stopRays();
  
  // Устанавливаем фоновые изображения (если не заданы в CSS)
  if (elements.rays.ray1) elements.rays.ray1.style.backgroundImage = 'url("img/loadingGreenRay1.png")';
  if (elements.rays.ray2) elements.rays.ray2.style.backgroundImage = 'url("img/loadingGreenRay2.png")';
  if (elements.rays.ray3) elements.rays.ray3.style.backgroundImage = 'url("img/loadingGreenRay3.png")';
  
  let current = 0;
  const rays = [elements.rays.ray1, elements.rays.ray2, elements.rays.ray3];
  
  // Показываем первый луч
  if (rays[0]) rays[0].style.opacity = '1';
  
  // Запускаем циклическое переключение (каждые 400 мс)
  rayInterval = setInterval(() => {
    if (rays[current]) rays[current].style.opacity = '0';
    current = (current + 1) % rays.length;
    if (rays[current]) rays[current].style.opacity = '1';
  }, 400);
}

function stopRays() {
  if (rayInterval) {
    clearInterval(rayInterval);
    rayInterval = null;
  }
  const rays = [elements.rays.ray1, elements.rays.ray2, elements.rays.ray3];
  rays.forEach(ray => {
    if (ray) ray.style.opacity = '0';
  });
}

function completeRays() {
  // Останавливаем мигание
  if (rayInterval) {
    clearInterval(rayInterval);
    rayInterval = null;
  }
  // Включаем все лучи одновременно
  const rays = [elements.rays.ray1, elements.rays.ray2, elements.rays.ray3];
  rays.forEach(ray => {
    if (ray) ray.style.opacity = '1';
  });
}