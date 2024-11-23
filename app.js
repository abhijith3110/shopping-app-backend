import express from 'express'
import cors from 'cors'
import path from 'path'
import dotenv from 'dotenv'
import { connectDB } from './configs/dbConfig.js'
import categoryRouter from './routes/v1/categoryRoute.js'
import {notFound, errorHandler} from "./middlewares/errorMiddleware.js"
import productRouter from './routes/v1/productRoute.js'
import userRouter from './routes/v1/userRoute.js'

const app = express()

dotenv.config()

const __dirname = path.resolve()

connectDB()

app.use(express.json())

app.use(cors())

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/v1/category', categoryRouter)
app.use('/api/v1/product', productRouter)
app.use('/api/v1/user', userRouter)
app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 4001

app.listen(port, () => {

    console.log(`Shopping App is Running on Port ${port}`);
})
