const express = require('express')
require('dotenv').config()
const process = require('process')
const cors = require('cors')

require('./database'); //

const app = express()

app.use(cors())
app.use(express.json())


const carRoutes = require('./routes/cars')
const userRoutes = require('./routes/users')

app.use('/api/cars', carRoutes)
app.use('/api/users', userRoutes)

const PORT = process.env.PORT || 3005
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))


