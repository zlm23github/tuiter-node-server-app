import mongoose from "mongoose";
const schema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // firstName: String,
  // lastName: String,
}, { collection: "users" });
export default schema;