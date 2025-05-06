const Review = require('../models/reviewModel')

const createReview = async (req, res) => {
    try {
        console.log(req.body)
        const review = new Review(req.body)
        await review.save()

        res.send(review)
    } catch (error) {
        res.status(500).send(error)
    }
}

const getReviews = async (req, res) => {
    console.log(req.user) 
    try {
        const reviews = await Review.find()
        // .populate('rev', 'brand model firstImage secondImage thirdImage');

        res.send(reviews)
    } catch (error) {
        console.error("Error fetching reviews:", error)
        res.status(500).send(error)
    }
}

const getReviewByID = async (req, res) => {
    try {
        const { id } = req.params
        const review = await Review.findById(id)
        // .populate('albums', 'brand model firstImage secondImage thirdImage');

        if(!review){
            return res.status(404).send({ error: 'Review not found' })
        }

        res.send(review)
    } catch (error) {
        console.error('Error fetching review:', error)
        res.status(500).send(error)
    }
}

const updateReview = async (req, res) => {
    try {
        const { id } = req.params
        const updatedReview = await Review.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        )

        if(!updatedReview){
            return res.status(404).send({ error: 'Review not found' })
        }

        res.send(updatedReview)
    } catch (error) {
        res.status(500).send(error)
    }
}

const deleteReview = async (req, res) => {
    try {
        const { id } = req.params
        const deletedReview = await Review.findByIdAndDelete(id)

        if(!deletedReview) {
            return res.status(404).send({ error: 'Review not found' })
        }

        res.send({ message: 'Review was successfully deleted', data: deletedReview })
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    createReview,
    getReviews,
    getReviewByID,
    updateReview,
    deleteReview
}