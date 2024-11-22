import Product from "../../models/product.js"
import Category from "../../models/category.js"
import httpError from "../../utils/httpError.js"

/** Create Product */

export const createProduct = async (req, res, next) => {

    try {

        const { name, price, description, category, rate } = req.body

        if (!req.file || !req.file.path) {

            return next(new httpError("Product Image is required", 400))
        }

        if (!name || !price || !description || !category || !rate) {

            return next(new httpError("All fields are Mandatary", 400))
        }

        const isCategoryExist = await Category.findOne({ _id: category })

        if (!isCategoryExist) {

            return next(new httpError("Category Not found", 400))
        }

        const product_image = req.file.path.slice(8);

        const newProduct = new Product({ name, price, description, category, rate, product_image })
        await newProduct.save()

        res.status(201).json({
            message: "Product Added Successfully",
            data: null,
            status: true,
            access_token: null
        })

    } catch (error) {
        
        return next(new httpError("Failed to Create Product. Please try Again", 500))
    }

}


/** list ALl Products */

export const listProducts = async (req, res, next) => {

    try {

        const searchQuery = req.query.search || ''
        const searchRegex = new RegExp(searchQuery, 'i')

        const products = await Product.find(
            { $or: 
                [
                    { name: { $regex: searchRegex }}, 
                ]
             })
            .populate('category')
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "",
            data: products,
            status: true,
            access_token: null
        })

    } catch (error) {

        return next(new httpError("Failed to list Products. Please try Again", 500))
    }

}


/** GetOne Product */

export const getOneProduct = async (req, res, next) => {

    try {

        const { id } = req.params

        if (! id) {

            return next(new httpError("Product ID Required", 500))
        }

        const product = await Product.findOne({ _id: id }).populate('category')

        res.status(200).json({
            message: "",
            data: product,
            status: true,
            access_token: null
        })

    } catch (error) {

        return next(new httpError("Failed to get Product. Please try Again", 500))
    }

}