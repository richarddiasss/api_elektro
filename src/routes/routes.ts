import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { productController } from "../controllers/product.controller";
import passport from "passport";
import { ValidatorMiddleware } from "../middlewares/validator.middleware";
import { Validator } from "../config/validator";
import { photoUpload } from "../config/uploader";

const router = Router();

router.get("/user", userController.findAllUsers);
router.get("/user/:id", userController.findUser);
router.get("/login", userController.login);
router.post("/user", Validator.validatorUser("createUser"), ValidatorMiddleware.validateResult, userController.createUser);
router.put("/user", Validator.validatorUser("update") ,ValidatorMiddleware.validateResult, passport.authenticate('jwt', {session: false}) ,userController.update);
router.put("/user/updatePassword/", Validator.validatorUser("updatePassword") ,ValidatorMiddleware.validateResult, passport.authenticate('jwt', {session: false}) , userController.updatePassword);
router.delete("/user", passport.authenticate('jwt', {session: false}) ,userController.deleteUser);
router.delete("/user/removeProduct/:idProduct", passport.authenticate('jwt', {session: false}) ,userController.deleteProduct);

router.post("/user/image", photoUpload.single("image"), async (req,res) => {

    try{
        res.status(201).json({message:"Arquivo enviado Com Sucesso!"})
    }catch(error:any){
        res.status(500).json({message:error.messsage})
    }

});

router.get("/product", productController.findAll);
router.get("/product/:id", productController.findOne);
router.post("/product", Validator.validatorProduct("create"), ValidatorMiddleware.validateResult, passport.authenticate('jwt', {session: false}), productController.create);
router.put("/product/:id", Validator.validatorProduct("update"), ValidatorMiddleware.validateResult, passport.authenticate('jwt', {session: false}), productController.update);
router.delete("/product/:id", passport.authenticate('jwt', {session: false}), productController.delete);

export default router;
