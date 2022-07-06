import Cart from '../model/cart';
import BaseController from './base-controller'
import * as status from '../constants/status-code'

const baseController = new BaseController()

class CartController {

    viewCart = async (req, res, next) => {
        try {
            let cart = await Cart.find()

            if (cart.length <= 0)
                throw "Empty Cart"

            return res.status(status.SUCCESS).json({ cart })
        }
        catch (err) {
            return res.status(status.NOT_FOUND).json({ error: err })
        }
    }

    addToCart = async (req, res, next) => {
        try {
            let productId = req.params.productId
            let userId = req.params.userId

            let cart = new Cart({
                productId,
                userId
            })

            let cartObj = await cart.save()
            console.log("Cart obj"+cartObj);
            
            await baseController.addCartIdToUser(cartObj._id.toString(), userId)

            return res.status(status.SUCCESS).json({message: "Product added successfully"})
        }
        catch (err) {
            return res.status(status.INTERNAL_SERVER_ERROR).json({error: err})
        }
    }
}

export default CartController