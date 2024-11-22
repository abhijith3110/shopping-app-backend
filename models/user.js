import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(

    {
        first_name: {
            type: String,
            required: true
        },

        last_name: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true
        },

        password: {
            type: String,
            required: true
        },

        phone: {
            type: Number,
            required: true
        },

        address: {
            type: String,
            required: true
        },

        cart: {
            type: [
                {
                    product: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'product',
                        required: true,
                    },

                    quantity: {
                        type: Number,
                        default: 1,
                        required: true,
                    }
                }
            ],

            default: [],
        }
    },

    {
        timestamps: true
    }

)

const User = mongoose.model('user', userSchema)

export default User