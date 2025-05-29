const express = require('express')
require('dotenv').config()
const process = require('process')
const cors = require('cors')

require('./database'); //

const app = express()

app.use(cors())
app.use(express.json())

const FRONTEND_URL = process.env.FRONTEND_URL;

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:8080', 
  FRONTEND_URL 
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
      callback(new Error(msg), false);
    }
  },
  credentials: true // Set this to true if your frontend sends cookies, authorization headers, etc.
}));

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


