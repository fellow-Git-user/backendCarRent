const express = require('express')
require('dotenv').config()
const process = require('process')

require('./database'); //

const app = express()

const PORT = process.env.PORT || 3005
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))


