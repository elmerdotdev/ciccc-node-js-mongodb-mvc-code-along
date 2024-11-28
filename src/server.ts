import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
import studentRouter from './routes/student.routes'
import courseRouter from './routes/course.routes'
import enrollmentRouter from './routes/enrollment.routes'

// Create server
const app = express()

// Middleware
app.use(express.json())

// Routes
app.use('/api/students', studentRouter)
app.use('/api/courses', courseRouter)
app.use('/api/enrollments', enrollmentRouter)

// Connect to MongoDB and start server
const PORT = process.env.PORT || 3000
const MONGO_URI = process.env.DATABASE_URL!
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB database')
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}...`)
    })
  })
  .catch((err) => {
    console.error(`Failed to connect to database: ${err}`)
  })
