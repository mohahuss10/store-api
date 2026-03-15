const dns = require('dns')
dns.setServers(['8.8.8.8', '1.1.1.1'])
require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()

const connectDB = require('./db/connect')
const productsRouter = require('./routes/products')
// middleware imports
const NotFoundMiddleware = require('./middleware/not-found')
const ErrorMiddleware = require('./middleware/error-handler')
// built-in middleware
app.use(express.json())
// routes
app.get('/', (req, res) => {
  res.send('<h1>Store API <a href="/api/v1/products">Products</a></h1>')
})
app.use('/api/v1/products', productsRouter)
// products route (later)

// error middlewares (ALWAYS LAST)
app.use(NotFoundMiddleware)
app.use(ErrorMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
  try {
    // connectDB later
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`server is listening on port ${port}....`)
    )
  } catch (error) {
    console.log(error)
  }
}

start()