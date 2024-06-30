const { Schema, model } = require("mongoose");

const postSchema = new Schema({
  title: { type: String, required: true },
  city: { type: String, required: true },
  type: { type: String, required: true, enum: ["Cat", "Dog", "Bird"] },
  breed: { type: String, required: false },
  gender: { type: String, required: true },
  age: { type: Number, required: false },
  phoneNumber: {
    type: String,
    required: true,
  },
  sterilize: { type: String, required: false },
  description: { type: String, required: true },
  creator: {type:Schema.Types.ObjectId, ref: "User"},
  thumbnail: {type: String, required: true}
}, {timestamps: true});


module.exports = model("Post",postSchema)