import Role from '../model/role'
import User from '../model/user'
import Product from '../model/product'
import ProductCategory from '../model/product-category'
import ProductType from '../model/product-type'
import * as status from '../constants/status-code'

class BaseController {

    getRoleId = async (value, res) => {
        try {
            let role = await Role.findOne({ roleType: value })
            
            if (!role)
                throw "Role Not Available"
            return role._id.toString()
        }
        catch (err) {
            return res.status(status.NOT_FOUND).json({ error: err }) //Need to change
        }
    }

    getProductCategoryId = async (value, res) => {
        try {
            
            let productCategory = await ProductCategory.findOne({ productCategory: value })
            
            if (!productCategory)
                throw "Product Category Not Available"
            return productCategory._id.toString()
        }
        catch (err) {
            return res.status(status.SUCCESS).json({ error: err })
        }
    }

    getProductTypeId = async (value, res) => {
        try {
            let productType = await ProductType.findOne({ productType: value })
            if (!productType)
                throw "Product Type Not Available"
            return productType._id.toString()
        }
        catch (err) {
            return res.status(status.NOT_FOUND).json({ error: err })
        }
    }

    addCartIdToUser = async (cartsId, userId) => {
        try {
            let user = await User.findOne({ _id: userId })
    
            await user.updateOne({ $push: { cartId: cartsId } })
            

            if (!user)
                throw "Unable to Add Cart"
            return user
        }
        catch (err) {
            return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err })
        }
    }

    getCategorizedProduct = async (category) => {
        let productCategory = await ProductCategory.findOne({ productCategory: category });
        let products = await Product.find({ productCategoryId: productCategory._id })

        return products;
    }

    getPopularProductType = async (type) => {
        let popularProduct = await ProductType.findOne({ productType: type })
        let products = await Product.find({productTypeId: popularProduct._id})
        return products;
    }

}

export default BaseController