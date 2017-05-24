/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	eval("\"use strict\";\n\n/*\n*\t\tCopied from the `metronomeworker` in Chris Wilson's Metronome app: `https://github.com/cwilso/metronome`\n*/\n\nvar timerID = null;\nvar interval = 100;\n\nself.onmessage = function (e) {\n\tif (e.data == \"start\") {\n\t\t// console.log(\"starting\");\n\t\ttimerID = setInterval(function () {\n\t\t\tpostMessage(\"tick\");\n\t\t}, interval);\n\t} else if (e.data.interval) {\n\t\t// console.log(\"setting interval\");\n\t\tinterval = e.data.interval;\n\t\t// console.log(\"interval=\"+interval);\n\t\tif (timerID) {\n\t\t\tclearInterval(timerID);\n\t\t\ttimerID = setInterval(function () {\n\t\t\t\tpostMessage(\"tick\");\n\t\t\t}, interval);\n\t\t}\n\t} else if (e.data == \"stop\") {\n\t\t// console.log(\"stopping\");\n\t\tclearInterval(timerID);\n\t\ttimerID = null;\n\t}\n};//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9hcHAvbGliL3RpY2tlci53b3JrZXIuanM/NGIxMiJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuKlx0XHRDb3BpZWQgZnJvbSB0aGUgYG1ldHJvbm9tZXdvcmtlcmAgaW4gQ2hyaXMgV2lsc29uJ3MgTWV0cm9ub21lIGFwcDogYGh0dHBzOi8vZ2l0aHViLmNvbS9jd2lsc28vbWV0cm9ub21lYFxuKi9cblxudmFyIHRpbWVySUQ9bnVsbDtcbnZhciBpbnRlcnZhbD0xMDA7XG5cbnNlbGYub25tZXNzYWdlPWZ1bmN0aW9uKGUpe1xuXHRpZiAoZS5kYXRhPT1cInN0YXJ0XCIpIHtcblx0XHQvLyBjb25zb2xlLmxvZyhcInN0YXJ0aW5nXCIpO1xuXHRcdHRpbWVySUQ9c2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXtwb3N0TWVzc2FnZShcInRpY2tcIik7fSxpbnRlcnZhbClcblx0fVxuXHRlbHNlIGlmIChlLmRhdGEuaW50ZXJ2YWwpIHtcblx0XHQvLyBjb25zb2xlLmxvZyhcInNldHRpbmcgaW50ZXJ2YWxcIik7XG5cdFx0aW50ZXJ2YWw9ZS5kYXRhLmludGVydmFsO1xuXHRcdC8vIGNvbnNvbGUubG9nKFwiaW50ZXJ2YWw9XCIraW50ZXJ2YWwpO1xuXHRcdGlmICh0aW1lcklEKSB7XG5cdFx0XHRjbGVhckludGVydmFsKHRpbWVySUQpO1xuXHRcdFx0dGltZXJJRD1zZXRJbnRlcnZhbChmdW5jdGlvbigpe3Bvc3RNZXNzYWdlKFwidGlja1wiKTt9LGludGVydmFsKVxuXHRcdH1cblx0fVxuXHRlbHNlIGlmIChlLmRhdGE9PVwic3RvcFwiKSB7XG5cdFx0Ly8gY29uc29sZS5sb2coXCJzdG9wcGluZ1wiKTtcblx0XHRjbGVhckludGVydmFsKHRpbWVySUQpO1xuXHRcdHRpbWVySUQ9bnVsbDtcblx0fVxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gYXBwL2xpYi90aWNrZXIud29ya2VyLmpzIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==");

/***/ })
/******/ ]);