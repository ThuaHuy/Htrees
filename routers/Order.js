const express = require('express');
const route = express.Router();
const mongoose = require('mongoose');
const user_information = require('../models/user_information');
const orders = require('../models/orders');
const carts  = require('../models/cart');

let total;
route.get("/checkout/:total",async(req, res)=>{
    total = req.params.total;
    console.log(total);
    res.redirect("/checkout")
})
route.get("/checkout/",async(req, res)=>{
  const user_info = await user_information.findOne({user_id:req.session.userId})
    res.render("checkout",{user_info:user_info})
})
route.post("/checkout",async(req, res)=>{
    let array = [];
    const cart = await carts.findOne({userId:req.session.userId});
    cart.products.forEach(element => {
        let listStr = `${element.name}:${element.quantity}`;
        array.push(listStr);
    });
    let describe = array.join();
    try {
        const order = new orders({
            name:req.body.name,
            phone:req.body.phone,
            email:req.body.email,
            address:req.body.address,
            describe:describe,
            total:total,
        })
        await order.save();
        await carts.findOneAndDelete({userId:req.session.userId})
        res.render("thank")
    } catch (error) {
        console.log(error);
    }
   

    

})

module.exports = route;