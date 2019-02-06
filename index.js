const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./models/User');
require('./services/passport');

const keys = require('./config/keys');
const mongoose = require('mongoose');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

if (
  process.env.NODE_ENV ===
    'production' ||
  true
) {
  app.use(
    express.static('client/build')
  );

  console.log('in server');

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(
        __dirname,
        'client',
        'build',
        'index.html'
      )
    );
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
