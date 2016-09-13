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
var Weather = React.createClass({
  getInitialState: function() {
    return {
        weather: '',
        temp: 0,
        humidity: 0,
        wind: 0,
    }
},
fetchData: function() {

    // Get the data from the cache if possible
    if (citiesWeather[currentCity]) {
        this.updateData();
    }
    else {
        // Request new data to the API
        Api.get(cities[currentCity])
            .then(function(data) {
                citiesWeather[currentCity] = data;
                this.updateData();
        }.bind(this));
    }
},
updateData: function() {
    // Update the data for the UI
    this.setState({
        weather: citiesWeather[currentCity].weather[0].id,
        temp: Math.round(citiesWeather[currentCity].main.temp - 273.15), // Kelvin to Celcius
        humidity: Math.round(citiesWeather[currentCity].main.humidity),
        wind: Math.round(citiesWeather[currentCity].wind.speed)
    });
},// Called before the render method is executed
componentWillMount: function() {

    // Get the query string data
    query = location.search.split('=')[1];

    console.log("app Component "+apiCityName);
        cities[0] = 'Seattle'; // Set London as the default city

        // if(!apiCityName){
        //   var timer=setInterval(function() {
        //     console.log("wait for retrive City"+apiCityName);
        //     if(apiCityName){
        //       clearTimeout(timer);
        //     }
        //   }, 1000);
        // }
    // Create a timer to clear the cache after 5 minutes, so we can get updated data from the API
    setInterval(function() {
        citiesWeather = []; // Empty the cache
    }, (1000*60*5));

    this.fetchData();

},
    render: function() {
      // Build class names with dynamic data
      var weatherClass = classNames('wi wi-owm-' + this.state.weather);
      var bgColorClass = 'weather-widget '; // very-warm, warm, normal, cold, very-cold

      // Set the background colour based on the temperature
      if (this.state.temp >= 30) {
          bgColorClass += 'very-warm';
      }
      else if (this.state.temp > 20 && this.state.temp < 30) {
          bgColorClass += 'warm';
      }
      else if (this.state.temp > 10 && this.state.temp < 20) {
          bgColorClass += 'normal';
      }
      else if (this.state.temp > 0 && this.state.temp < 10) {
          bgColorClass += 'cold';
      }
      else if (this.state.temp <= 0) {
          bgColorClass += 'very-cold';
      }

      // Render the DOM elements
      return (
        <div className={bgColorClass}>
          <h1 className="city">{cities[currentCity]}</h1>
          <div className="weather">
              <i className={weatherClass}></i>
          </div>
          <section className="weather-details">
              <div className="temp"><span className="temp-number">{this.state.temp}</span><span className="wi wi-degrees"></span></div>
              <div className="humidity"><i className="wi wi-raindrop"></i>{this.state.humidity} %</div>
              <div className="wind"><i className="wi wi-small-craft-advisory"></i>{this.state.wind} <span className="vel">Km/h</span></div>
          </section>
      </div>
    )
    }
});

// Assign the React component to a DOM element
var element = React.createElement(Weather, {});
ReactDOM.render(element, document.querySelector('.container'));
