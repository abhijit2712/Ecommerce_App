import express from 'express'
import {loginController, registerController, testController,forgotPasswordController, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController} from '../controllers/authController.js';
import { isAdmin, requiredSignIn } from '../middlerwares/authMiddleware.js';
import { ok } from 'assert';


//router object
const router = express.Router();


//routing
//register || method post
router.post('/register',registerController);

//login || post
router.post('/login',loginController);

//forgot Password || POST
router.post('/forgotPassword', forgotPasswordController);


//test routes
router.get('/test',requiredSignIn,isAdmin,testController);

//proetcted user routes
//protected User route auth
router.get("/user-auth", requiredSignIn, (req, res) => {
    res.status(200).send({ ok: true });
  });

  //protected Admin route auth
  router.get("/admin-auth", requiredSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
  });

  //update profile
router.put("/profile", requiredSignIn, updateProfileController);
  
router.get("/orders", requiredSignIn, getOrdersController);

router.get("/all-orders", requiredSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requiredSignIn,
  isAdmin,
  orderStatusController
);

export default router;