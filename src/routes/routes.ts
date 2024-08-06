import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { productController } from "../controllers/product.controller";

const router = Router();

router.get("/user", userController.findAllUsers);
router.get("/user/:id", userController.findUser);
router.post("/user/create", userController.createUser);
router.put("/user/update/:id", userController.update);
router.put("/user/updatePassword/:id", userController.updatePassword);
router.delete("/user/delete/:id", userController.deleteUser);
router.delete("/user/:idUser/removeProduct/:idProduct", userController.deleteProduct);

router.get("/product", productController.findAll);
router.get("/product/:id", productController.findOne);
router.post("/product/create", productController.create);
router.put("/product/update/:id", productController.update);
router.delete("/product/delete/:id", productController.delete);

export default router;
