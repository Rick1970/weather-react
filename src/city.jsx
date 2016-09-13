var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');


var City = React.createClass({
  getInitialState: function() {
    return {
        latitude  : 0,
        longitude : 0,
        city: '',
    }
},
fetchData: function() {
  navigator.geolocation.getCurrentPosition(success, error);

},
success:function (position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;

    console.log(latitude);
    console.log(longitude);
    // this.setState({
    //     latitude: this.latitude,
    //     longitude: this.longitude,
    //     city: '',
    // });
    // img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";
},
error:function(){
  this.setState({message:"Unable to retrive city"})
},

componentWillMount: function() {
  this.fetchData();

},
    render: function() {

      return (
        <h1 className="city">{this.state.city}</h1>
          <section className="">

          </section>
      </div>
    )
    }
});

// Assign the React component to a DOM element
var element = React.createElement(Weather, {});
ReactDOM.render(element, document.querySelector('.container'));
