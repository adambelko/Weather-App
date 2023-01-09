/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/apiFunctions.js":
/*!*****************************!*\
  !*** ./src/apiFunctions.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getGeoCoord\": () => (/* binding */ getGeoCoord),\n/* harmony export */   \"getWeatherData\": () => (/* binding */ getWeatherData)\n/* harmony export */ });\n// Calling an API and returning geo coordinates, latitude & longitude\nconst getGeoCoord = async (location, unitType) => {\n    try {\n        const response = await fetch(\n            `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=27424b54a6ab420d52712155ee6a6ff1`,\n            { mode: \"cors\" }\n        );\n\n        const responseData = await response.json();\n        const lat = responseData[0].lat;\n        const lon = responseData[0].lon;\n\n        return { lat, lon, unitType };\n    } catch (error) {\n        return console.log(error);\n    }\n};\n\n// Once we know our geo coordinates, we can fetch current weather data\nconst getWeatherData = async (lat, lon, unitType) => {\n    try {\n        const response = await fetch(\n            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=27424b54a6ab420d52712155ee6a6ff1&units=${unitType}`,\n            { mode: \"cors\" }\n        );\n\n        const responseData = await response.json();\n        const location = responseData.name;\n        const weather = responseData.weather[0].description;\n        const temp = responseData.main.temp;\n        const feelsLike = responseData.main.feels_like;\n        const humidity = responseData.main.humidity;\n        const windSpeed = responseData.wind.speed;\n\n        return {\n            location,\n            weather,\n            temp,\n            feelsLike,\n            humidity,\n            windSpeed,\n        };\n    } catch (error) {\n        return console.log(error);\n    }\n};\n\n\n\n\n//# sourceURL=webpack://weather-app/./src/apiFunctions.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getData\": () => (/* binding */ getData)\n/* harmony export */ });\n/* harmony import */ var _apiFunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./apiFunctions */ \"./src/apiFunctions.js\");\n/* harmony import */ var _unitTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./unitTypes */ \"./src/unitTypes.js\");\n\n\n\nconst eventListeners = () => {\n    const searchBtn = document.querySelector(\".main__form-search-btn\");\n    searchBtn.addEventListener(\"click\", manageFormInput);\n\n    const unitsBtn = document.querySelector(\".main__form-units-btn\");\n    unitsBtn.addEventListener(\"click\", _unitTypes__WEBPACK_IMPORTED_MODULE_1__.toggleUnits);\n};\n\nlet location = null;\n\n// Take an input value and fetch weather data from API\nconst manageFormInput = async (e) => {\n    e.preventDefault();\n    const textInputValue = document.querySelector(\"#main__form-input\");\n    location = textInputValue.value;\n    if (location === \"\") return;\n    await getData(_unitTypes__WEBPACK_IMPORTED_MODULE_1__.unitType);\n};\n\n// call API's and populate screen with the data\nconst getData = async (unitType) => {\n    const geoCoord = await (0,_apiFunctions__WEBPACK_IMPORTED_MODULE_0__.getGeoCoord)(location, unitType);\n    const weatherData = await (0,_apiFunctions__WEBPACK_IMPORTED_MODULE_0__.getWeatherData)(\n        geoCoord.lat,\n        geoCoord.lon,\n        unitType\n    );\n    displayWeatherData(weatherData);\n};\n\n// Populate screen with data\nconst displayWeatherData = (data) => {\n    resetWeatherData();\n    newTextPara(data.location, \"location\");\n    newTextPara(capFirstLetter(data.weather), \"weather\");\n    newPara(\"\", data.temp, (0,_unitTypes__WEBPACK_IMPORTED_MODULE_1__.getUnitType)().temp, \"temp\");\n    newPara(\"Feels like \", data.feelsLike, (0,_unitTypes__WEBPACK_IMPORTED_MODULE_1__.getUnitType)().degree, \"feels-like\");\n    newPara(\"Humidity: \", data.humidity, (0,_unitTypes__WEBPACK_IMPORTED_MODULE_1__.getUnitType)().humidity, \"humidity\");\n    newPara(\"Wind speed: \", data.windSpeed, (0,_unitTypes__WEBPACK_IMPORTED_MODULE_1__.getUnitType)().speed, \"wind-speed\");\n};\n\n// Wipeout all data from the screen\nconst resetWeatherData = () => {\n    const dataWrapper = document.querySelector(\".main__data-wrapper\");\n    const weatherData = document.querySelectorAll(\".weather-data\");\n    weatherData.forEach((data) => {\n        dataWrapper.removeChild(data);\n    });\n};\n\n// Create new paragraph, text only\nconst newTextPara = (data, className) => {\n    const dataWrapper = document.querySelector(\".main__data-wrapper\");\n    const p = document.createElement(\"p\");\n    p.classList.add(`main__data-wrapper-${className}`, \"weather-data\");\n    p.textContent = data;\n    dataWrapper.appendChild(p);\n};\n\n// Create new paragraph, text and integers\nconst newPara = (text, data, unit, className) => {\n    const dataWrapper = document.querySelector(\".main__data-wrapper\");\n    const p = document.createElement(\"p\");\n    p.classList.add(`main__data-wrapper-${className}`, \"weather-data\");\n    p.textContent = text + roundNumber(data) + unit;\n    dataWrapper.appendChild(p);\n};\n\nconst roundNumber = (number) => number.toFixed(1);\nconst capFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);\n\neventListeners();\n\n\n\n\n//# sourceURL=webpack://weather-app/./src/index.js?");

/***/ }),

/***/ "./src/unitTypes.js":
/*!**************************!*\
  !*** ./src/unitTypes.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getUnitType\": () => (/* binding */ getUnitType),\n/* harmony export */   \"toggleUnits\": () => (/* binding */ toggleUnits),\n/* harmony export */   \"unitType\": () => (/* binding */ unitType)\n/* harmony export */ });\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ \"./src/index.js\");\n\n\nlet unitType = \"metric\";\n\nconst getUnitType = () => {\n    if (unitType === \"metric\") {\n        return { temp: \"°C\", degree: \"°\", speed: \" kmh\", humidity: \"%\" };\n    } else {\n        return { temp: \"°F\", degree: \"°\", speed: \" mph\", humidity: \"%\" };\n    }\n};\n\n// Make new API calls if/when user wants to see the data in another unitType\nconst toggleUnits = async (e) => {\n    e.preventDefault();\n\n    if (location === null && unitType === \"metric\") {\n        toggleBoldText();\n        unitType = \"imperial\";\n    } else if (location === null && unitType === \"imperial\") {\n        toggleBoldText();\n        unitType = \"metric\";\n    } else if (unitType === \"metric\") {\n        toggleBoldText();\n        unitType = \"imperial\";\n        await (0,___WEBPACK_IMPORTED_MODULE_0__.getData)(unitType);\n    } else {\n        toggleBoldText();\n        unitType = \"metric\";\n        await (0,___WEBPACK_IMPORTED_MODULE_0__.getData)(unitType);\n    }\n};\n\n// Change boldness of a text on toggle units button\nconst toggleBoldText = () => {\n    const boldMetric = document.querySelector(\".metric-units\");\n    const boldImperial = document.querySelector(\".imperial-units\");\n    boldMetric.classList.toggle(\"metric-units--active\");\n    boldImperial.classList.toggle(\"imperial-units--active\");\n};\n\n\n\n\n//# sourceURL=webpack://weather-app/./src/unitTypes.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;