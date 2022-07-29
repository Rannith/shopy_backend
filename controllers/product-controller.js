import Product from '../model/product'
import * as status from '../constants/status-code'
import BaseController from './base-controller'
import ProductCategory from '../model/product-category'


const baseController = new BaseController()

class ProductController {

    viewProducts = async (req, res, next) => {
        try {
            const category = req.query.category;

            if (!category) {
                let products = await Product.find();
                if (products.length <= 0)
                    throw "No Products available"
                return res.status(status.SUCCESS).json({ products })
            }
            else {
                const products = await baseController.getCategorizedProduct(category);
                if (!products) {
                    throw "No products available at given category"
                }
                return res.status(status.SUCCESS).json({ products })
            }
        }
        catch (err) {
            return res.status(status.NOT_FOUND).json({ error: err })
        }
    }

    viewNewProduct = async (req, res) => {
        try {
            const type = req.query.productType;

            if (type === "popular_product") {
                const products = await baseController.getPopularProductType(type)
                if (products.length < 1) {
                    throw "No products available at given category"
                }

                return res.status(status.SUCCESS).json({ products })
            }
            else {
                const products = await baseController.getPopularProductType(type)
                if (products.length <= 0) {
                    throw "No products available at given category"
                }

                return res.status(status.SUCCESS).json({ products })
            }
        }
        catch (err) {
            return res.status(status.NOT_FOUND).json({ error: err })
        }
    }

    viewProduct = async (req, res, next) => {
        try {
            let productId = req.params.id;
            
            if (productId.length !== 24)
                throw "Invalid Object Id"
            let product = await Product.findById(productId)
            if (!product)
                throw "No product found with that id mentioned"

            
            return res.status(status.SUCCESS).json({ product })
        }
        catch (err) {
            return res.status(status.NOT_FOUND).json({ error: err })
        }
    }

    addProduct = async (req, res, next) => {
        try {
            const { productName, productImageUrl, oldPrice, newPrice, productCategory, productType } = req.body;

            if (await Product.findOne({ productName: productName }))
                throw "This product has already been added"

            let productCategoryId = await baseController.getProductCategoryId(productCategory, res)
            let productTypeId = await baseController.getProductTypeId(productType, res)

            let product = new Product({
                productName,
                productImageUrl,
                oldPrice,
                newPrice,
                productCategoryId,
                productTypeId
            })
            await product.save()

            return res.status(status.CREATED).json({ message: "Product Added Successfully" })
        }
        catch (err) {
            return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err })
        }
    }

    updateProduct = async (req, res, next) => {
        try {
            const { productName, productImageUrl, oldPrice, newPrice } = req.body;
            let productId = req.params.id;

            if (productId.length !== 24)
                throw "Invalid Object Id"

            if (! await Product.findById(productId))
                throw "No Product Available With this Given Product Id"

            let product = await Product.findByIdAndUpdate(productId, {
                productName,
                productImageUrl,
                oldPrice,
                newPrice
            })

            await product.save()

            return res.status(status.SUCCESS).json({ message: "Product Updated Successfully" })
        }
        catch (err) {
            return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err })
        }
    }

    deleteProduct = async (req, res, next) => {
        try {
            let productId = req.params.id;

            if (productId.length !== 24)
                throw "Invalid Object Id"
            let product = await Product.findByIdAndDelete(productId);
            if (!product)
                throw "Unable to Delete this Id"

            return res.status(status.SUCCESS).json({ message: "Product Deleted Successfully" })
        }
        catch (err) {
            return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err })
        }
    }

    getProductCategory = async (req, res) => {
        try {
            let productCategory = await ProductCategory.find()

            if (!productCategory)
                throw "No Product category available"

            return res.status(status.SUCCESS).json({ productCategory })
        }
        catch (err) {
            return res.status(status.NOT_FOUND).json({ error: err })
        }
    }
}

export default ProductController