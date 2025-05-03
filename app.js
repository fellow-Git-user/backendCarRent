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
const clientRoutes = require('./routes/clients')

app.use('/api/cars', carRoutes)
app.use('/api/users', userRoutes)
app.use('/api/client', clientRoutes)

const PORT = process.env.PORT || 3005
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))


