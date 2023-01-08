// Calling an API and returning geo coordinates, latitude & longitude
const getGeoCoord = async (location, unitType) => {
    try {
        const response = await fetch(
            `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=27424b54a6ab420d52712155ee6a6ff1`
        );
        const responseData = await response.json();
        const lat = responseData[0].lat;
        const lon = responseData[0].lon;
        return { lat, lon, unitType };
    } catch (error) {
        return console.log(error);
    }
};

// Once we know our geo coordinates, we can fetch current weather data
const getWeatherData = async (lat, lon, unitType) => {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=27424b54a6ab420d52712155ee6a6ff1&units=${unitType}`
        );
        const responseData = await response.json();
        console.log(responseData);

        const location = responseData.name;
        const weather = responseData.weather[0].description;
        const temp = responseData.main.temp;
        const feelsLike = responseData.main.feels_like;
        const humidity = responseData.main.humidity;
        const windSpeed = responseData.wind.speed;

        return {
            location,
            weather,
            temp,
            feelsLike,
            humidity,
            windSpeed,
        };
    } catch (error) {
        return console.log(error);
    }
};

export { getGeoCoord, getWeatherData };
