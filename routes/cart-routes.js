import { Router } from "express";
import CartController from "../controllers/cart-controller";
import isAuthenticateUser from "../middleware/authenticate";

const router = Router();
const cartController = new CartController()

router.get('/', cartController.viewCart)

export default router
