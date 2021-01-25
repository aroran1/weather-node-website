const express = require('express');

// creates app
const app = express();

// return response when app root is requested
app.get('', (req, res) => {
  res.send('Hello express!');
});

// more app routes
app.get('/help', (req, res) => {
  res.send('Help Page');
});
app.get('/about', (req, res) => {
  res.send('About Page');
});
app.get('/weather', (req, res) => {
  res.send('Weather Page');
});

// starts the server and keeps it running on provided port
app.listen('3000', () => {
  console.log('Listening to port 3000');
});