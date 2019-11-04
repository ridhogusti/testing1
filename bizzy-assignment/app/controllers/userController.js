
const  HTTPStatus = require("http-status")

const User = require("../models/user");

function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

const signUp = async (req, res) => {
  try {
    
    const validate = validateEmail(req.body.email);
    const emailIsAlready = await User.find({ email: req.body.email });
    if (!validate) {
      // format email
      return res.status(HTTPStatus.BAD_REQUEST).json({
        email: req.body.email,
        message: "is invalid",
        status: false
      });
    } else if (emailIsAlready.length > 0) {

      // cek email apakah sudah ada di database
      return res.status(HTTPStatus.CONFLICT).json({
        email: req.body.email,
        message: "Email has already been used",
        status: false
      });
    } else {
      const user = await User.create({ ...req.body, status: true });
      // status CREATED 201, OK 200
      return res.status(HTTPStatus.OK).json({
        id: user._id,
        name: user.name,
        email: user.email,
        status: user.status
      });
    }
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

module.exports = signUp
