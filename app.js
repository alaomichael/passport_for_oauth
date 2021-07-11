const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');

const app = express();

// set up view engine
app.set('view engine', 'ejs');

// setup cookies session for use
app.use(cookieSession({
  maxAge: 24*60*60*1000,
  key:[keys.session.cookieKey]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

//  connect to mongodb
mongoose.connect(keys.mongodb.dbURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },()=>{
    console.log('Connected to mongodb.')
});

// set up routes 
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// create home route
app.get('/',(req,res)=>{
    res.render('home',{user: req.user});
})

const port = process.env.PORT || 3000;

app.listen(port, () => `Server running on port ${port} 🔥`);