
const product = require('../model/product');
const fs = require('fs');


module.exports.createProduct = async (req, res) => {
  try {
    const { productName, productDiscription, price } = req.body;
    await product.create({
      productName,
      productDiscription,
      price,
      productImage: req.product_image

    })
    return res.status(200).json({
      status: 'success',
      msg: 'product created sucessfully'
    })


  } catch (err) {
    return res.status(400).json({
      status: 'error',
      msg: "bad request hola"
    })

  }

}

module.exports.getProduct = async (req, res) => {
  try {
    const products = await product.find();
    return res.status(200).json(products);


  } catch (err) {
    return res.status(400).json({
      status: 'error',
      msg: `${err}`
    })
  }
};


module.exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const products = await product.findById(id);
    return res.status(200).json(products);

  } catch (err) {
    return res.status(400).json({
      status: 'error',
      msg: `${err}`
    })

  }
};


module.exports.updateProductById = async (req, res) => {
  const {
    productName,
    price,
    productDiscription
  } = req.body;
  try {
    if (req.product_image) {
      const response = await product.findByIdAndUpdate({ _id: req.params.id }, {
        productName,
        price,
        productDiscription,
        productImage: req.product_image
      })
      return res.status(200).json({
        status: 'sucess',
        msg: "updated sucessfully"
      })
    } else {
      const response = await product.findByIdAndUpdate({ _id: req.params.id }, {
        productName,
        price,
        productDiscription,
      })
      return res.status(200).json({
        status: 'sucess',
        msg: "updated sucessfully"
      })

    }

  } catch (err) {
    return res.status(400).json({
      status: "error",
      msg: `${err}`
    })

  }
}

module.exports.deleteProduct = async (req, res) => {
  const {
    productImage
  } = req.body;
  try {
    await product.findByIdAndDelete({ _id: req.params.id });
    fs.unlink(`.${productImage}`, (err) => {

    })
    return res.status(200).json({
      status: 'success',
      msg: 'product deleted sucessfully'
    })

  } catch (err) {
    return res.status(400).json({
      status: 'error',
      msg: `${err}`
    })

  }
}