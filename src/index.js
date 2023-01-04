import { getGeoCoord, getWeatherData } from "./apiFunctions";

const eventListeners = () => {
    const submitBtn = document.querySelector(".submit-btn");
    submitBtn.addEventListener("click", processInput);
};

const processInput = async (e) => {
    e.preventDefault();
    const location = document.querySelector("#location").value;
    const geoCoord = await getGeoCoord(location);
    const weatherData = await getWeatherData(geoCoord.lat, geoCoord.lon);
    console.log(weatherData.temp);
    // other weather data
};

eventListeners();
