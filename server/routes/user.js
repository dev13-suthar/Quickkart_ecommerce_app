import express from "express";
import {getUserInfo,addToWishList,removeProductFromList,addToCart, removeFromCart, usersOrders } from "../controllers/user.js";
const router = express.Router();

router.get('/:id',getUserInfo);
router.get('/userOrders/:id',usersOrders)
router.post('/addtowishlist/',addToWishList);
router.post('/addToCart',addToCart)
router.delete('/removeFromList/:userId/:productId',removeProductFromList)
router.delete('/removeFromCart',removeFromCart)


export default router;
