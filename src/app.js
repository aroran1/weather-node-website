const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// creates a new instance of the application
const app = express();

// a new port gets set by heroku on the OS level and can be accessed for the production by process.env.PORT
const PORT = process.env.PORT || 3000;

console.log(__dirname);
console.log(__filename);
console.log(path.join(__dirname, '../'));

// setting public directory path
const publicDirectoryPath = path.join(__dirname, '../public');
const viewDirectoryPath = path.join(__dirname, '../templates/views');
const partialsDirectoryPath = path.join(__dirname, '../templates/partials');

// console.log(publicDirectoryPath);

// setting hbs templating engine for express need to be exact match for engine and module this would require the 
// app.get for the route to  be in place again but instead of send it needs to render make sure to delete the 
// static index.html from public express by default expect the template engine to be in views folder
app.set('view engine', 'hbs');

// customise views directory by following for handlebars folder
app.set('views', viewDirectoryPath);
hbs.registerPartials(partialsDirectoryPath);

// serving public directory from express with this in place now the root path of the app '/' will serve html file from the public folder so the bade root get can be removed
app.use(express.static(publicDirectoryPath));

// below code is replaced by index.html from public
// return response when app root is requested
// app.get('', (req, res) => {
//   res.send('<h1>Hello express!</h1>');
// });

// below code is replaced by help.html from public
// access it as http://localhost:3000/help.html
// more app routes
// app.get('/help', (req, res) => {
//   res.send([
//     { name: 'Andrew', age: 27 },
//     { name: 'Mike', age: 22 },
//     { name: 'Sarah', age: 32 }
//   ]);
// });

// below code is replaced by about.html from public
// access it as http://localhost:3000/about.html
// app.get('/about', (req, res) => {
//   res.send('<h1>About us</h1>');
// });


// Handlebars template rendering routes
// app root
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Nidhi Arora'
  });
})

// about root
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Nidhi Arora'
  });
})

// help root
app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Nidhi Arora',
    helpText: 'This is some helpful text.'
  });
})

app.get('/weather', (req, res) => {
  if(!req.query.address) {
    return res.send({
      error: 'You must provide an address!'
    });
  }

  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if(error) {
      return res.send({ error });
    }
    forecast(latitude, longitude, (error, response) => {
      if(error) {
        return res.send({ error });
      }
      // console.log(`${response.description} - It is currently ${response.temperature} degrees Fahrenheit out but it feels like ${response.feelslike} degrees in ${location}.`);
      res.send({
        description: response.description,
        temperature: response.temperature,
        feelslike: response.feelslike,
        humidity: response.humidity,
        location: location,
        msg: `${response.description} - It is currently ${response.temperature} degrees Fahrenheit out but it feels like ${response.feelslike} degrees in ${location}. Humidity is ${response.humidity}%.`
      });
    });
  });
  // res.send({
  //   forcast: '32 degress celcius',
  //   location: 'London',
  //   address: req.query.address
  // });
});


// Example for queries
// first run http://localhost:3000/products >> returns { products: []}
// first run http://localhost:3000/products?search=games&rating=5 >> returns { error: "You must pass the search query!" }
app.get('/products', (req, res) => {
  console.log(req.query)
  if( !req.query.search ) {
    return res.send({
      error: 'You must pass the search query!'
    });
  }
  res.send({
    products: []
  });
});

app.get('/help/*', (req, res) => {
  // res.send('Help article not found!');
  res.render('pageNotFound', {
    title: '404 Help - Page Not Found',
    name: 'Nidhi Arora',
    errorMsg: 'Help article not found!'
  });
});

// * matches to any route that hasn't been specified above
// this needs to sit near the bottom after all other routes has been setup
app.get('*', (req, res) => {
  // res.send('My 404 page');
  res.render('pageNotFound', {
    title: '404 - Page Not Found',
    name: 'Nidhi Arora',
    errorMsg: 'Generic page not found!'
  });
});


// starts the server and keeps it running on provided port
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
