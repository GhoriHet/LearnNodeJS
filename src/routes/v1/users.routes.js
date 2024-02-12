const express = require('express');

const router = express.Router();

router.get("/", () => {
    console.log("GET users API..");
});

module.exports = router;