import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(

    {

        name: {
            type: String,
            reqired: true
        },

        price: {
            type: Number,
            reqired: true
        },

        description: {
            type: String,
            reqired: true
        },

        product_image: {
            type: String,
            reqired: true
        },

        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'category',
            reqired: true
        },

        rate: {
            type: Number,
            reqired: true
        },

    },

    {
        timestamps: true
    }

)

const Product = mongoose.model('product', productSchema)

export default Product