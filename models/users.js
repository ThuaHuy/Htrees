const mongoose = require('mongoose');
const usersSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true,'Username không được để trống!'],
        unique:true,
    },
    password:{
        type: String,
        required: [true,'Pasword không được để trống!'],
    }, 
    user_informationId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user_information',
    },
    cartId:{
        type: mongoose.Schema.Types.ObjectId,
    },
    permission:{
        type: String,
        default: "User"
    }

},{timestamps:true})
module.exports = mongoose.model("user",usersSchema)