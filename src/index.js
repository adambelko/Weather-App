import { getGeoCoord, getWeatherData } from "./apiFunctions";

const eventListeners = () => {
    const searchBtn = document.querySelector(".main__form-search-btn");
    searchBtn.addEventListener("click", manageFormInput);

    const unitsBtn = document.querySelector(".main__form-units-btn");
    unitsBtn.addEventListener("click", toggleUnits);
};

// Global variables
let location = null;
let unitType = "metric";

const getUnitType = () => {
    if (unitType === "metric") {
        return { temp: " °C", speed: " kmh" };
    } else {
        return { temp: " °F", speed: " mph" };
    }
};

// Take an input value and fetch weather data from API
const manageFormInput = async (e) => {
    e.preventDefault();
    const textInputValue = document.querySelector("#main__form-input");
    location = textInputValue.value;
    console.log(location);
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
    const dataWrapper = document.querySelector(".main__data-container");
    createParagraph("Temp: ", data.temp, getUnitType().temp);
    createParagraph("Wind speed: ", data.windSpeed, getUnitType().speed);
};

// Wipeout all data from the screen
const resetWeatherData = () => {
    const dataWrapper = document.querySelector(".main__data-container");
    const weatherData = document.querySelectorAll(".weather-data");
    weatherData.forEach((data) => {
        dataWrapper.removeChild(data);
    });
};

// Make API calls if user wants to see the data in another unitType
const toggleUnits = async (e) => {
    e.preventDefault();
    console.log(location);

    if (location === null && unitType === "metric") {
        toggleBoldText();
        unitType = "imperial";
    } else if (location === null && unitType === "imperial") {
        toggleBoldText();
        unitType = "metric";
    } else if (unitType === "metric") {
        toggleBoldText();
        unitType = "imperial";
        await getData(unitType);
    } else {
        toggleBoldText();
        unitType = "metric";
        await getData(unitType);
    }
};

const roundNumber = (number) => number.toFixed(1);

// Change boldness of a text on toggle units button
const toggleBoldText = () => {
    console.log("here");
    const boldMetric = document.querySelector(".metric-units");
    const boldImperial = document.querySelector(".imperial-units");
    boldMetric.classList.toggle("metric-units--active");
    boldImperial.classList.toggle("imperial-units--active");
};

const createParagraph = (text, data, unit) => {
    const dataWrapper = document.querySelector(".main__data-container");
    const p = document.createElement("p");
    p.classList.add("weather-data");
    p.textContent = text + roundNumber(data) + unit;
    return dataWrapper.appendChild(p);
};

eventListeners();
