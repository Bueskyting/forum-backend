import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import authRoutes from './routes/auth.js'
import questionRoutes from './routes/question.js'
import answerRoutes from './routes/answer.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/questions', questionRoutes)
app.use('/api/answers', answerRoutes)

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('MongoDB connected')
        app.listen(process.env.PORT, () => 
            console.log(`Server running on port ${process.env.PORT}`))
    })
    .catch(error => {
        console.error('MongoDB connection failed, verify your DB connection string inside .env file: ', error.message)
    })