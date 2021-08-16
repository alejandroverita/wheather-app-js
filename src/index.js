

const API_KEY = "2c1e4fd3931115a22ba808fcbd3608db";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?q="

const getData = (city) => {
  const url = `${baseUrl}${city}&appid=${API_KEY}`;

  return fetch(url)
         .then((data) => data.json());
}



//Agrega el ENTER
document.addEventListener("keyup", (event) => {
    if (event.code === "Enter") {
        getWeatherInfo();
    }
});


const getWeatherInfo = () =>{
    const container = document.getElementById("container");
    const input = document.getElementById("input");
    
    getData(input.value)
    .then((data) => {
        container.innerHTML = template(data);
    })
    .catch(() => {
        container.innerHTML = 'City not found'
    })
}

const button = document.getElementById("button");
button.addEventListener("click", getWeatherInfo)


const template = (data) =>{
    return `
      <div class="weather-cards-container">
        <div class="cards">
          <h3 class="city">${data.name}</h3>
          <span class ="temperature">${kelvinToCelsius(data.main.temp_max)}°/${kelvinToCelsius(data.main.temp_min)}°</span>
          <img class="weather-image" src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="partly_cloudy">
          <span>Climate: ${data.weather[0].description}</span>
          <span>Maximum temperature: ${kelvinToCelsius(data.main.temp_max)}°</span>
          <span>Feels like: ${kelvinToCelsius(data.main.feels_like)}°</span>
          <span>Humidity: ${data.main.humidity}%</span>
          </div>
      </div>
    `;
}

let kelvinToCelsius = (kelvinValue) => Math.floor(kelvinValue - 273);
// kelvinToCelsius(297);