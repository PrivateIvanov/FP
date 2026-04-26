// Конфигурация API
const API_CONFIG = {
  WEATHER: {
    API_KEY: "6a157a16aea74e6ea31140124251008",
    URL: "https://api.weatherapi.com/v1/current.json"
  }
};

// URL вашего API Gateway
const API_GATEWAY_URL = 'https://d5d4l3sqabqcaoirvus4.kf69zffa.apigw.yandexcloud.net/generate-phrase';



// DOM элементы
const elements = {
  screens: {
    character: document.getElementById('characterScreen'),
    weather: document.getElementById('weatherScreen')
  },
  character: {
    images: document.querySelectorAll('.characterImg'),
    selectedImg: document.getElementById('selectedCharacterImg'),
    name: document.getElementById('weatherPhrase')
  },
  weather: {
    input: document.getElementById('cityInput'),
    button: document.getElementById('getWeatherBtn'),
    backButton: document.getElementById('backButton'),
    city: document.getElementById('cityName'),
    temp: document.getElementById('temperature'),
    icon: document.getElementById('weatherIcon'),
    desc: document.getElementById('weatherDescription'),
    wind: document.getElementById('wind'),
    humidity: document.getElementById('humidity')
  }
};


// // Инициализация
// document.addEventListener('DOMContentLoaded', () => {
//   setupEventListeners();
// });

// Текущий персонаж
const currentCharacter = {
  type: 'fox',
  name: 'Лиса',
  img: 'img/Character2.jpg'
};




  // Кнопки
  elements.weather.backButton.addEventListener('click', goToMainPage);
  elements.weather.button.addEventListener('click', getWeather);
  elements.weather.input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') getWeather();
  });





// Получение погоды
async function getWeather() {
  const city = elements.weather.input.value.trim();
  if (!city) return;

  try {
    showLoading(true);
    
    // 1. Запрос к WeatherAPI
    const weatherData = await fetchWeather(city);
    updateWeatherUI(weatherData);
    
    // 2. Генерация ответа через API Gateway
    const gptResponse = await generateCharacterResponse(weatherData);
    elements.character.name.textContent = gptResponse;

  } catch (error) {
    elements.character.name.textContent = `Лиса не смогла узнать погоду: ${error.message}`;
    console.error('Ошибка:', error);
  } finally {
    showLoading(false);
  }
}

// Запрос к WeatherAPI
async function fetchWeather(city) {
  const response = await fetch(
    `${API_CONFIG.WEATHER.URL}?key=${API_CONFIG.WEATHER.API_KEY}&q=${city}&lang=ru`
  );
    console.log(response);
  if (!response.ok) throw new Error("Город не найден");
  const data = await response.json();
  console.log(data);
  
  return {
    city: data.location.name,
    temp: data.current.temp_c,
    condition: data.current.condition.text,
    wind: data.current.wind_kph,
    humidity: data.current.humidity,
    icon: data.current.condition.icon.replace("64x64", "128x128")
  };
}

// Генерация ответа персонажа через API Gateway
async function generateCharacterResponse(weather) {
  try {
    const response = await fetch(API_GATEWAY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        city: weather.city,
        weatherData: {
          temperature: weather.temp,
          description: weather.condition,
          wind: weather.wind,
          humidity: weather.humidity
        },
        character: currentCharacter.type
      })
    });

    if (!response.ok) {
      throw new Error(`Ошибка API: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.success) {
      return data.phrase;
    } else {
      throw new Error(data.error || 'Неизвестная ошибка');
    }

  } catch (error) {
    console.error('Ошибка GPT:', error);
    // Фолбэк ответ если GPT не работает
    return generateFallbackResponse(weather);
  }
}

// Фолбэк ответ если GPT недоступен
function generateFallbackResponse(weather) {
  const responses = {
    fox: `🦊 Лисье ушко подсказывает: в ${weather.city} сейчас ${weather.temp}°C и ${weather.condition.toLowerCase()}! Идеально для рыжей шубки!`,
    wolf: `🐺 Волчий вой сообщает: в ${weather.city} ${weather.temp}°C, ${weather.condition.toLowerCase()}! Отличная погода для охоты!`,
    panda: `🐱 Панда шепчет: в ${weather.city} тепло - ${weather.temp}°C и ${weather.condition.toLowerCase()}! Самое время для сна!`
  };
  
  return responses[currentCharacter.type] || `В ${weather.city} сейчас ${weather.temp}°C и ${weather.condition.toLowerCase()}!`;
}

// Обновление интерфейса
function updateWeatherUI(weather) {
  elements.weather.city.textContent = weather.city;
  elements.weather.temp.textContent = `${weather.temp}°C`;
  elements.weather.icon.src = `https:${weather.icon}`;
  elements.weather.desc.textContent = weather.condition;
  elements.weather.wind.textContent = `Ветер: ${weather.wind} км/ч`;
  elements.weather.humidity.textContent = `Влажность: ${weather.humidity}%`;
}

// Состояние загрузки
function showLoading(isLoading) {
  elements.weather.button.disabled = isLoading;
  elements.weather.button.textContent = isLoading ? "Загрузка..." : "Узнать погоду";
}

// Возврат на главный экран
function goToMainPage() {
window.location.href = 'index.html';
}