const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,'Tên không được để trống!'],
        unique:true,
    },
    product_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"products"
    }
},{timestamps:true})
module.exports = mongoose.model("category",categoriesSchema);
