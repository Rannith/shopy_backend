import { Router } from "express";
import CartController from "../controllers/cart-controller";
import isAuthenticateUser from "../middleware/authentication";
import role from "../model/role";

const router = Router();
const cartController = new CartController()

router.get('/', cartController.viewCart)
router.get('/:userId', cartController.viewMyCart)
router.post('/:productId/:userId', cartController.addToCart)
router.delete('/:id', cartController.removeFromCart)
router.put('/:productId/:userId', cartController.updateQuantity)

export default router
