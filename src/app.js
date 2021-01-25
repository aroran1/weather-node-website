const path = require('path');
const express = require('express');

// creates app
const app = express();

console.log(__dirname);
console.log(__filename);
console.log(path.join(__dirname, '../'));

// setting public directory path
const publicDirectoryPath = path.join(__dirname, '../public');
console.log(publicDirectoryPath);

// setting hbs templating engine for express
// need to be exact match for engine and module
// this would require the app.get for the route to 
// be in place again but instead of send it needs to render
// make sure to delete the static index.html from public
app.set('view engine', 'hbs');

// serving public directory from express
// with this in place now the root path of the app '/'
// will serve html file from the public folder
// so the bade root get can be removed
app.use(express.static(publicDirectoryPath));

// below code is replaced by index.html from public
// // return response when app root is requested
// app.get('', (req, res) => {
//   res.send('<h1>Hello express!</h1>');
// });

// below code is replaced by help.html from public
// access it as http://localhost:3000/help.html
// // more app routes
// app.get('/help', (req, res) => {
//   res.send([
//     {
//       name: 'Andrew',
//       age: 27
//     },
//     {
//       name: 'Mike',
//       age: 22
//     },
//     {
//       name: 'Sarah',
//       age: 32
//     }
//   ]);
// });

app.get('', (req, res) => {
  res.render('index');
})

// below code is replaced by about.html from public
// access it as http://localhost:3000/about.html
// app.get('/about', (req, res) => {
//   res.send('<h1>About us</h1>');
// });



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