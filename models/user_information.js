const mongoose = require('mongoose');
const userinfo_Schema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        unique:true,
    },
    phone:{
        type:String,
    },
    gender:{
        type: String,
        default:"Male",
        
    },
    address:{
        type: String,
    },
    dob:{
        type: String,
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
    },
    avatar:{
        type:String,
        default:"https://res.cloudinary.com/thua-huy/image/upload/v1663941543/Htrees/avatar/no_avatar_l6seil.jpg",
    }
   
},{timestamps:true})
module.exports = mongoose.model("user_information",userinfo_Schema)