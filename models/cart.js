const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
      },
      products: [
        {
          productId: String,
          img: String,
          name: String,
          price: Number,
          quantity: Number,
        }
      ]
},{timestamps:true})
module.exports = mongoose.model("cart",cartSchema)