const jwt = require('jsonwebtoken');


module.exports.adminCheck = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decode = jwt.decode(token, 'cJsonToken');
    // console.log(decode)
    if (decode === null) {
      return res.status(401).json({
        status: 'error',
        msg: 'login first'
      })

    }
    else if (decode.isAdmin === false) {
      return res.status(404).json({
        status: 'error',
        msg: 'unauthorized user'
      })
    }
    else return next();

  } catch (err) {
    return res.status(400).json({
      status: 'error',
      msg: 'bad request'
    })

  }
}