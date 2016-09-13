var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');

var City = React.createClass({
  getInitialState: function() {
    return {
        latitude  : 0,
        longitude : 0,
        city: '',
        message:'',
        mapSrc:'',

    }
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
      // img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";
  }, function(){
    self.setState({message:"Unable to retrive city"})
  }
);

},


componentWillMount: function() {
  this.getCityData();

},
    render: function() {
      console.log(render);
      return (
        // <h1>Latitude {this.state.latitude}</h1>
        //   <h1>longitude {this.state.longitude}</h1>
        //     <img src={this.state.mapSrc}>

    )
    }
});

// Assign the React component to a DOM element
var Cityelement = React.createElement(City, {});
ReactDOM.render(Cityelement, document.querySelector('.output'));
