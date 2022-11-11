import { Router } from "express";
import authCheck from "../utils/authCheck.js";
import 
{
    getProducts, 
    getProduct, 
    removeProductFromCart, 
    addProductToCart, 
    getProductsFromCart,
    addProductToLiked,
    removeProductFromLiked,
    getProductsFromLiked,
    addProductInCartNumber,
    removeProductInCartNumber
}
from "../controllers/productsController.js";

const router = Router();

router.get('/get-products', getProducts);
router.get('/get-product', getProduct);
router.post('/add-product-to-cart', addProductToCart);
router.post('/remove-product-to-cart', removeProductFromCart);
router.get('/get-products-from-cart', getProductsFromCart);
router.post('/add-product-to-liked', addProductToLiked);
router.post('/remove-product-to-liked', removeProductFromLiked);
router.post('/get-liked-products', authCheck, getProductsFromLiked);
router.post('/add-product-in-cart-number', addProductInCartNumber);
router.post('/remove-product-in-cart-number', removeProductInCartNumber);

export default router;