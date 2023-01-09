const express = require('express');
const route = express.Router();
const users = require("../models/users");
const categories = require("../models/categories")
const products = require("../models/products")
const orders = require("../models/orders")
const user_information = require("../models/user_information");
const bodyParser = require('body-parser');
const cloudinary = require('../utils/cloudinary');
const upload = require('../utils/multer');


route.get("/admin",async(req, res) =>{
    const order = await orders.find();
    const admin_info = await user_information.findOne({user_id:req.session.userId})
    res.render("admin",{user_id:req.session.userId,admin_info:admin_info,order:order});
})
route.get("/admin/product",async(req, res) =>{
    let category = await categories.find();
  
    const admin_info = await user_information.findOne({user_id:req.session.userId})
    const product = await products.find();
    res.render("admin_product",{user_id:req.session.userId,admin_info:admin_info,category:category,product:product})
})

route.get("/admin/del_category/:id",async(req, res) =>{
    await categories.findByIdAndRemove({_id:req.params.id})
    res.redirect("/admin/product");
})
route.post("/admin/add_category/",async(req, res) =>{
    const category = new categories({
        name:req.body.new_category
    })
    await category.save((err) => {
        if(err){
            console.log(err);
        }else{
            res.redirect("/admin/product");
        }
    })
   
})
route.get("/admin/add_product",async(req, res)=>{
    const category =  await categories.find();
     res.render("admin_add-product",{category:category})
})
route.post("/admin/add_product",upload.single('image') ,async(req, res)=>{
    try {
        const result = await cloudinary.uploader.upload(req.file.path,{
            folder:'Htrees/img_product'
        })
        const product = new products({
            name:req.body.name,
            description:req.body.description,
            categoryId:req.body.category,
            insurance:req.body.insurance,
            origin:req.body.origin,
            weight:req.body.weight,
            price:req.body.price,
            img:result.url,
        })
        await product.save();

        
    } catch (error) {
        console.log(error);
        
    }finally{
       res.redirect("/admin/add_product")
    }
})
route.get("/admin/account",async(req,res)=>{
    const user = await users.find();
    res.render("admin_accounts",{user:user})

})
route.post("/admin/account",async(req,res)=>{
    const user = await users.find();
    const user_info = await users.findOne({_id:req.body.id});
    const info = await user_information.findOne({user_id:req.body.id})
    res.render("admin_accounts",{user:user,user_info:user_info,info:info})

})
route.post("/admin/update_account",async(req,res)=>{
    const id = req.body.id;
    await users.findByIdAndUpdate({_id:id},{username:req.body.username,password:req.body.password})
    await user_information.findOneAndUpdate({user_id:id},{email:req.body.email,phone:req.body.phone})
    res.redirect("/admin/account")

})
route.get("/admin/del_account/:id",async(req, res)=>{
    const id = req.params.id;
    await users.findOneAndRemove({_id:id});
    await user_information.findOneAndRemove({user_id:id})
    res.redirect("/admin/account")
})


module.exports = route