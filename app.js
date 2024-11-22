import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './configs/dbConfig.js'

const app = express()

dotenv.config()

connectDB()

const port = process.env.PORT || 4001


app.listen(port, () => {

    console.log(`Shopping App is Running on Port ${port}`);
})
