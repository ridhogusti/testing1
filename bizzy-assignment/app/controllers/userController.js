const HTTPStatus = require("http-status");

const User = require("../models/user");

function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

const userFunc = {};

userFunc.create = async (req, res) => {
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
};

userFunc.getAll = async (req, res) => {
  try {
    let users = await User.find({});
    return res.status(HTTPStatus.OK).json({
      statusCode: 200,
      result: users
    });
  } catch (error) {
    res.status(500).send({
      statusText: "Internal server error",
      statusCode: 500,
      message: error.message
    });
  }
};

userFunc.put = async (req, res) => {
  try {
    const { email, name, status } = req.body;
    let tempUser = await User.findByIdAndUpdate(req.params.id);

    if (!tempUser) {
      return res.status(HTTPStatus.NOT_FOUND).json({
        statusCode: 404,
        message: "ID not found"
      });
    }
    if (email) {
      const validate = validateEmail(email);
      if (!validate) {
        // format email
        return res.status(HTTPStatus.BAD_REQUEST).json({
          email: email,
          message: "is invalid",
          status: false
        });
      }
    }
    tempUser.email = email || tempUser.email;
    tempUser.name = name || tempUser.name;
    tempUser.status = status || tempUser.status;
    let updateUser = await tempUser.save();
    return res.status(HTTPStatus.OK).json({
      statusCode: 200,
      statusText: "ok",
      message: "Update user successful",
      result: {
        user: updateUser
      }
    });
  } catch (error) {
    res.status(500).send({
      statusText: "Internal server error",
      statusCode: 500,
      message: error.message
    });
  }
};

userFunc.delete = async (req, res) => {
  try {
    let tempUser = await User.findByIdAndRemove(req.params.id);
    if (!tempUser) {
      return res.status(HTTPStatus.NOT_FOUND).json({
        statusCode: 404,
        message: "ID not found"
      });
    }
    return res.status(HTTPStatus.OK).json({
      statusCode: 200,
      statusText: "ok",
      message: "Delete user successful"
    });
  } catch (error) {
    res.status(500).send({
      statusText: "Internal server error",
      statusCode: 500,
      message: error.message
    });
  }
};

userFunc.getOne = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(HTTPStatus.NOT_FOUND).json({
        statusCode: 404,
        message: "ID not found"
      });
    }
    return res.status(HTTPStatus.OK).json({
      statusCode: 200,
      result: user
    });
  } catch (error) {
    res.status(500).send({
      statusText: "Internal server error",
      statusCode: 500,
      message: error.message
    });
  }
};

module.exports = userFunc;
