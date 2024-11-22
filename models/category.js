import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema(

    {

        name: {
            type: String,
            enum: ['men', 'women', 'kids'],
            required: true
        },

        category_image: {
            type: String,
            required: true
        }

    },

    {
        timestamps: true
    }

)

const Category = mongoose.model('category', categorySchema)

export default Category