import mongoose from "mongoose";
import userSchema from "./users-schema.js";
const usersModel = mongoose.model("Users", userSchema);
export default usersModel;