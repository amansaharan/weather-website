const request = require('request');

function geocode(address, callback) {
  const url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    address +
    '.json?access_token=pk.eyJ1IjoiYW1hbnNhaGFyYW44OCIsImEiOiJjanl5ZTZ3ZWMxZ2Y4M25waGN1dDg4eW5kIn0.l9Gy9Q57SbRapxdMBUMPwg';
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to location servies', undefined);
    } else if (response.body.features.length === 0) {
      callback(
        'Unable to find  location. Kindly search new location',
        undefined
      );
    } else {
      callback(undefined, {
        lattitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        place: response.body.features[0].place_name
      });
    }
  });
}

module.exports = geocode;
