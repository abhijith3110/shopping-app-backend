import express from 'express'
import {uploadImage} from "../../middlewares/multer/fileUpload.js"
import { createProduct, getOneProduct, listProducts } from '../../controllers/v1/productController.js'

const productRouter = express.Router()

productRouter.post('/', uploadImage.single('file'), createProduct)
productRouter.get('/all', listProducts)
productRouter.get('/:id', getOneProduct)

export default productRouter