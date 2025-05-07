const express = require('express')
const { getCar, getCarByID, createCar, updateCar, deleteCar } = require('../controllers/carController')
const rolesMiddleware = require('../middlewares/rolesMiddleware')
const ROLES = require('../config/roles')
const { getReviewsForCar, createReviewForCar } = require('../controllers/reviewController')
const authMiddleware = require('../middlewares/authMiddleware')
const router = express.Router() 

router.get('/', getCar)
router.get('/:id', getCarByID)
router.post('/create', authMiddleware, rolesMiddleware(ROLES.ADMIN), createCar)
router.put('/:id', rolesMiddleware(ROLES.ADMIN), updateCar)
router.delete('/:id', rolesMiddleware(ROLES.ADMIN), deleteCar)

router.get('/:id/reviews', getReviewsForCar)
router.post('/:id/reviews', authMiddleware, createReviewForCar)

module.exports = router
