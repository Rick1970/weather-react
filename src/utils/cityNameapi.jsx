var Fetch = require('whatwg-fetch');
var rootUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
var apiUrl = '&key=AIzaSyD03Nwm0IcpxqGT7cyJTJWtrqkskjrP-ko';

module.exports = {
    get: function(latitude,longitude) {
        return fetch(rootUrl + latitude+','+longitude + apiUrl, {
            headers: {
                // No need for special headers
            }
        })
        .then(function(response) {
          console.log(response);
            return response.json();
        });
    }
};
