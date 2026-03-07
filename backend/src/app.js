const express = require('express')
const cors = require('cors')
const productRoutes = require('./routes/productRoutes')
const orderRoutes = require('./routes/orderRoutes')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: "API running 🚀" })
})

app.use('/products', productRoutes);
app.use('/orders', orderRoutes)

module.exports = app