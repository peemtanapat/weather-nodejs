const path = require('path');

const express = require('express');
const hbs = require('hbs');

const { forecastWithGeocode } = require('./utils/forecast');

// this 'express' is a function. so we need to call it.
const app = express();

// Define paths for Express config customization.
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Set up handler bars and views location.
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
// Setup static directory to serve
app.use(express.static(publicPath));

app.get('', (request, response) => {
  // rendering file hbs which is set in app.set().
  const data = {
    title: 'Weather App',
    name: 'peemtanapat',
  };
  response.render('index', data);
});

app.get('/about', (request, response) => {
  const data = {
    title: 'About Me',
    name: 'peemtanapat',
  };

  response.render('about', data);
});

app.get('/help', (request, response) => {
  const data = {
    title: 'Help',
    helpText: 'This is some help text.',
    name: 'peemtanapat',
  };

  response.render('help', data);
});

app.get('/help/*', (request, response) => {
  const data = {
    title: '404',
    errorMessage: 'Help article not found',
    name: 'peemtanapat',
  };

  response.render('404', data);
});

app.get('/weather', (request, response) => {
  const { address } = request.query;

  if (!address) {
    return response.send({ error: 'no query of address term' });
  }

  forecastWithGeocode(address, (error, { forecastData, location } = {}) => {
    if (error) {
      return response.send({ error: error });
    }

    const data = {
      query: { address },
      forecastData,
      location,
    };

    return response.send(data);
  });
});

app.get('/products', (request, response) => {
  const { search, rating } = request.query;

  if (!search) {
    return response.send({
      error: 'no query search term',
    });
  }

  const data = {
    products: [],
  };

  return response.send(data);
});

app.get('*', (request, response) => {
  const data = {
    title: '404',
    errorMessage: 'Page not found',
    name: 'peemtanapat',
  };

  response.render('404', data);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(
    `Server is running and listen connection comming on port ${port}`
  );
});
