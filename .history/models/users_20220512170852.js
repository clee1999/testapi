const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  lastname: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
});
const User = mongoose.model("User", UserSchema);
export default model('User', schema);

module.exports = User;
