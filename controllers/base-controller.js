import Role from '../model/role'
import ProductCategory from '../model/product-category'
import ProductType from '../model/product-type'
import * as status from '../constants/status-code'

class BaseController {

    getRoleId = async (value, res) => {
        try {
            console.log("in base class")
            let role = await Role.findOne({ roleType: value })
            console.log("base role:"+role)
            if (!role)
                throw "Role Not Available" 
            return role._id.toString()
        }
        catch (err) {
            return res.status(status.SUCCESS).json({message: "Sucessfully created"})
        }
    }

    getProductCategoryId = async (value, res) => {
        try {
            let productCategory = await ProductCategory.findOne({productCategory: value})
            if(!productCategory)
            throw "Product Category Not Available"
            return productCategory._id.toString()
        }
        catch (err) {
            return res.status(status.SUCCESS).json({error: err})
        }
    }

    getProductTypeId = async (value, res) => {
        try {
            let productType = await ProductType.findOne({productType: value})
            if(!productType)
            throw "Product Type Not Available"
            return productType._id.toString()
        }
        catch (err) {
            return res.status(status.NOT_FOUND).json({error: err})
        }
    }
}

export default BaseController