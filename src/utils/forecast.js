const request = require('request');
const { generateGeocode } = require('./geocode');

function forecastWithGeocode(address, callback) {
  generateGeocode(address, (error, { latitude, longtitude, location } = {}) => {
    if (error) {
      return callback(error);
    }

    forecast(latitude, longtitude, (error, forecastData) => {
      if (error) {
        return callback(error);
      }
      const data = {
        forecastData,
        location,
      };
      return callback(null, data);
    });
  });
}

function forecast(latitude, longtitude, callback) {
  request(
    { url: getURLForecast(latitude, longtitude), json: true },
    (error, { body }) => {
      if (error) {
        return callback(error);
      }
      if (body.error) {
        return callback(body.error);
      }

      const current = body.current;

      const { temperature, feelslike, observation_time } = current;

      const message = `${current.weather_descriptions[0]}: It is currently ${temperature} degree out.But you gonna feels like ${feelslike} degree out.`;
      return callback(null, message);
    }
  );
}

const getURLForecast = (latitude, longtitude) => {
  return `http://api.weatherstack.com/current?access_key=9a0bcd3c721de061e9a528ad9f22b327&query=${latitude},${longtitude}&units=f`;
};

module.exports = { forecast, getURLForecast, forecastWithGeocode };
