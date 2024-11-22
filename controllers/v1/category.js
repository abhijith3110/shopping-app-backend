import Category from "../../models/category.js"
import httpError from "../../utils/httpError.js"

/** Create Category */

export const createCategory = async (req, res, next) => {

    try {
        
        const {name} = req.body

        if (! name) {

            return next(new httpError("category name is required",400))
        }

        if (! req.file || ! req.file.path) {
            
            return next(new httpError("category Image is required",400))
        }
        
        const category_image = req.file.path.slice(8);

        const isCategoryNameExist = await Category.findOne({ name })

        if (isCategoryNameExist) {

            return next(new httpError("This Category is already exist",400))
        }

        const newCategory = new Category({ name, category_image })
        await newCategory.save()

        res.status(201).json({ 
            message: "Category Added Successfully", 
            data: null, 
            status: true, 
            access_token: null
        })

    } catch (error) {
        console.log(error);
        
        return next(new httpError("Failed to Create Category, Please try again", 500))
    }

}


/** List All Categories */

export const listCategories = async (req, res, next) => {

    try {

        const searchQuery = req.query.search  || ''
        const searchRegex = new RegExp(searchQuery, 'i')

        const categories = await Category.find({ $or: [{ name: { $regex: searchRegex } }]}).sort({ createdAt: -1 });

        res.status(200).json({ 
            message: '', 
            data: categories, 
            status: true, 
            access_token: null 
        })
        
    } catch (error) {
        
        return next(new httpError("Failed to list Categories, Please try again", 500))
    }

}


