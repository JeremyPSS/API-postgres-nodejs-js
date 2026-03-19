const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

router.get("/", productController.getProducts);
router.get("/:id", productController.getProductsByID);
router.delete("/:id", productController.deleteProduct);
router.put("/:id", productController.updateProduct);
router.post("/", productController.createProduct);

module.exports = router;
