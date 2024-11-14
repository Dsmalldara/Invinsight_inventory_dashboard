import { Router } from "express";
import { createProduct, deleteProduct, getProducts } from "../contollers/productController";

const router = Router()
router.get('/', getProducts)
router.post('/createproduct',createProduct)
router.delete(`/deleteProduct/:productId`, deleteProduct)
export default router;