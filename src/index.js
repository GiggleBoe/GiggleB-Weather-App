//let now = new Date();
//let day = now.getDay();
//let days = [
//  `Sunday`,
//  `Monday`,
//  `Tuesday`,
//  `Wednesday`,
//  `Thursday`,
//  `Friday`,
//  `Saturday`,
//  `Sunday`,
//  `Monday`,
//  `Tuesday`,
//  `Wednesday`,
//];
//let minutes = now.getMinutes();
//let hours = now.getHours();
//let date = now.getDate();

function showDayNTime(response) {
  let now = new Date(response.data.dt * 1000);
  let day = now.getDay();
  let days = [`Sun`, `Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat`];
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

//showDaysAhead();

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
  axios.get(apiURL).then(showIcon);
}

let dataTransfer = document.querySelector("#button");
dataTransfer.addEventListener("click", showCityName);
//dataTransfer.addEventListener("click", showDayNTime);
//dataTransfer.addEventListener("click", showDaysAhead);

function showTemperature(response) {
  realTemp = `${Math.round(response.data.main.temp)}`;

  let temp = document.querySelector("#temp");
  temp.innerHTML = realTemp;

  let chosenCity = document.querySelector("#city-choice");
  chosenCity.innerHTML = `${response.data.name}`;

  getForecast(response.data.coord);
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
  console.log(response.data.weather[0].icon);
}

function showIcon(response) {
  let realIcon = `${response.data.weather[0].icon}`;
  let icon = document.querySelector(".icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${realIcon}@2x.png`
  );

  let realAltText = `${response.data.weather[0].description}`;
  icon.setAttribute("alt", `${realAltText}`);
}

function showTemperatureC(event) {
  event.preventDefault();
  let tempValueC = document.querySelector("#temp");
  tempValueC.innerHTML = realTemp;
}
let cValue = document.querySelector("#celsius");
cValue.addEventListener("click", showTemperatureC);

function showTemperatureF(event) {
  event.preventDefault();
  let tempValueF = document.querySelector("#temp");
  tempValueF.innerHTML = Math.round((realTemp * 9) / 5 + 32);
}
let fValue = document.querySelector("#fahrenheit");
fValue.addEventListener("click", showTemperatureF);

let realTemp = null;

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
  axios.get(apiURL).then(showIcon);
}

navigator.geolocation.getCurrentPosition(showLatNLon);
showLatNLon();

//function showDefaultCity(event) {
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
axios.get(apiURL).then(showIcon);
//}

//let DefaultCity = document.querySelector(".city[*]");
//DefaultCity.addEventListener("click", showDefaultCity);
//dataTransfer.addEventListener("click", showDayNTime);
//dataTransfer.addEventListener("click", showDaysAhead);

//forecast
function buildForecast(response) {
  let forecast = document.querySelector("#forecast");
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-sm">
              <div class="weather-forecast-date">${day}</div>
              <div><img src="" alt="" /> ☁️🌧️</div>
              <div class="weather-forecast-temperatures">
                <span class="max-temperature">20°</span>
                <span class="min-temperature"> 10°</span>
              </div>
      </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
  console.log(response.data.daily);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "0a521eaf234a3a56f45252fac3c737ad";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(buildForecast);
}
