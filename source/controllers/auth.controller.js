import { Router } from "express";
import * as authService from "../services/authAdmin/index.js";
import { JoiMiddleware } from "../helpers/middlewares/JoiMiddleware.js";
import loginSchema from "../helpers/schema/login.schema.js";
import * as customerService from "../services/customers/index.js";
import authenticateWithJwt from "../helpers/functions/authfuctionJwt.js";
import customerSchema from "../helpers/schema/customer.schema.js";
import checkoutSchema from "../helpers/schema/checkout.schema.js";

const authRouter = Router();

authRouter.post(
  "/login",

  JoiMiddleware(loginSchema),
  authService.login
);
authRouter.post("/logout", authenticateWithJwt, authService.logout);
authRouter.post(
  "/customer",
  JoiMiddleware(customerSchema),
  authenticateWithJwt,
  customerService.customerReg
);
authRouter.post(
  "/checkout",
  JoiMiddleware(checkoutSchema),
  authenticateWithJwt,
  customerService.checkout
);
export default authRouter;
