const express = require('express');
const route = express.Router();
const mongoose = require('mongoose');
const categories = require("../models/categories")
const products = require("../models/products")
const user_information = require("../models/user_information")
const users = require("../models/users")

route.get("/",  async(req,res) =>{
  let count = 0;
  let count2 =0;
  let count3 =0;
  const productAsc = await products.find().sort({price:1});
  const newProduct = await products.find().sort({createdAt:-1});
  const productRandom = await products.aggregate([{$sample:{size:12}}])
    res.render("index",{productAsc:productAsc,count:count,newProduct:newProduct,productRandom:productRandom,count2:count2,count3:count3});
})
route.get("/home",async(req, res) =>{
  let count = 0;
  let count2 =0;
  let count3 =0;
  const productAsc = await products.find().sort({price:1});
  const newProduct = await products.find().sort({createdAt:-1});
  const productRandom = await products.aggregate([{$sample:{size:12}}])
    res.render("index",{user_id:req.session.userId,username:req.session.username,productAsc:productAsc,count:count,newProduct:newProduct,productRandom:productRandom,count2:count2,count3:count3})
 })

module.exports = route;