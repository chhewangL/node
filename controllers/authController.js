
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../model/User')

module.exports.userLogin = async (req, res) => {
  // console.log(req.body)
  const { email, password } = req.body;
  try {
    const userExist = await user.findOne({ email });
    if (userExist) {
      const validPwd = bcrypt.compareSync(password, userExist.password);
      if (validPwd) {
        const token = jwt.sign({ id: userExist._id, isAdmin: userExist.isAdmin }, 'cJsonToken');
        return res.status(200).json({
          email,
          token,
          shippingAddress: userExist.shippingAddress,
          isAdmin: userExist.isAdmin
        })
      }
      else {
        return res.status(401).json({
          statue: 'error',
          message: "check your password"
        })
      }


    }

    else {
      return res.status(404).json({
        status: "error",
        message: "user doesnot exist"

      })


    }


  }
  catch (err) {
    return res.status(400).json({
      status: "error",
      msg: `${err}`
    })
  }
};

module.exports.userRegister = async (req, res) => {
  // console.log(req.body)
  const { email, password, fullname } = req.body;
  try {
    const hasspas = await bcrypt.hash(password, 12);
    await user.create({
      email,
      password: hasspas,
      fullname

    });
    return res.status(200).json({
      status: "sucess",
      msg: "user added"
    })
  }
  catch (err) {
    return res.status(400).json({
      status: "error",
      msg: `user not created`
    })
  }
}
