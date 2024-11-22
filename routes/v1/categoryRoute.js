import express from 'express'
import { createCategory, listCategories } from '../../controllers/v1/category.js'
import {uploadImage} from "../../middlewares/multer/fileUpload.js"

const categoryRouter = express.Router()

categoryRouter.post('/', uploadImage.single('file'), createCategory)
categoryRouter.get('/all',listCategories)

export default categoryRouter