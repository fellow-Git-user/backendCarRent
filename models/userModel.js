const mongoose = require('mongoose');
const ROLES = require('../config/roles');

const addressSchema = new mongoose.Schema({
    street: {
        type: String,
        trim: true,
        required: true,
    },
    flatNumber: {
        type: String,
        trim: true,
        // required: true,
    },
    city: {
        type: String,
        trim: true,
        required: true,
    },
    country: {
        type: String,
        trim: true,
        required: true,
    }

})

const userSchema = new mongoose.Schema({
    image: {
        type: String,
    },
    name: {
        type: String,
        required: true,
        validate: {
            validator: function(value){
                return /^[a-zA-Z0-9ąčęėįšųūžĄČĘĖĮŠŲŪŽ]+$/.test(value)
            },
            message: props => `${props.value} is not a valid name`
        }
    },
    surname: {
        type: String,
        required: true,
        trim: true,
        
    },
    phone: {
        type: String,
        trim: true,
        unique: true
    },
    address: addressSchema,
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: value => {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
            },
            message: props => {
                return `${props.value} is not a valid email`
            }
        }
    }, 
    password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: Object.values(ROLES),
            default: ROLES.USER
        }
}, { timestamps: true })

const User = mongoose.model('Users', userSchema)
module.exports = User

