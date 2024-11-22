import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './configs/dbConfig.js'
import categoryRouter from './routes/v1/categoryRoute.js'
import {notFound, errorHandler} from "./middlewares/errorMiddleware.js"

const app = express()

dotenv.config()
connectDB()

app.use(express.json())

app.use('/api/v1/category', categoryRouter)
app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 4001

app.listen(port, () => {

    console.log(`Shopping App is Running on Port ${port}`);
})
