'use strict';

// Open Weather API
// https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

//MY API key
//5a34db917decb8574739070c5f13697f

// Geolocation API
// http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}

const form = document.querySelector('.form');
const container = document.querySelector('.container');
const loading = document.querySelector('.loading');

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// feels_like: 268.62
// humidity: 92
// pressure: 1006
// temp: 272.71
// temp_max: 275.03
// temp_min: 270.32

const displayData = function (weatherData) {
  let weatherIcon;
  container.style.opacity = 1;
  if (weatherData.weather[0].main === 'Clouds') weatherIcon = '☁️';
  if (weatherData.weather[0].main === 'Clear') weatherIcon = '☀️';
  if (weatherData.weather[0].main === 'Snow') weatherIcon = '❄️';
  const html = `
  <div class="currentTemp">🌡️Current Temperature: ${weatherData.main.temp}°C</div>
  <div class="weather">${weatherIcon} ${weatherData.weather[0].main}</div>
  <div class="weather">Description: ${weatherData.weather[0].description}</div>
  </div>`;

  container.insertAdjacentHTML('beforeend', html);
};

// Gets weather data from the Open Weather API
const weather = async function (lat, lng) {
  const whereAmI = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=5a34db917decb8574739070c5f13697f`
  );
  const weatherData = await whereAmI.json();
  loading.classList.remove('visible');
  console.log(weatherData);
  console.log(weatherData.name);
  displayData(weatherData);
};
// test();

// Event listener to get users desired location
form.addEventListener('submit', e => {
  e.preventDefault();
  const inputLocation = document.getElementById('city').value;
  document.getElementById('city').value = '';
  getUserLocation(inputLocation);
});

// gets users latitude and longitude using the Geolocation API and passes it to the weather API
const getUserLocation = async function (city) {
  try {
    loading.classList.add('visible');
    const inputTest = await fetch(
      `https://geocode.xyz/${city}?json=1&auth=346201838981604841666x100650`
    );
    const inputTest2 = await inputTest.json();
    console.log(inputTest2.standard);
    const html = ` <div class="cityName"><h2>${inputTest2.standard.city}, ${inputTest2.standard.countryname}</h2></div>`;
    container.innerHTML = '';
    container.insertAdjacentHTML('beforeend', html);
    weather(inputTest2.latt, inputTest2.longt);
  } catch (err) {
    alert('Sorry, cannot find a city with that name!');
  }
};
