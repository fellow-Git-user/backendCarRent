const express = require('express')
const { getCar, getCarByID, createCar, updateCar, deleteCar } = require('../controllers/carController')
const router = express.Router() 

router.get('/', getCar)
router.get('/:id', getCarByID)
router.post('/', createCar)
router.put('/:id', updateCar)
router.delete('/:id', deleteCar)

module.exports = router
