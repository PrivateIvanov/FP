
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
  }
};


const currentCharacter = {
  type: 'rabbit',
  name: 'Зайчиха',
  img: 'img/CharacterRabbit.jpg'
};



  elements.buttons.backButton.addEventListener('click', goToMainPage);
  elements.buttons.buttonOracle.addEventListener('click', getPrediction);


// Генерация ответа персонажа через API Gateway

async function getPrediction() {
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
  }
}





  // Возврат на главный экран
function goToMainPage() {
window.location.href = 'index.html';
}