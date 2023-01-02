const callGeoCoord = async (location) => {
    try {
        const response = await fetch(
            `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=27424b54a6ab420d52712155ee6a6ff1`,
            { mode: "cors" }
        );
        const responseData = await response.json();
        const lat = responseData[0].lat;
        const lon = responseData[0].lon;
        callWeatherData(lat, lon);
    } catch (error) {
        console.log(error);
    }
};

const callWeatherData = async (lat, lon) => {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=27424b54a6ab420d52712155ee6a6ff1`,
        { mode: "cors" }
    );
    const responseData = await response.json();
    console.log(responseData);
};

callGeoCoord("Sydney");
