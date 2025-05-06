const express = require('express')
const { getCar, getCarByID, createCar, updateCar, deleteCar } = require('../controllers/carController')
const rolesMiddleware = require('../middlewares/rolesMiddleware')
const ROLES = require('../config/roles')
const router = express.Router() 

router.get('/', getCar)
router.get('/:id', getCarByID)
router.post('/create', rolesMiddleware(ROLES.ADMIN), createCar)
router.put('/:id', rolesMiddleware(ROLES.ADMIN), updateCar)
router.delete('/:id', rolesMiddleware(ROLES.ADMIN), deleteCar)

module.exports = router
