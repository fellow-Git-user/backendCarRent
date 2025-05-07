const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const rolesMiddleware = require('../middlewares/rolesMiddleware')
const ROLES = require('../config/roles')
const { getReviewByID, updateReview, deleteReview } = require('../controllers/reviewController')
const router = express.Router() 


// router.get('/', getReviews)
router.get('/:id', getReviewByID)
// router.post('/create', authMiddleware, createReview)
router.put('/:id', authMiddleware, updateReview)
router.delete('/:id', authMiddleware, rolesMiddleware(ROLES.ADMIN), deleteReview)
