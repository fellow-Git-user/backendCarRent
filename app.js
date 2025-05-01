const express = require('express')
require('dotenv').config()
const process = require('process')

require('./database'); //

const app = express()

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 3005
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))

const carRoutes = require('./routes/cars')

app.use('/api/cars', carRoutes)


