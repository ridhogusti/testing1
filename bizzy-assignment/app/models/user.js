const mongoose = require("mongoose");
const { Schema } = mongoose;
const uniqueValidator = require("mongoose-unique-validator");

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required!"],
      trim: true
    },
    name: {
      type: String,
      required: [true, "Name is required!"],
      trim: true
    },
    status: {
      type: Boolean
    }
  },
  { timestamps: true }
);

UserSchema.plugin(uniqueValidator, {
  message: "{VALUE} already taken!"
});

UserSchema.pre("save", function(next) {
  return next();
});

UserSchema.methods = {};

module.exports =  mongoose.model("User", UserSchema);
