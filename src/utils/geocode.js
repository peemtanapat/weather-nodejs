const request = require('request');

const generateGeocode = (address, callback) => {
  const url = getURLGeocode(address);

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      return callback('Unable to connect to location services.');
    } else if (body && !body.features.length) {
      return callback('Unable to find location. Try again.');
    }

    const features = body.features;
    const { place_name, center } = features[0];
    const latitude = center[1];
    const longtitude = center[0];

    const data = {
      latitude: latitude,
      longtitude: longtitude,
      location: place_name,
    };
    return callback(null, data);
  });
};

function getURLGeocode(address) {
  const addressEncoded = encodeURIComponent(address);
  const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${addressEncoded}.json`;
  const access_token =
    'access_token=pk.eyJ1IjoicGVlbXRhbmFwYXQiLCJhIjoiY2tpcmdjZ29iMDB5ZzJ3cGp0cWR1dWoxcyJ9.iUWz9WeKfD3XIvdd1ETO-w';
  const option = 'limit=1';

  return `${endpoint}?${access_token}&${option}`;
}
// (
//   "https://api.mapbox.com/geocoding/v5/mapbox.places/12whatxxxxxx.json?access_token=pk.eyJ1IjoicGVlbXRhbmFwYXQiLCJhIjoiY2tpcmdjZ29iMDB5ZzJ3cGp0cWR1dWoxcyJ9.iUWz9WeKfD3XIvdd1ETO-w&limit=1"
// );

module.exports = { generateGeocode, getURLGeocode };
