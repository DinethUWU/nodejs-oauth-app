const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

passport.use(new GoogleStrategy({
    //options for google strategy
    callbackURL: "/oauth/google/redirect",
    clientID: "328344705560-a9phjmv3rul2ufoeqmgnv86jqc7u756v.apps.googleusercontent.com",
    clientSecret: "O9-CBWJ1SnA14OalAh381iZl"
}, async (accessToken, refreshToken, profile, done) => {
    //passport callback function
    done(null, false, {
        accessToken: accessToken,
        refreshToken: refreshToken,
        profile: profile
      });

}));


