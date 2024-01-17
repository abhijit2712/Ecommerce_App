import express from "express";
import { isAdmin, requiredSignIn } from '../middlerwares/authMiddleware.js';
import { braintreePaymentController, braintreeTokenController, createProductController, deleteProductController, getProductController, getSingleProductController, productCategoryController, productCountController, productFiltersController, productListController, productPhotoController, realtedProductController, searchProductController, updateProductController } from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

//routes
router.post('/create-product',requiredSignIn,isAdmin,formidable(),createProductController);

//update
router.put('/update-product/:pid',requiredSignIn,isAdmin,formidable(),updateProductController);

//get product
router.get('/get-product',getProductController);

//get single product
router.get('/get-product/:slug',getSingleProductController);


//get photo
router.get('/product-photo/:pid',productPhotoController);

//delete route
router.delete('/product/:pid',deleteProductController);

//filter product
router.post('/product-filters',productFiltersController);

//pagination count
router.get('/product-count',productCountController);

//product per page
router.get('/product-list/:page',productListController);


//search product
router.get("/search/:keyword", searchProductController);

//similar product
router.get("/related-product/:pid/:cid", realtedProductController);

//category wise product
router.get("/product-category/:slug", productCategoryController);


//payement routes
//token
router.get('/braintree/token',braintreeTokenController);


//payment
router.post('/braintree/payment',requiredSignIn,braintreePaymentController);


export default router