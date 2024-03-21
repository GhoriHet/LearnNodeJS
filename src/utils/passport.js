const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');

const connectPassport = async () => {
    try {
        await passport.use(new GoogleStrategy({
            clientID: "689027684651-htv7tkhr9va38vnoga476fbgrmah1njg.apps.googleusercontent.com",
            clientSecret: "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",
            callbackURL: "http://localhost:3000/api/v1/users/google/callback"
        }, function (accessToken, refreshToken, profile, cb) {
            console.log(profile)
            // Users.findOrCreate({ googleId: profile.id }, function (err, user) {
            //     return cb(err, user);
            // });
        }
        ));
        passport.serializeUser(function (user, done) {
            done(null, user.id);
        });

        passport.deserializeUser(function (id, done) {
            done(err, id);
            // User.findById(id, function (err, user) {
            //     done(err, user);
            // });
        });

    } catch (error) {
        console.log(error.message)
    }
}

module.exports = connectPassport