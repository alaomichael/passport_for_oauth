const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user-model');

// serialize user
passport.serializeUser((user,done)=>{
done(null,user.id);
});

// deserialize user
passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
done(null,user);
    });
});

// setting up passport strategy
passport.use(
    new GoogleStrategy({
        // options for the google strat
      callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID ,
        clientSecret: keys.google.clientSecret ,
    }, (accessToken,refreshToken,profile,done)=> {
        //check if user already exist in our db
        User.findOne({googleId: profile.id}).then((currentUser)=>{
if(currentUser){
    // already have the user
    console.log('user is: ',currentUser);
    done(null,currentUser);
} else {
    // if not, create user in our db
    // console.log(profile);
           new User({
            username: profile.displayName,
            googleId: profile.id,
            thumbnail: profile._json.picture
        }).save().then((newUser) =>{
            console.log('new user created: ' + newUser);
            done(null,newUser);
        });
}
        });
 
    })
)