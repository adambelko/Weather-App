import { getGeoCoord, getWeatherData } from "./apiFunctions";
import { unitType, getUnitType, toggleUnits } from "./unitTypes";

const eventListeners = () => {
    const searchBtn = document.querySelector(".main__form-search-btn");
    searchBtn.addEventListener("click", manageFormInput);

    const unitsBtn = document.querySelector(".main__form-units-btn");
    unitsBtn.addEventListener("click", toggleUnits);
};

let location = null;

// Take an input value and fetch weather data from API
const manageFormInput = async (e) => {
    e.preventDefault();
    const textInputValue = document.querySelector("#main__form-input");
    location = textInputValue.value;
    if (location === "") return;
    await getData(unitType);
};

// call API's and populate screen with the data
const getData = async (unitType) => {
    const geoCoord = await getGeoCoord(location, unitType);
    const weatherData = await getWeatherData(
        geoCoord.lat,
        geoCoord.lon,
        unitType
    );
    displayWeatherData(weatherData);
};

// Populate screen with data
const displayWeatherData = (data) => {
    resetWeatherData();
    newTextPara(data.location, "location");
    newTextPara(capFirstLetter(data.weather), "weather");
    newPara("", data.temp, getUnitType().temp, "temp");
    newPara("Feels like ", data.feelsLike, getUnitType().degree, "feels-like");
    newPara("Humidity: ", data.humidity, getUnitType().humidity, "humidity");
    newPara("Wind speed: ", data.windSpeed, getUnitType().speed, "wind-speed");
};

// Wipeout all data from the screen
const resetWeatherData = () => {
    const dataWrapper = document.querySelector(".main__data-wrapper");
    const weatherData = document.querySelectorAll(".weather-data");
    weatherData.forEach((data) => {
        dataWrapper.removeChild(data);
    });
};

// Create new paragraph, text only
const newTextPara = (data, className) => {
    const dataWrapper = document.querySelector(".main__data-wrapper");
    const p = document.createElement("p");
    p.classList.add(`main__data-wrapper-${className}`, "weather-data");
    p.textContent = data;
    dataWrapper.appendChild(p);
};

// Create new paragraph, text and integers
const newPara = (text, data, unit, className) => {
    const dataWrapper = document.querySelector(".main__data-wrapper");
    const p = document.createElement("p");
    p.classList.add(`main__data-wrapper-${className}`, "weather-data");
    p.textContent = text + roundNumber(data) + unit;
    dataWrapper.appendChild(p);
};

const roundNumber = (number) => number.toFixed(1);
const capFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);

eventListeners();

export { getData };
