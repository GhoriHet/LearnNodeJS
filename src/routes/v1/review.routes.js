const express = require('express');
const validate = require("../../middleware/validate");
const { reviewController } = require('../../controller');
const { reviewValidation } = require('../../validation');
const route = express.Router();

route.post(
    "/create-review",
    validate(reviewValidation.createReviews),
    reviewController.createReviews
);

route.get('/list-review', reviewController.getReviews);

route.get('/get-review/:id', reviewController.getReviewsById);

route.put('/update-review/:id',
    validate(reviewValidation.updateReview),
    reviewController.updateReviews
);

route.delete('/delete-review/:id', reviewController.deleteReviews);

module.exports = route;