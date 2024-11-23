import User from "../../models/user.js"
import httpError from "../../utils/httpError.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


/** Create User */

export const createUser = async (req, res, next) => {

    try {
        
        const {first_name, last_name, email, password, phone, address} = req.body

        let image

        if (req.file && req.file.path) {

            image = req.file.path.slice(8)
        }

        if (! first_name || ! last_name || ! email || ! password || ! phone || ! address) {

            return next(new httpError("All fields are Mandatary", 400))
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

        if (! emailRegex.test(email)) {

            return next(new httpError("Invalid email format!", 400));
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

        if (! passwordRegex.test(password)) {

            return next(new httpError("Password must be at least 6 characters long, include at least one uppercase letter, one number, and one special character", 400));
        }

        const phoneRegex = /^\d{10}$/;

        if (! phoneRegex.test(phone)) {

            return next(new httpError("Phone number must be exactly 10 digits", 400));
        }

        const isExistingUser = await User.findOne({ $or: [{ email }, { phone }] })

        if (isExistingUser) {

            return next(new httpError("An User with this email or this Phone number already exists", 409));
        }

        let cart

        if (req.body.cart) {

            cart = req.body.cart

        } else {

            cart= []
        }

        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_VALUE) || 10);

        const newUser = new User({
            first_name, 
            last_name, 
            email, 
            password: hashedPassword, 
            phone,
            address, 
            image, 
            cart
        })

        await newUser.save()

        res.status(200).json({ 
            message: "User created Successfully", 
            data: null, 
            status: true, 
            access_token: null
        })

    } catch (error) {
        console.log(error);
        
        return next(new httpError("Failed to create User. Please try Again", 500))
    }

}

/** Get One User */

export const getOneUser = async (req, res, next) => {

    try {

        const { id } = req.params

        if (! id) {

            return next(new httpError("User ID Required", 400))
        }

        const isExistingUser = await User.findOne({ _id: id })

        if (! isExistingUser) {

            return next(new httpError("User Not Found", 404))
        }

        const user = await User.findOne({ _id: id }).select('-password')
        res.status(200).json({ 
            message: '', 
            data: user, 
            status: true, 
            access_token: null
        })
        
    } catch (error) {

        return next(new httpError("Failed to get User. Please try Again", 500))
    }

}

/** Login User */

export const userLogin = async (req, res, next) => {

    try {

        const {email, password} = req.body

        if (! email || ! password) {

            return next(new httpError("Email and password are required", 400));
        }

        const user = await User.findOne({ email });

        if (! user) {

            return next(new httpError("Invalid email or password", 401));
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (! isPasswordCorrect) {

            return next(new httpError("Invalid email or password", 401));
        }

        const jwtSecret = process.env.JWT_SECRET;

        if (! jwtSecret) {

            return next(new httpError("Server error: Missing JWT secret", 500));
        }

        const token = jwt.sign({ id: user._id }, jwtSecret,{ expiresIn: process.env.JWT_TOKEN_EXPIRY });

        res.status(200).json({
            message: "Login successful",
            access_token: token,
            status: true,
            data: null
        });
        
    } catch (error) {

        return next(new httpError("Failed to Login User. Please try Again", 500))
    }
}