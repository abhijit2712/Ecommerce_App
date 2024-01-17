import express from 'express'
import { isAdmin, requiredSignIn } from '../middlerwares/authMiddleware.js';
import { categoryControlller, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from '../controllers/categorycontroller.js';

const router = express.Router();

//routes 

//create category
router.post('/create-category',requiredSignIn,isAdmin,createCategoryController);

//update category
router.put('/update-category/:id',requiredSignIn,isAdmin,updateCategoryController);

//get all category
router.get('/get-category',categoryControlller);


//single category
router.get('/single-category/:slug',singleCategoryController);

//delete route
router.delete('/delete-category/:id',requiredSignIn,isAdmin,deleteCategoryController);


export default router