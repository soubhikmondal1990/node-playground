const path = require('path');
const express = require('express');
const hbs = require('hbs');

const PORT = process.env.PORT || 3000;

const app = express();
const static = express.static(path.join(__dirname, '../public'))
const templates = path.join(__dirname, '../templates/views');
const partials = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', templates);

hbs.registerPartials(partials);

app.use('/static', static) // public folder
// app.get('', (req, res) => {
//   res.send('Hello express!');
// })

app.get('/weather', (req, res) => {
  res.render('index', {
      name: 'Naruto'
  });
})

// http://localhost:3000/covid-search?location=montevideo&zone=green
app.get('/covid-search', (req, res) => {
  const { location, zone } = req.query;
  if(!(location && zone)) {
    return res.send({
      error: 'location or zone not provided'
    })
  }
  res.send({location, zone});
})

app.get('*', (req, res) => {
  res.send('Page not found');
})

app.listen(PORT, () => {
    console.log('listening' + PORT)
})

// ls -a -l ~/.ssh
// ssh-keygen -t rsa -b 4096 -C "ssoubhikk@gmail.com"
// eval $(ssh-agent -s)
// ls -a -l ~/.ssh
// ssh-add -K ~/.ssh/id_rsa
// cat ~/.ssh/id_rsa.pub ((add to github.com setting))
// ssh -T git@github.com

//  heroku keys:add
// heroku create node-playground
