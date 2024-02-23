// calling all elements from document
const weatherElement = document.getElementById("weather");
const celBtn = document.getElementById("celBtn");
const fahrBtn = document.getElementById("fahrBtn");
const emoji = document.getElementById("emoji");
const time = document.getElementById("time");

//API URL parameters: London 1 day °C is_day
const url = "https://api.open-meteo.com/v1/forecast?latitude=51.5085&longitude=-0.1257&current=temperature_2m,is_day&forecast_days=1";

// Main function to retrieve and display current weather
async function getAndDisplayWeather() {
  const weatherObject = await retrieveWeather();
  displayWeather(weatherObject);
  dayOrNight(weatherObject);
  timeDisplay();
}

// Function to retrieve weather
async function retrieveWeather() {
  const response = await fetch(url,{
    headers:{
      Accept: "application/json"
    }
  });
  console.log(response);

  if(!response.ok){
    console.error(response.status);
    console.error(response.text());
  }
  const data = await response.json();
  // console.log(data.weather);
  console.log(data);
  return data;
  };

// Function to update the DOM with the current weather
function displayWeather(weather) {
  const currentTemp = weather.current.temperature_2m;
  weatherElement.textContent = currentTemp + "°C";
  return currentTemp;
};

// day function
function dayOrNight(weather) {
  const isDay = weather.current.is_day;
  console.log(isDay)
  if (isDay) {
    emoji.src = "cloud.png";
  } else {
    emoji.src = "night.png";
  };
};

// time display function
function timeDisplay() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  time.textContent = `${hours}:${minutes}`;
};


// conversion function 
async function toFahrenheit() {
   const weatherObject = await retrieveWeather();
   const tempF = Math.ceil((displayWeather(weatherObject)* 1.8) + 32);
   weatherElement.textContent =  tempF +"°F"; 
};




// Event listeners 
// Waits for the DOM to be fully loaded and then displays current weather.
document.addEventListener("DOMContentLoaded", getAndDisplayWeather);
// Sets up a click event listener for buttons
celBtn.addEventListener("click", getAndDisplayWeather);
fahrBtn.addEventListener("click", toFahrenheit);




