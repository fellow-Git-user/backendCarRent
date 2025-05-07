const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const rolesMiddleware = require('../middlewares/rolesMiddleware')
const ROLES = require('../config/roles')
const { getReviewByID, updateReview, deleteReview, getReviewsForCar, createReviewForCar, getAllReviews } = require('../controllers/reviewController')
const router = express.Router() 


router.get('/', getAllReviews)
router.get('/:id', getReviewByID)
router.post('/create', authMiddleware, createReviewForCar)
router.put('/:id', authMiddleware, updateReview)
router.delete('/:id', authMiddleware, rolesMiddleware(ROLES.ADMIN), deleteReview)

module.exports = router