const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    phone:{
        type:String
    },
    email:{
        type:String,
    },
    address:{
        type:String,
    },
    describe:{
        type:String,
    },
    total:{
        type:Number,
    },
},{timestamps:true})
module.exports = mongoose.model("order",orderSchema)