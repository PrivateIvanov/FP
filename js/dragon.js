
// URL вашего API Gateway
const API_GATEWAY_URL = 'https://d5d4l3sqabqcaoirvus4.kf69zffa.apigw.yandexcloud.net/generate-phrase';



// DOM элементы
const elements = {
  screens: {
    character: document.getElementById('characterScreen'),
  },
  character: {
    images: document.querySelectorAll('.characterImg'),
    selectedImg: document.getElementById('selectedCharacterImg'),

  },
  buttons: {
        button1: document.getElementById('buttonOracle1'),
  }
};


const currentCharacter = {
  type: 'dragon',
  name: 'Дракон',
  img: 'img/CharacterDragon.jpg'
};
