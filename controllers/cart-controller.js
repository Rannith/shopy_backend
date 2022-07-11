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

    viewMyCart = async (req, res) => {
        try {
            let userId = req.params.userId

            let userCart = await Cart.find({ userId: userId }).populate({ path: 'productId' });
            // await userCart.forEach(element => console.log(element.productId))

            return res.status(status.SUCCESS).json({ userCart })
        }
        catch (err) {
            return res.status(status.NOT_FOUND).json({ error: err })
        }
    }

    addToCart = async (req, res, next) => {
        try {
            let productId = req.params.productId
            let userId = req.params.userId

            if (await Cart.findOne({ productId: productId, userId: userId })) {
                console.log("in Duplicate product in same cart")
                console.log("CHECK : " + userId);
                await Cart.updateOne({ userId: userId, productId: productId }, { $inc: { quantity: 1 } })

                return res.status(status.SUCCESS).json({ message: "Cart Updated Successfully" })
            }
            else {
                let cart = new Cart({
                    productId,
                    userId
                })

                let cartObj = await cart.save()
                console.log("Cart obj" + cartObj);

                await baseController.addCartIdToUser(cartObj._id.toString(), userId)

                return res.status(status.SUCCESS).json({ message: "Product Added Successfully" })
            }
        }
        catch (err) {
            return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err })
        }
    }

    updateQuantity = async (res, req, next) => {
        try {
            let productId = req.params.productId
            let userId = req.params.userId

            console.log("UP QTY PROID : ", req)
            console.log("UP QTY userId : ", req.baseUrl)

            const quantity = await Cart.findOne({ productId: productId, userId: userId })
            console.log("IN UP QTY : ", quantity)

            return res.status(status.SUCCESS).json({message: "Cart Updated Successfully"})
        }
        catch (err) {
            console.log("ERROR : ", err)
        }
    }

    removeFromCart = async (req, res) => {
        try {
            console.log("IN Remove cart");
            let cartId = req.params.id;

            if (cartId.length !== 24)
                throw "Invalid Object Id"
            let cart = await Cart.findByIdAndDelete(cartId)
            if (!cart)
                throw "Unable to delete cart"

            return res.status(status.SUCCESS).json({ message: "Cart deleted Successfully" })
        }
        catch (err) {
            return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err })
        }
    }
}

export default CartController