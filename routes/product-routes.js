import { Router } from "express";
const router = Router();
import productController from '../controllers/product-controller'
import isAuthenticateUser from "../middleware/authentication";

const product = new productController();

router.get('/', product.viewProducts)
router.get('/view', product.viewNewProduct)
router.get('/product-category', product.getProductCategory)
router.get('/:id', product.viewProduct )
router.post('/', product.addProduct)
router.put('/:id', product.updateProduct)
router.delete('/:id', product.deleteProduct)

export default router