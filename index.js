const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const cloudinary = require("cloudinary").v2
require('dotenv').config();
const app = express();
const Home = require("./routers/Home.js")
const User = require("./routers/User")
const Admin = require('./routers/Admin');
const Product = require('./routers/Product');
const Cart = require('./routers/Cart');
const Order = require('./routers/Order');
const PORT = process.env.PORT || 3000 ;

app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(flash());

app.use(session({
    secret: "This is my secret",
    resave: true,
    saveUninitialized:true,
    maxAge: 86400000,
    
}))

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME || YOUR_CLOUD_NAME,
    api_key: process.env.API_KEY || YOUR_API_KEY,
    api_secret: process.env.API_SECRET || YOUR_API_SECRET,
  });

mongoose.connect(process.env.dbUrl, {useNewUrlParser:true, useUnifiedTopology: true})
.then(() =>{
    console.log("MONGO ATLAS CONNECTION SUCCESSFULLY !!");
}).catch((error) =>{
    console.log("MONGO ATLAS CONNECTION FAIL !!");
    console.log(error);
})

app.use("/",Home)
app.use("/",User)
app.use("/",Admin)
app.use("/",Product)
app.use("/",Cart)
app.use("/",Order)


app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
}) 
