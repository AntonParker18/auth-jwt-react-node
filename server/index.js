require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const router = require('./router/index')
const errorMiddleware = require('./middleware/error-middleware')

const port = process.env.PORT || 5005

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
)

app.use('/api', router)

app.use(errorMiddleware)

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    console.log('DB connected')
    app.listen(port, () => console.log(`Server started on port ${port}`))
  } catch (e) {
    console.log(e)
  }
}

start()
