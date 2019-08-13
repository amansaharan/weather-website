const request = require('request');

function forecast(lattitude, longitude, callback) {
  const url =
    'https://api.darksky.net/forecast/0152e49283704835cc30fbcfaeb8331e/' +
    lattitude +
    ',' +
    longitude +
    '?units=si';
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to weather servies', undefined);
    } else if (response.body.error) {
      callback(
        'Unable to find  location. Kindly search new location',
        undefined
      );
    } else {
      callback(
        undefined,
        response.body.daily.data[0].summary +
          ' In your area  ' +
          response.body.currently.temperature +
          ' डिग्री  सल्सीयस तापमान है aur ' +
          response.body.currently.precipProbability +
          ' % बारिश की सम्भावना hai'
      );
    }
  });
}

module.exports = forecast;
