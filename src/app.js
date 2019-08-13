const path = require('path');
const express = require('express');
var cors = require('cors');
const hbs = require('hbs');

const geocode = require('./Utils/geocode');
const forecast = require('./Utils/forecast');

const port = process.env.PORT || 3000;

// Various Paths
const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Customise Express and hbs
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Aman Saharan'
  });
});
app.get('/home', cors(), (req, res) => {
  if (!req.query.address) {
    res.send({
      error: 'Please provide an address'
    });
  } else {
    geocode(
      req.query.address,
      (error, { lattitude, longitude, place } = {}) => {
        if (error) {
          return res.send({ error });
        }
        forecast(lattitude, longitude, (error, forecastData) => {
          if (error) {
            return res.send({ error });
          }

          res.send({
            forecast: forecastData,
            location: place,
            address: req.query.address
          });
        });
      }
    );
  }
});
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Aman Saharan'
  });
});

app.get('/weather', (req, res) => {
  res.render('weather', {
    title: 'Weather',
    name: 'Aman Saharan'
  });
});

app.listen(port, () => {
  console.log('I am listening on port: ' + port);
});
