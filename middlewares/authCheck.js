import jwt from 'jsonwebtoken';
import httpError from '../utils/httpError.js';
import User from '../models/user.js';

export const userAuthCheck = (req, res, next) => {

    try {

        const JWT_SECRET = process.env.JWT_SECRET;
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {

            return next(new httpError("Authentication token required", 401));
        }

        const token = authHeader.split(" ")[1];

        jwt.verify(token, JWT_SECRET, async (err, decoded) => {

            if (err) {

                return next(new httpError("Invalid or expired token", 401));
            }

            req.user = decoded;

            try {

                const validUser = await User.findOne({ _id: decoded.id});

                if (!validUser) {

                    return next(new httpError("Unauthorized - User not found or inactive", 404));
                }

                next();
                
            } catch (dbError) {

                return next(new httpError("Database error during User validation", 500));
            }
        })
        
    } catch (error) {
        
        return next(new httpError("Server error during authentication", 500));
    }
}
