const mongoose = require('mongoose');
const productsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Tên không được để trống!'],
        unique:true,
    },
    description:{
        type: String,
        default:"Cây cảnh là một loại cây xanh không thể thiếu trong cuộc sống của con người bởi cây xanh giúp điều hòa không khí.",
    },
    categoryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'categories',
    },
    insurance:{
        type: String,
        default:"3 tháng"
    },
    origin:{
        type:String,
    },
    weight:{
        type: String,

    },
    price:{
        type: Number,
        min: 1
    },
    img:{
        type: String
    },
    img_1:{
        type: String
    },
    img_2:{
        type: String
    },
    img_3:{
        type: String
    },
    img_4:{
        type: String
    },
    hearts:{
        type: Number,
        min:0,
    }
},{timestamps:true})
module.exports = mongoose.model("product",productsSchema)