const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const passport = require('passport');
const Users = require('../models/users.model');


const connectPassport = async () => {
    try {
        await passport.use(new GoogleStrategy({
            clientID: "689027684651-htv7tkhr9va38vnoga476fbgrmah1njg.apps.googleusercontent.com",
            clientSecret: "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",
            callbackURL: "http://localhost:3000/api/v1/users/google/callback"
        }, async function (accessToken, refreshToken, profile, cb) {
            console.log(profile)
            const user = await Users.findOne({ googleId: profile.id });

            if (!user) {
                const user = await Users.create({
                    googleId: profile.id,
                    name: profile.displayName,
                    role: 'user'
                });
                return cb(null, user._id)
            }
            return cb(null, user._id)
        }
        ));
        passport.serializeUser(function (user, done) {
            done(null, user._id);
        });

        passport.deserializeUser(async function (id, done) {
            const user = await Users.findOne({ _id: id });
            done(null, user); // Pass the user object to the callback
        });

    } catch (error) {
        console.log(error.message)
    }
}

// const connectFacebook = async () => {
//     try {
//         await passport.use(new FacebookStrategy({
//             clientID: '689027684651',
//             clientSecret: 'IAATeA0W7JIFEhLWFjTqIRkPz93u',
//             callbackURL: "http://localhost:3000/api/v1/users/facebook/callback"
//         },
//             async function (accessToken, refreshToken, profile, cb) {
//                 console.log(profile)
//             }
//         ));

//         // Serialize user for session
//         passport.serializeUser((user, done) => {
//             done(null, user);
//         });

//         // Deserialize user from session
//         passport.deserializeUser((obj, done) => {
//             done(null, obj);
//         });

//     } catch (error) {
//         console.log(error);
//     }
// }

const connectFacebook = async () => {
    try {
        await passport.use(new FacebookStrategy({
            clientID: '689027684651',
            clientSecret: 'IAATeA0W7JIFEhLWFjTqIRkPz93u',
            callbackURL: "http://localhost:3000/api/v1/users/facebook/callback",
        },
            function (accessToken, refreshToken, profile, cb) {
                console.log(profile);
            // You can perform further operations here, such as saving the user to your database
            // Call the callback function with the user object or null if an error occurred
            return cb(null, profile);
            }
        ));
    } catch (error) {
        console.log(error);
    }
}

module.exports = { connectPassport, connectFacebook }