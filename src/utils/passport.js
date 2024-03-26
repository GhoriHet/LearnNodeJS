const passport = require('passport');
const Users = require('../models/users.model');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const connectPassport = async () => {
  try {
    await passport.use(new GoogleStrategy({
      clientID: '689027684651-htv7tkhr9va38vnoga476fbgrmah1njg.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: "http://localhost:3000/api/v1/users/google/callback"
    },
      async function (accessToken, refreshToken, profile, cb) {
        console.log(profile);

        const user = await Users.findOne({ googleId: profile.id });

        if (!user) {
          const user = await Users.create({
            googleId: profile.id,
            name: profile.displayName,
            role: 'user'
          })

          return cb(null, user._id);
        }

        return cb(null, user._id);
      }
    ));


    await passport.use(new FacebookStrategy({
      clientID: '689027684651',
      clientSecret: 'IAATeA0W7JIFEhLWFjTqIRkPz93u',
      callbackURL: "http://localhost:3000/api/v1/users/facebook/callback"
    }, async function (accessToken, refreshToken, profile, cb) {
      console.log(profile);

      const user = await Users.findOne({ id: profile.id });
      console.log('facebook', user);

      if (!user) {
        const user = await Users.create({
          facebookId: profile.id,
          name: profile.displayName,
          role: 'user'
        })

        return cb(null, user._id);
      }

      return cb(null, user._id);
    }
    ));

    passport.serializeUser(function (user, done) {
      done(null, user._id);
    });

    passport.deserializeUser(async function (id, done) {
      // await Users.findById(id, function (err, user) {
      //   done(err, user);
      // });

      const user = await Users.findOne({ _id: id });

      done(null, user);

    });
  } catch (error) {
    console.log(error.massage);
  }
}

module.exports = connectPassport;