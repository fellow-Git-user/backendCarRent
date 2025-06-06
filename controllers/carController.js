const Car = require('../models/carModel')

const createCar = async (req, res) => {
    try {
        console.log(req.body)
        const car = new Car(req.body)
        await car.save()

        res.send(car)
    } catch (error) {
        res.status(500).send(error)
    }
}

const getCar = async (req, res) => {
    console.log(req.user) // cia gaunam userio informacija pvz surasti masina kuria nuomavosi sitas userris
    try {
        const cars = await Car.find().populate('albums', 'brand model firstImage secondImage thirdImage');

        res.send(cars)
    } catch (error) {
        console.error("Error fetching cars:", error)
        res.status(500).send(error)
    }
}

const getCarByID = async (req, res) => {
    try {
        const { id } = req.params
        const car = await Car.findById(id).populate('albums', 'brand model firstImage secondImage thirdImage');

        if(!car){
            return res.status(404).send({ error: 'Car not found' })
        }

        res.send(car)
    } catch (error) {
        console.error('Error fetching car:', error)
        res.status(500).send(error)
    }
}

const updateCar = async (req, res) => {
    try {
        const { id } = req.params
        const updatedCar = await Car.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        )

        if(!updatedCar){
            return res.status(404).send({ error: 'car not found' })
        }

        res.send(updatedCar)
    } catch (error) {
        res.status(500).send(error)
    }
}

const deleteCar = async (req, res) => {
    try {
        const { id } = req.params
        const deletedCar = await Car.findByIdAndDelete(id)

        if(!deletedCar) {
            return res.status(404).send({ error: 'car not found' })
        }

        res.send({ message: 'Car was successfully deleted', data: deletedCar })
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    createCar,
    getCar,
    getCarByID,
    updateCar,
    deleteCar
}