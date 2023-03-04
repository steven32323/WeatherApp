'use strict';

// Open Weather API
// https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

//MY API key
//5a34db917decb8574739070c5f13697f

// Geolocation API
// http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}

const form = document.querySelector('.form');

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// Gets weather data from the Open Weather API
const weather = async function (lat, lng) {
  const pos = await getPosition();
  //   const { latitude: lat, longitude: lng } = pos.coords;
  console.log(pos);
  const whereAmI = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=5a34db917decb8574739070c5f13697f`
  );
  const weatherData = await whereAmI.json();
  console.log(weatherData.main);
};
// test();

// Event listener to get users desired location
form.addEventListener('submit', e => {
  e.preventDefault();
  const inputLocation = document.getElementById('city').value;
  getUserLocation(inputLocation);
});

// gets users latitude and longitude using the Geolocation API and passes it to the weather API
const getUserLocation = async function (city) {
  const inputTest = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=5a34db917decb8574739070c5f13697f`
  );
  const inputTest2 = await inputTest.json();
  weather(inputTest2[0].lat, inputTest2[0].lon);
};
