const Review = require('../models/reviewModel')
const Car = require('../models/carModel')

const createReviewForCar = async (req, res) => {
    
    try {
        const { id } = req.params
        const { title, body, rating } = req.body
        const userId = req.user.id 

        console.log("Received review data:", { id, title, body, rating, userId });

        if (!req.user || !req.user.id) {
            
            console.error('Authentication error: req.user or req.user._id is missing.');
            return res.status(401).json({ message: 'Authentication error: User information not found in request. Ensure you are logged in and token is valid.' });
        }

        if (!title || !body || !rating) {
            return res.status(400).send({ message: 'All fields are required.' });
        }

        const car = await Car.findById(id)
        if (!car) {
            return res.status(404).send({ message: 'Car not found.' });
        }

        const review = new Review({
            title,
            body,
            rating: Number(rating),
            car: id,
            user: userId
        })
        await review.save()
        

        const populatedReview = await Review.findById(review._id).populate('user', 'name image')
        car.reviews.push(review._id)
        await car.save()

        res.status(201).send({ message: 'Review added successfully', review: populatedReview  })
    } catch (error) {
        
        console.error("Error creating review for car:", error);
        
        if (error.name === 'ValidationError') {

            return res.status(400).json({ message: 'Validation Error', errors: error.errors });
        }
        res.status(500).send({ message: 'Server error', error })
    }
}

const getReviewsForCar = async (req, res) => {
    

    console.log(req.user) 
    try {
        const { id } = req.params

        const carExists = await Car.findById(id);
        console.log("🚀 ~ getReviewsForCar ~ carExists:", carExists)
        if(!carExists) {
            return res.status(404).send({ message: 'Car not found' });
        }

        const reviews = await Review.find({ car: id })
            .populate('user', 'name image')
            .sort({ createdAt: -1 })

        if(reviews.length === 0) {
            res.status(200).send({ message: "This car has 0 reviews" })
        } else {
            res.send(reviews)
        }
    } catch (error) {
        console.error("Error fetching reviews:", error)
        res.status(500).send({ message: 'Server error', error })
    }
}

const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find().populate('user', 'name image');

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
    createReviewForCar,
    getReviewsForCar,
    getAllReviews,
    getReviewByID,
    updateReview,
    deleteReview
}