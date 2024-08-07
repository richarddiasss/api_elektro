import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { productController } from "../controllers/product.controller";
import passport from "passport";
import { ValidatorMiddleware } from "../middlewares/validator.middleware";
import { Validator } from "../config/validator";

const router = Router();

router.get("/user", userController.findAllUsers);
router.get("/user/:id", userController.findUser);
router.get("/login", userController.login);
router.post("/user/create", Validator.validatorUser("createUser"), ValidatorMiddleware.validateResult, userController.createUser);
router.put("/user/update/", Validator.validatorUser("update") ,ValidatorMiddleware.validateResult, passport.authenticate('jwt', {session: false}) ,userController.update);
router.put("/user/updatePassword/", Validator.validatorUser("updatePassword") ,ValidatorMiddleware.validateResult, passport.authenticate('jwt', {session: false}) , userController.updatePassword);
router.delete("/user/delete/", passport.authenticate('jwt', {session: false}) ,userController.deleteUser);
router.delete("/user/removeProduct/:idProduct", passport.authenticate('jwt', {session: false}) ,userController.deleteProduct);

router.get("/product", productController.findAll);
router.get("/product/:id", productController.findOne);
router.post("/product/create", passport.authenticate('jwt', {session: false}), productController.create);
router.put("/product/update/:id", productController.update);
router.delete("/product/delete/:id", productController.delete);

export default router;
