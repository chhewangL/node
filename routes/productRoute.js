const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const userCheck = require('../middleware/authCheck')
const checkFile = require('../middleware/fileCheck');





router.post('/api/create-product', userCheck.adminCheck, checkFile.fileCheck, productController.createProduct)
router.get('/api/get-product', productController.getProduct);
router.get('/api/getProductById/:id', userCheck.adminCheck, productController.getProductById);
router.patch('/api/updateProduct/:id', userCheck.adminCheck, checkFile.updateCheck, productController.updateProductById);
router.delete('/api/deleteProduct/:id', userCheck.adminCheck, productController.deleteProduct);



module.exports = router;