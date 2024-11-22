import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema(

    {
        status: {
            type: String,
            enum: ['pending', 'completed', 'failed'],
            default: 'pending'
        },

        product: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'product',
            required: true
        },

        amount: {

            mode: {
                type: String,
                enum: ['cod', 'online'],
                required: true
            },

            sub_total: {
                type: Number,
                required: true
            },

            tax: {
                type: Number,
                required: true
            },

            delivery_fee: {
                type: Number,
                required: true
            },

            discount: {
                type: Number,
                default: null
            },

            grand_total: {
                type: Number,
                required: true
            },

        },

        payment: {

            stripe_id: {
                type: String,
                required: true
            },

            paid_at: {
                type: String,
                required: true
            },

            status: {
                type: String,
                enum: ['pending', 'completed', 'failed'],
                default: 'pending'
            },

        }
    },

    {
        timestamps: true
    }

)

const Order = mongoose.model('order', orderSchema)

export default Order