const express = require('express');
const route = express.Router();
const mongoose = require('mongoose');
const categories = require("../models/categories");
const products = require("../models/products");
const user_information = require("../models/user_information")
const users = require("../models/users")

route.get("/products",  async(req,res) =>{
  let category = await categories.find();
  let product = await products.find();

    res.render("products",{username:req.session.username,category:category,products:product});
})
route.get("/product_detail/:id", async(req, res) => {
  let count = 0;
  let count1 = 0;
  const id = req.params.id;
  let category = await categories.find();
  const product_detail = await products.findById({_id:id})
  const productTooCategory = await products.find({categoryId:product_detail.categoryId})
  const productRandom = await products.aggregate([{$sample:{size:12}}])
  const category_product = await categories.findById({_id:product_detail.categoryId})
  const newProduct = await products.findOne().sort({createdAt:-1});
  res.render("product_detail",{detail:product_detail,category:category,username:req.session.username,newProduct:newProduct,productTooCategory:productTooCategory,productRandom:productRandom,count:count,category_product:category_product.name,count1:count1})
})
route.get("/category/:id",  async(req,res) =>{
  let category = await categories.find();
  let product = await products.find({categoryId:req.params.id});

    res.render("products",{username:req.session.username,category:category,products:product});
})
route.get("/search",  async(req,res) =>{
  let key = req.query.key;
  let name = '%' + key + '%'
  let category = await categories.find();
    const product = await products.find({ name: { $regex: key, $options: 'i' } })
    res.render("products",{username:req.session.username,category:category,products:product});
})
module.exports = route;