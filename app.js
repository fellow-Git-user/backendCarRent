const express = require('express')
require('dotenv').config()
const process = require('process')
const cors = require('cors')

require('./database'); //

const app = express()

app.use(cors())
app.use(express.json())

const authMiddleware = require('./middlewares/authMiddleware');

const carRoutes = require('./routes/cars')
const userRoutes = require('./routes/users')
const albumRoutes = require('./routes/albums');
const reviewRoutes = require('./routes/reviews');



app.use('/api/cars', carRoutes)
app.use('/api/users', userRoutes)
app.use('/api/albums', albumRoutes);
app.use('/api/reviews', reviewRoutes);

const PORT = process.env.PORT || 3005
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))


