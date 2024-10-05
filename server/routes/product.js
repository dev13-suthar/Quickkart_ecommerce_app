import express from "express";
import { categoriesWithProducts, getAllNewArrivals, getNewArrival,getOneCategory,getProductWithID } from "../controllers/product.js";
import { verifyJWT } from "../middleware/auth.js";

const router = express.Router();
router.get("/productsWithCategory",categoriesWithProducts)
router.get("/category/:categoryName",verifyJWT,getOneCategory)
router.get("/newArrival",getNewArrival);
router.get("/newArrival/more",getAllNewArrivals);
router.get("/:id",verifyJWT,getProductWithID);


export default router;
