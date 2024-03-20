const express = require('express');
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

module.exports = router;