let now = new Date();
let day = now.getDay();
let days = [
  `Sunday`,
  `Monday`,
  `Tuesday`,
  `Wednesday`,
  `Thursday`,
  `Friday`,
  `Saturday`,
  `Sunday`,
  `Monday`,
  `Tuesday`,
  `Wednesday`,
];
let minutes = now.getMinutes();
let hours = now.getHours();
let date = now.getDate();

function showDayNTime(response) {
  let now = new Date(response.data.dt * 1000);
  let day = now.getDay();
  let days = [
    `Sun`,
    `Mon`,
    `Tue`,
    `Wed`,
    `Thu`,
    `Fri`,
    `Sat`,
    `Sun`,
    `Mon`,
    `Tue`,
    `Wed`,
  ];
  let minutes = now.getMinutes();
  let hours = now.getHours();
  let date = now.getDate();

  let dayNow = document.querySelector("#day-now");
  let minutesNow = document.querySelector("#minutes-now");
  let hoursNow = document.querySelector("#hours-now");

  if (date > 9) dayNow.innerHTML = `${days[day]} ${date},`;
  else dayNow.innerHTML = `${days[day]} 0${date},`;

  if (minutes > 9) minutesNow.innerHTML = `${minutes}`;
  else minutesNow.innerHTML = `0${minutes}`;

  if (hours < 10) hoursNow.innerHTML = `0${hours}`;
  else hoursNow.innerHTML = `${hours}`;
}

//function formatDayNTime() {
//  let dayNow = document.querySelector("#day-now");
//  let minutesNow = document.querySelector("#minutes-now");
//  let hoursNow = document.querySelector("#hours-now");

//  if (date > 9) dayNow.innerHTML = `${days[day]} ${date},`;
//  else dayNow.innerHTML = `${days[day]} 0${date},`;

//  if (minutes > 9) minutesNow.innerHTML = `${minutes}`;
//  else minutesNow.innerHTML = `0${minutes}`;

//  if (hours < 10) hoursNow.innerHTML = `0${hours}`;
//  else hoursNow.innerHTML = `${hours}`;
//}
//formatDayNTime();

function showDaysAhead() {
  let dayTomorrow = document.querySelector("#day-of-tomorrow");
  dayTomorrow.innerHTML = `${days[day + 1]}`;

  let dayTomorrow2 = document.querySelector("#day-of-tomorrowN1");
  dayTomorrow2.innerHTML = `${days[day + 2]}`;

  let dayTomorrow3 = document.querySelector("#day-of-tomorrowN2");
  dayTomorrow3.innerHTML = `${days[day + 3]}`;

  let dayTomorrow4 = document.querySelector("#day-of-tomorrowN3");
  dayTomorrow4.innerHTML = `${days[day + 4]}`;
}
showDaysAhead();

function showCityName(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let chosenCity = document.querySelector("#city-choice");

  if (cityInput.value.length <= 1) chosenCity.innerHTML = "Munich";
  else chosenCity.innerHTML = `${cityInput.value}`;

  let apiKey = "0a521eaf234a3a56f45252fac3c737ad";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${chosenCity.innerHTML}&appid=${apiKey}&units=metric`;

  axios.get(apiURL).then(showTemperature);
  axios.get(apiURL).then(showDescription);
  axios.get(apiURL).then(showHumidity);
  axios.get(apiURL).then(showWind);
  axios.get(apiURL).then(showDayNTime);
}

let dataTransfer = document.querySelector("#button");
dataTransfer.addEventListener("click", showCityName);
//dataTransfer.addEventListener("click", showDayNTime);
//dataTransfer.addEventListener("click", showDaysAhead);

function showTemperature(response) {
  let realTemp = `${Math.round(response.data.main.temp)}`;

  let temp = document.querySelector("#temp");
  temp.innerHTML = realTemp;

  let chosenCity = document.querySelector("#city-choice");
  chosenCity.innerHTML = `${response.data.name}`;
}

function showDescription(response) {
  let realDescription = `${response.data.weather[0].description}`;

  let descr = document.querySelector("#weather-descrpt");
  descr.innerHTML = realDescription;
}

function showHumidity(response) {
  let realHumidity = `${response.data.main.humidity}`;

  let humdity = document.querySelector("#humidity");
  humdity.innerHTML = `💧 ${realHumidity} %`;
}

function showWind(response) {
  let realWind = `${Math.round(response.data.wind.speed)}`;

  let wind = document.querySelector("#wind");
  wind.innerHTML = `💨 ${realWind} km/h`;
  console.log(response.data);
}

//function showTemperatureC(response) {
//  let realTemp = `${Math.round(response.data.main.temp)}`;

//  let temp = document.querySelector("#temp");
//  temp.innerHTML = realTemp;
//}

function showTemperatureC(event) {
  event.preventDefault();
}
let cValue = document.querySelector("#celsius");
cValue.addEventListener("click", showTemperatureC);

function showTemperatureF(event) {
  event.preventDefault();
  let tempValueF = document.querySelector("#temp");

  tempValueF.innerHTML = 66;
}

let fValue = document.querySelector("#fahrenheit");
fValue.addEventListener("click", showTemperatureF);

function showLatNLon(position) {
  let lat = `${position.coords.latitude}`;
  let lon = `${position.coords.longitude}`;
  let apiKey = "0a521eaf234a3a56f45252fac3c737ad";

  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showTemperature);
  axios.get(apiURL).then(showDescription);
  axios.get(apiURL).then(showHumidity);
  axios.get(apiURL).then(showWind);
  axios.get(apiURL).then(showDayNTime);
}

navigator.geolocation.getCurrentPosition(showLatNLon);
showLatNLon();

function showDefaultCity(event) {
  event.preventDefault();
  let defaultCity = document.querySelector("#weather[cityName]");
  let chosenCity = document.querySelector("#city-choice");

  chosenCity.innerHTML = `${defaultCity.value}`;

  let apiKey = "0a521eaf234a3a56f45252fac3c737ad";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${chosenCity.innerHTML}&appid=${apiKey}&units=metric`;

  axios.get(apiURL).then(showTemperature);
  axios.get(apiURL).then(showDescription);
  axios.get(apiURL).then(showHumidity);
  axios.get(apiURL).then(showWind);
  axios.get(apiURL).then(showDayNTime);
}

//let DefaultCity = document.querySelector(".city[*]");
//DefaultCity.addEventListener("click", showDefaultCity);
//dataTransfer.addEventListener("click", showDayNTime);
//dataTransfer.addEventListener("click", showDaysAhead);

let weather = {
  London: {
    descr: city1,
    temep: 19.7,
    humidity: 80,
  },
  Munich: {
    descr: city2,
    temep: 17.3,
    humidity: 50,
  },
  Sofia: {
    descr: city3,
    temep: 30.2,
    humidity: 20,
  },
  Tehran: {
    descr: city4,
    temep: 20.9,
    humidity: 100,
  },
  Kathmandu: {
    descr: city5,
    temep: -5,
    humidity: 20,
  },
  Bangkok: {
    descr: city6,
    temep: 30.2,
    humidity: 20,
  },
  "Hong Kong": {
    descr: city7,
    temep: 20.9,
    humidity: 100,
  },
  Tokyo: {
    descr: city8,
    temep: -5,
    humidity: 20,
  },
};

//if (weather[cityName] == undefined) {
//  alert(
//    `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${cityName}`
//  );
//} else {
//  weather[cityName].tempF = (weather[cityName].temep * 9) / 5 + 32;
//
//  weather[cityName].temep = Math.round(weather[cityName].temep);
//
//  weather[cityName].tempF = Math.round(weather[cityName].tempF);
//  alert(
//    `It is currently ${weather[cityName].temep}°C (${weather[cityName].tempF}°F) in ${cityName} with a humidity of ${weather[cityName].humidity}%`
//  );
//}
let defaultData = document.querySelector("#weather[cityName]");
defaultData.addEventListener("click", showDefaultCity);
