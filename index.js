const express = require('express');
const connectDB = require('./config/db');
const cookieSession = require('cookie-session'); //cookieを使えるようにする
const passport = require('passport'); //passportがcookieを使えるようにする
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

connectDB();

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/api/current_user', (req, res) => {
  res.send(req.user);
});

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
