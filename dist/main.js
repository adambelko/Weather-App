/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("const callGeoCoord = async (location) => {\n    try {\n        const response = await fetch(\n            `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=27424b54a6ab420d52712155ee6a6ff1`,\n            { mode: \"cors\" }\n        );\n        const responseData = await response.json();\n        // console.log(responseData);\n        const lat = responseData[0].lat;\n        const lon = responseData[0].lon;\n        callWeatherData(lat, lon);\n    } catch (error) {\n        console.log(error);\n    }\n};\n\nconst callWeatherData = async (lat, lon) => {\n    const response = await fetch(\n        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=27424b54a6ab420d52712155ee6a6ff1`,\n        { mode: \"cors\" }\n    );\n    const responseData = await response.json();\n    console.log(responseData);\n};\n\ncallGeoCoord(\"Sydney\");\n\n\n//# sourceURL=webpack://weather-app/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;