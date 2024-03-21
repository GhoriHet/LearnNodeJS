const express = require('express');
const passport = require('passport')
const { usersController } = require('../../controller');

const router = express.Router();

router.get("/", () => {
    console.log("GET users API..");
});

router.post(
    "/register",
    usersController.register
);

router.post(
    "/login",
    usersController.login
);

router.post(
    "/generateNewToken",
    usersController.generateNewToken
)

router.get(
    '/logout',
    usersController.logout
)

router.get(
    "/google",
    passport.authenticate('google', { scope: ['profile'] })
)

router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        console.log("Okay")
        res.redirect('/');
    });

module.exports = router;