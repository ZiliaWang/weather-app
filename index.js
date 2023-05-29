const apiKey = "a77fb4aec62153fa6494d7b074b65585";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const timeOutput = document.querySelector("[data-id='time']");
const dateOutput = document.querySelector("[data-id='date']");

async function cheakWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".weather").style.display = "none";
    document.querySelector(".error").style.display = "block";
  } else {
    var data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/clouds.png";
      document.body.style.backgroundImage = "url('images/clouds-bg.jpg')";
      //document.body.style.backgroundSize = "100% 120%";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/clear.png";
      document.body.style.backgroundImage = "url('images/clear-bg.jpg')";
      //document.body.style.backgroundSize = "100% 120%";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/rain.png";
      document.body.style.backgroundImage = "url('images/rain-bg.jpg')";
      //document.body.style.backgroundSize = "100% 120%";
    } else if (data.weather[0] == "Snow") {
      weatherIcon.src = "images/snow.png";
      document.body.style.backgroundImage = "url('images/snow-bg.jpg')";
      //document.body.style.backgroundSize = "100% 120%";
    } else if (data.weather[0] == "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
      document.body.style.backgroundImage = "url('images/drizzle-bg.jpg')";
      //document.body.style.backgroundSize = "100% 120%";
    } else if (data.weather[0] == "Mist") {
      weatherIcon.src = "images/mist.png";
      document.body.style.backgroundImage = "url('images/mist-bg.jpg')";
      //document.body.style.backgroundSize = "100% 120%";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }

  console.log(data);

  const date = new Date();
  const browserTimezoneInSeconds = date.getTimezoneOffset() * 60;
  const dataTimezoneInSeconds = data.timezone;
  const dataTimezoneOffsetFromBrowserInSeconds =
    dataTimezoneInSeconds + browserTimezoneInSeconds;
  const dataDateSeconds =
    date.getSeconds() + dataTimezoneOffsetFromBrowserInSeconds;
  const dataDate = new Date();
  dataDate.setSeconds(dataDateSeconds);

  dateOutput.innerHTML = dataDate.toDateString();
  timeOutput.innerHTML = dataDate.toLocaleTimeString(undefined, {
    timeStyle: "short",
  });

  console.log(dateOutput);
  console.log(timeOutput);
}

searchBtn.addEventListener("click", () => {
  cheakWeather(searchBox.value);
});

function clickPress(event) {
  if (event.keyCode == 13) {
    cheakWeather(searchBox.value);
  }
}
