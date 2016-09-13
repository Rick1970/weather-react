var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');
var Api = require('./utils/api');
var query = ''; // Expects something like this ?city=London,Paris,Berlin,Madrid
var cities = []; // Transform query string cities into an array
var citiesWeather = []; // API cache
var currentCity = 0;
require('./cityName.jsx');
var apiCityName=require('./cityName.jsx').apiCityName;
require('./weather.jsx');
console.log(apiCityName);
