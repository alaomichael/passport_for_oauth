const express = require('express');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');


const app = express();

// set up view engine
app.set('view engine', 'ejs');

//  connect to mongodb
mongoose.connect(keys.mongodb.dbURL,()=>{
    console.log('Connected to mongodb.')
});

// set up routes 
app.use('/auth', authRoutes);

// create home route
app.get('/',(req,res)=>{
    res.render('home');
})

const port = process.env.PORT || 3000;

app.listen(port, () => `Server running on port ${port} 🔥`);