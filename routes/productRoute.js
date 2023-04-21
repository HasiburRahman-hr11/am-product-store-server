const { addNewProduct, getAllProducts, getSingleProduct, editProduct, deleteProduct } = require("../controllers/productController");

const router = require("express").Router();

router.get('/product/all-products' , getAllProducts);
router.get('/product/get-product/:id' , getSingleProduct);

router.post('/admin/product/add-product' , addNewProduct);
router.put('/admin/product/edit-product/:id' , editProduct);
router.delete('/admin/product/delete-product/:id' , deleteProduct);

module.exports = router;