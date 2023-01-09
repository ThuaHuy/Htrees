const express = require('express');
const route = express.Router();
const users = require("../models/users");
const products = require("../models/products");
const user_information = require("../models/user_information");
const bodyParser = require('body-parser');
const cloudinary = require('../utils/cloudinary');
const upload = require('../utils/multer');
route.get("/", async(req, res) =>{
    res.render("index")
})
route.get("/login",async(req, res) =>{
    res.render("account")
})
route.get("/signup",async(req, res) =>{
    res.render("signup")
})
route.post("/signup", async(req, res) =>{
    
    const user = new users({
        username:req.body.username,
        password:req.body.password,
    })
    console.log(user);
    await user.save((err) => {
        if(err){
            console.log(err);
        }else{
            res.redirect("/login")
            console.log("Register Success");
        }
    })
   
    if(user.username == "admin"){
       await users.findByIdAndUpdate({_id:user._id},{permission:"admin"})
    }
    const userInfo = new user_information({user_id:user._id,name:req.body.name,email:req.body.email,phone:req.body.phone});
    await userInfo.save();
    await users.findByIdAndUpdate({_id:user._id},{user_informationId:userInfo._id})

})
route.post("/login", async(req, res) =>{
    const {username,password} = req.body;
    const user = await users.findOne({username});
    if (password == user.password) {
        req.session.userId = user._id;
        req.session.username = user.username
        if (username === "admin") {
           res.redirect("/admin");
        } else {
            res.redirect("/home");
        }
    } else {
            res.send("Tài khoản hoặc mật khẩu không chính xác!");
            
    }
})


route.get("/user",async(req, res) =>{
   const user = await users.findOne({_id:req.session.userId});
   const user_info = await user_information.findOne({user_id:req.session.userId})
   res.render("user",{user:user,user_info: user_info ,username:req.session.username,user_avatar:req.session.user_avatar})
})

route.post("/update_user",async(req, res) =>{
    await user_information.findOneAndUpdate({user_id:req.session.userId},{name:req.body.name,email:req.body.email,phone:req.body.phone,gender:req.body.gender,address:req.body.address,dob:req.body.dob})
    await users.findOneAndUpdate({_id:req.session.userId},{password:req.body.password})
    res.redirect("/home")
})


route.get("/logout",async(req, res) =>{
    req.session.destroy();
    res.redirect("/");
})
route.get("/change_pass",async(req, res)=>{
    res.render("change_pass",{username:req.session.username,user_avatar:req.session.user_avatar})
})
route.post("/change_pass",async(req, res)=>{
    const user = await users.findOne({_id:req.session.userId})
    console.log(user);
    if(req.body.passold === user.password){
        await users.findByIdAndUpdate({_id:req.session.userId},{password:req.body.passnew})
        res.redirect('/logout');
    }else{
        res.send("Mật khẩu cũ không chính xác")
    }
})
route.get("/avatar",async(req, res)=>{
    const user =  await users.findOne({_id:req.session.userId}).populate("user_informationId");
    res.render("avatar",{username:req.session.username,user:user});
})
route.post("/upload",upload.single('image') ,async(req, res)=>{
    try {
         
        const result = await cloudinary.uploader.upload(req.file.path,{
            folder:'Htrees/avatar'
        })
        await user_information.findOneAndUpdate({user_id:req.session.userId},{avatar:result.secure_url, cloudinary_id:result.public_id})
    } catch (error) {
        console.log(error);
        
    }finally{
       res.redirect("/home")
    }
    
})
route.get("/change_pass",async(req, res)=>{

    res.render("change_pass")
})
route.post("/change_pass",async(req, res)=>{
    const user = await users.findOne({_id:userId});
    if (user.password === req.body.passold) {
        await users.findByIdAndUpdate({_id:userId},{password:req.body.passnew});
    } else {
        res.send("Sai mật khẩu")
    }
    res.render("/logout")
})


module.exports = route