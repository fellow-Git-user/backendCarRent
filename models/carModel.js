const mongoose = require('mongoose')

const carSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
        trim: true
    },
    carMakeDate: {
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
    engine: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        enum: {
            values: ['petrol', 'diesel', 'hybrid', 'electric'],
            message: `{VALUE} is not an engine type. Select of the following: petrol, diesel, hybrid or electric`
        },
    },
    engineDisplacement: {
        type: Number,
        required: true,
    },
    transmission: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        enum: {
            values: ['manual', 'automatic'],
            message: '{VALUE} is not correct. Choose either manual or automatic'
        },
    },
    passengerSeats: {
        type: Number,
        required: true,
        min: 2,
        max: 7
    },
    price: {
        type: Number,
        required: true,
        min: 1
    }
},
 { timestamps: true }
)

const Car = mongoose.model('Car', carSchema)
module.exports = Car