import mongoose from "mongoose";
const schema = new mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
}, { collection: "users" });
export default schema;