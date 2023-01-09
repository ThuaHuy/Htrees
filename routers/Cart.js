const express = require('express');
const route = express.Router();
const mongoose = require('mongoose');
const categories = require("../models/categories");
const products = require("../models/products");
const user_information = require("../models/user_information")
const users = require("../models/users")
const carts = require("../models/cart")

route.get("/cart",  async(req,res) =>{
    let total = 0;
    let cart = await carts.findOne({userId:req.session.userId});
    let category = await categories.find();
    res.render("cart",{username:req.session.username,cart:cart.products,category:category,total:total});
})
route.post("/cart",  async(req,res) =>{
    let total = 0;
    const product = await products.findById({_id:req.body.productId})
    let category = await categories.find();
    const {productId,quantity} = req.body;
    try {
        let cart = await carts.findOne({userId:req.session.userId});
        if (cart) {
            let itemIndex = cart.products.findIndex(p =>p.productId == productId)
            if (itemIndex > -1) {
                //product exists in the cart, update the quantity
                let productItem = cart.products[itemIndex];
                productItem.quantity = quantity;
                cart.products[itemIndex] = productItem;
            } else {
                //product does not exists in cart, add new item
                cart.products.push({ productId,img:product.img, name:product.name, quantity, price:product.price,total:total });
            }
            cart = await cart.save();
        } else {
            
            //no cart for user, create new cart
            const newCart = await carts.create({
            userId:req.session.userId,
            products: [{ productId, img:product.img, name:product.name, quantity, price:product.price,total:total}]
        })
    }
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong");
    }
    let cart = await carts.findOne({userId:req.session.userId});
    await users.findByIdAndUpdate({_id:req.session.userId},{cartId:cart._id})
    res.render("cart",{username:req.session.username,cart:cart.products,category:category,total:total});
})
route.get("/del_cart/:id", async(req, res) => {
  const productId = req.params.id;
  let updateCart = await carts.updateOne({userId:req.session.userId},{"$pull":{"products":{"productId":productId}}},{safe:true})
  let cart = await carts.findOne({userId:req.session.userId});
  res.redirect("/cart");
})
route.get("/del_cart",async(req, res)=>{
    await carts.deleteMany();
    res.redirect("home");
})
module.exports = route;