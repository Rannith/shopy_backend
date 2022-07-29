import { Router } from "express";
import CartController from "../controllers/cart-controller";
import isAuthenticateUser from "../middleware/authentication";

const router = Router();
const cartController = new CartController()

router.get('/', isAuthenticateUser, cartController.viewCart)
router.get('/:userId', isAuthenticateUser, cartController.viewMyCart)
router.post('/:productId/:userId', isAuthenticateUser, cartController.addToCart)
router.delete('/:id',  cartController.removeFromCart)
router.put('/:productId/:userId', isAuthenticateUser, cartController.updateQuantity)

export default router
