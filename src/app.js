const express = require('express');

// creates app
const app = express();

// return response when app root is requested
app.get('', (req, res) => {
  res.send('<h1>Hello express!</h1>');
});

// more app routes
app.get('/help', (req, res) => {
  res.send([
    {
      name: 'Andrew',
      age: 27
    },
    {
      name: 'Mike',
      age: 22
    },
    {
      name: 'Sarah',
      age: 32
    }
  ]);
});
app.get('/about', (req, res) => {
  res.send('<h1>About us</h1>');
});
app.get('/weather', (req, res) => {
  res.send({
    forcast: '32 degress celcius',
    location: 'London'
  });
});

// starts the server and keeps it running on provided port
app.listen('3000', () => {
  console.log('Listening to port 3000');
});