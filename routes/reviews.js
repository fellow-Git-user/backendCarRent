const express = require('express')

const rolesMiddleware = require('../middlewares/rolesMiddleware')
const ROLES = require('../config/roles')
const { getReviews, getReviewByID, createReview, updateReview, deleteReview } = require('../controllers/reviewController')
const authMiddleware = require('../middlewares/authMiddleware')
const router = express.Router() 

router.get('/', getReviews)
router.get('/:id', getReviewByID)
router.post('/create', authMiddleware, createReview)
router.put('/:id', authMiddleware, updateReview)
router.delete('/:id', authMiddleware, rolesMiddleware(ROLES.ADMIN), deleteReview)
