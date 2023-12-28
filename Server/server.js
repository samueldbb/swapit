require('dotenv').config()

const express = require('express')
const cors = require('cors');
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// LOCAL
mongoose.connect("mongodb://localhost:27017/swap", { useNewUrlParser: true})


const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

app.use(cors())


const usersRouter = require('./routes/users')
app.use('/users', usersRouter)

const productsRouter = require('./routes/products')
app.use('/products', productsRouter)

const swapsRouter = require('./routes/swaps')
app.use('/swaps', swapsRouter)

app.listen(27017, () => console.log('Server Started'))
//app.listen(4000, () => console.log('Server Started'))


