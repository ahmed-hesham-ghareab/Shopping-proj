const { getAllProducts, getSpacProduct, updateProduct, deleteProduct, createProduct } = require("../controller/product.controller");
const { validateProduct } = require("../validation/validation");

const router = require("express").Router();

router.post("/addproduct",validateProduct,createProduct);
router.get("/products",getAllProducts);
router.get("/product/:id",getSpacProduct);
router.put("/updateproduct/:id",updateProduct);
router.delete("/deleteproduct/:id",deleteProduct);


module.exports = router;
