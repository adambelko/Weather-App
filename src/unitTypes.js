import { getData } from ".";

let unitType = "metric";

const getUnitType = () => {
    if (unitType === "metric") {
        return { temp: "°C", degree: "°", speed: " kmh", humidity: "%" };
    } else {
        return { temp: "°F", degree: "°", speed: " mph", humidity: "%" };
    }
};

// Make new API calls if/when user wants to see the data in another unitType
const toggleUnits = async (e) => {
    e.preventDefault();

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

// Change boldness of a text on toggle units button
const toggleBoldText = () => {
    const boldMetric = document.querySelector(".metric-units");
    const boldImperial = document.querySelector(".imperial-units");
    boldMetric.classList.toggle("metric-units--active");
    boldImperial.classList.toggle("imperial-units--active");
};

export { unitType, getUnitType, toggleUnits };
