import express from 'express'
import {uploadImage} from "../../middlewares/multer/fileUpload.js"
import { createUser, getOneUser, userLogin } from '../../controllers/v1/userController.js'
import { userAuthCheck } from '../../middlewares/authCheck.js'

const userRouter = express.Router()

userRouter.post('/', uploadImage.single('file'), createUser)
userRouter.post('/login', userLogin)
userRouter.use(userAuthCheck)
userRouter.get('/:id', getOneUser)

export default userRouter