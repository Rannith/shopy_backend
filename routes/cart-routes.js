import { Router } from "express";
import CartController from "../controllers/cart-controller";
import isAuthenticateUser from "../middleware/authentication";
import role from "../model/role";

const router = Router();
const cartController = new CartController()

router.get('/', cartController.viewCart)
router.post('/:userId/:productId', cartController.addToCart)

export default router
