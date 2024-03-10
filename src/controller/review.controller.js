const Reviews = require('../models/reviews.model'); // Import your Reviews model

const createReviews = async (req, res) => {
    try {
        let review = await Reviews.create(req.body);
        console.log(review);

        if (!review) {
            return res.status(500).json({ message: "Internal Server Error!" });
        }

        return res.status(200).json({
            success: true,
            data: review,
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Internal Server Error!" });
    }
};

const getReviews = async (req, res) => {
    try {
        const review = await Reviews.find();

        if (!review) {
            return res.status(500).json({ message: 'Internal server error' })
        }

        return res.status(200).json({
            success: true,
            data: review,
            message: 'Reviews Data Get Successfully'
        })

    } catch (error) {
        console.log(error.message)
    }
}

const getReviewsById = async (req, res) => {
    try {
        const review = await Reviews.findById(req.params.id);

        if (!review) {
            return res.status(500).json({ message: 'Internal server error' })
        }

        return res.status(200).json({
            success: true,
            data: review,
            message: 'Reviews Data Get Successfully'
        })

    } catch (error) {
        console.log(error.message)
    }
}

const updateReviews = async (req, res) => {
    try {
        const review = await Reviews.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!review) {
            return res.status(500).json({ message: "Internal Server Error!" });
        }
        return res.status(200).json({
            success: true,
            data: review,
            message: "Reviews Updated Successfully!!"
        })

    } catch (error) {
        console.log(error.message)
    }
};

const deleteReviews = async (req, res) => {
    try {
        const review = await Reviews.findByIdAndDelete(req.params.id);
        
        if (!review) {
            return res.status(500).json({ message: "Internal Server Error!" });
        }
        return res.status(200).json({
            success: true,
            data: review,
            message: "Reviews Deleted Successfully!!"
        })
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    createReviews,
    getReviews,
    getReviewsById,
    updateReviews,
    deleteReviews
}