import { getGeoCoord, getWeatherData } from "./apiFunctions";

const eventListeners = () => {
    const searchBtn = document.querySelector(".main__form-search-btn");
    searchBtn.addEventListener("click", manageFormInput);

    const unitsBtn = document.querySelector(".main__form-units-btn");
    unitsBtn.addEventListener("click", toggleUnits);
};

// Global variables
let location = null;
let units = "metric";

// Take an input value and fetch weather data from API
const manageFormInput = async (e) => {
    e.preventDefault();
    const textInputValue = document.querySelector("#main__form-input");
    location = textInputValue.value;
    console.log(location);
    await getData(units);
};

const getData = async (units) => {
    const geoCoord = await getGeoCoord(location, units);
    const weatherData = await getWeatherData(geoCoord.lat, geoCoord.lon, units);
    displayWeatherData(weatherData);
};

// Render data on a page
const displayWeatherData = (data) => {
    resetWeatherData();
    const dataWrapper = document.querySelector(".main__data-container");
    createParagraph("Temp: ", data.temp);
    createParagraph("Wind speed: ", data.windSpeed);
};

const resetWeatherData = () => {
    const dataWrapper = document.querySelector(".main__data-container");
    const weatherData = document.querySelectorAll(".weather-data");
    weatherData.forEach((data) => {
        dataWrapper.removeChild(data);
    });
};

// Make API calls if user wants to see the data in another units
const toggleUnits = async (e) => {
    e.preventDefault();
    console.log(location);

    if (location === null && units === "metric") {
        toggleBoldText();
        units = "imperial";
    } else if (location === null && units === "imperial") {
        toggleBoldText();
        units = "metric";
    } else if (units === "metric") {
        units = "imperial";
        await getData(units);
    } else {
        toggleBoldText();
        units = "metric";
        await getData(units);
    }
};

// Change boldness of a text on toggle units button
const toggleBoldText = () => {
    const boldMetric = document.querySelector(".metric-units");
    const boldImperial = document.querySelector(".imperial-units");
    boldMetric.classList.toggle("metric-units--active");
    boldImperial.classList.toggle("imperial-units--active");
};

const createParagraph = (text, data) => {
    const dataWrapper = document.querySelector(".main__data-container");
    const p = document.createElement("p");
    p.classList.add("weather-data");
    p.textContent = text + data;
    return dataWrapper.appendChild(p);
};

eventListeners();
