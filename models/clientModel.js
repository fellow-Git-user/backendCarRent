const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema ({
    username: {
        type: String,
        required: true,
        validate: {
            validator: function(value){
                return /^[a-zA-Z0-9]+$/.test(value)
            },
            message: props => `${props.value} is not a valid username`
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
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
    }
})

const Client = mongoose.model('Client', clientSchema)

module.exports = Client