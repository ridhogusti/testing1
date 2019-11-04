import mongoose, { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

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

export default mongoose.model("User", UserSchema);
