import Cart from "../model/cart";
import * as status from '../constants/status-code'

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

    // addTOCart = async (req, res, next) => {
    //     try {

    //     }
    // }
}

export default CartController