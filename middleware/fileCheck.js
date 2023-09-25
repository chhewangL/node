
const path = require('path');
const fs = require('fs')

module.exports.fileCheck = (req, res, next) => {
  // console.log(req)
  if (req.files?.product_image) {
    const file = req.files.product_image;
    const validExt = ['.jpg', 'jpeg', 'png'];
    if (validExt.includes(path.extname(file.name))) {
      file.mv(`./uploads/${file.name}`, (err) => { })
      req.product_image = `/uploads/${file.name}`
      return next();
    }
    else {
      return res.status(404).json({
        status: 'error',
        msg: 'upload valid image'
      })
    }




  }
  else {
    return res.status(404).json({
      status: 'error',
      msg: 'upload image'
    })
  }
}


module.exports.updateCheck = (req, res, next) => {
  // console.log(req.files, req.body)
  if (req.files?.product_image && req.body?.oldImage) {
    const file = req.files.product_image;
    const validExt = ['.jpg', '.jpeg', '.png', '.PNG'];
    if (validExt.includes(path.extname(file.name))) {
      file.mv(`./uploads/${file.name}`, (err) => {
        if (err) {

        }
        fs.unlink(`.${req.body.oldImage}`, (err) => {

        })

      });
      req.product_image = `/uploads/${file.name}`;
      next();


    } else {
      return res.status(401).json({
        status: "error",
        msg: "provide valid image"
      })
    }

  } else {
    next();
  }
}