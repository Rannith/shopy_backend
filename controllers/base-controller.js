import Role from '../model/role'
import User from '../model/user'
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

    addCartIdToUser = async (cartsId, userId) => {
        try {
            let cartArray = []

            let user = await User.findOne({_id: userId})
            console.log("User : "+user)
            await user.updateOne({$push : {cartId : cartsId}})
            // console.log("user : ", user);
            // user.cartId.forEach(element => {
            //     // console.log("element"+ element);
            //     cartArray.push[element]
            // });
            
            // cartArray.push(cartId);
            // console.log("user : ",user)
            // console.log("cart id : ",cartsId)
            // console.log("userId : ",userId)
            // const check = await User.findOneAndUpdate({_id: userId},{$push : {cartId : cartsId}})
            console.log("Cart added successfully : ")
            
            if(!user)
            throw "Unable to Add Cart"
            return user
        }
        catch (err) {
            return res.status(status.INTERNAL_SERVER_ERROR).json({error: err})
        }
    }

}

export default BaseController