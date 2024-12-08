import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { UserType } from "../types/User";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true, minlength: 6 },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

const User = mongoose.model<UserType>("User", userSchema);

export default User;
