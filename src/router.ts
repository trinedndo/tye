import { Router } from "express";
import authController from "./controllers/auth.controller";
import bagController from "./controllers/bag.controller";
import brandController from "./controllers/brand.controller";
import productsController from "./controllers/product.controller";
import typeController from "./controllers/type.controller";

const router = Router();

router.get("/bag/:id", bagController.getOne);
router.post("/bag/create", bagController.create);

router.post("/sign", authController.sign);
router.post("/verif", authController.verif);

router.post("/bath", productsController.bath);
router.post("/create", productsController.create);
router.post("/update", productsController.update);
router.post("/delete", productsController.delete);
router.get("/products", productsController.getAll);
router.get("/products/:id", productsController.getOne);

router.post("/types/create", typeController.create);
router.post("/types/update", typeController.update);
router.post("/types/delete", typeController.delete);
router.get("/types", typeController.getAll);

router.post("/brands/create", brandController.create);
router.post("/brands/update", brandController.update);
router.post("/brands/delete", brandController.delete);
router.get("/brands", brandController.getAll);

export default router;
