const mongoose = require('mongoose')
const process = require('process')

mongoose.connect(process.env.DB_URI)
    .then(() => {
        console.log('Successfully connected to carRent MongoDB:')
    })
    .catch((error) => {
        console.log('Investigation required. Failed to connect to MongoDB:', error)
    })

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('MongoDB disconnected')
        process.exit(0)
    })
})