import Joi from "joi";

export default {
  signup: {
    body: {
      email: Joi.string()
        .email()
        .required()
    }
  }
};
