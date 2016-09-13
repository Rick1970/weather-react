var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');
var cityNameApi = require('./utils/cityNameapi');
var apiCityName='';
var CityName = React.createClass({
  getInitialState: function() {
    return {

        latitude  : 0,
        longitude : 0,
        city: '',
        message:'',
        mapSrc:''
    }
},

componentWillMount: function() {

    this.getCityData();

},
getCityData: function() {
  var self=this;
  navigator.geolocation.getCurrentPosition(function (position) {
      var latitude  = position.coords.latitude;
      var longitude = position.coords.longitude;

      console.log(latitude);
      console.log("longitude"+longitude);
      self.setState({
          latitude: latitude,
          longitude: longitude,
          city: '',
          mapSrc:'https://maps.googleapis.com/maps/api/staticmap?center=' + latitude + ',' + longitude + '&zoom=13&size=300x300&sensor=false',
      });
      cityNameApi.get(latitude,longitude)
          .then(function(data) {
            var apiCityName=data.results[0].formatted_address;
            console.log(apiCityName+"in cityName.jsx");
            console.log(apiCityName);
              self.setState({
                city:apiCityName.split(",")[0]
              });
      });
  }, function(){
    console.log(error);});

},
    render: function() {

      return (
        <div>

          <h1 className="">longitude {this.state.longitude}</h1>
          <h1 className="">latitude {this.state.longitude}</h1>
            <h1 className="">Based on your geolocation. You are in {this.state.city}</h1>

          <img src={this.state.mapSrc}/>
      </div>

    )
    }
});

// Assign the React component to a DOM element
var Cityelement = React.createElement(CityName, {});
ReactDOM.render(Cityelement, document.querySelector('.output'));
