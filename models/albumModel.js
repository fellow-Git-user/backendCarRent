const mongoose = require('mongoose');


const albumSchema = new mongoose.Schema ({
    carBrand: {
        type: String,
        required: true,
        trim: true
    },
    carModel: {
        type: String,
        required: true,
        trim: true
    },
    carManufactureDate: {
        type: Number,
        required: true,
        validate: {
            validator: function(value){
                const currentYear = new Date().getFullYear()
                return value <= currentYear
            },
            message: props => {
                return ` car make ${props.value} cannot be in the future`
            }
        }
    },
    firstImage: {
        type: String,
        required: true
    },
    secondImage: {
        type: String,
        required: true
    },
    thirdImage: {
        type: String,
        required: true
    },
})

const Album = mongoose.model('Albums', albumSchema)

module.exports = Album