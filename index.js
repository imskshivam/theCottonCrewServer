const express = require("express");


const app = express();
const cors = require('cors');

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const connectDB = require('./config/db');
connectDB();
const authRouter = require('./routes/auth');
const productRoutes = require('./routes/productRoute');
const cartRoutes = require('./routes/cart');
const userRoutes = require('./routes/profile');
const complainRoutes = require('./routes/complain');
// const profileRoutes = require('./routes/profile');
// Use product routes
app.use('/api', productRoutes);
app.use('/auth',authRouter);
app.use('/cart',cartRoutes);
app.use('/profile',userRoutes);
app.use('/complain',complainRoutes);
// app.use('/profile',profileRoutes);

app.use(cors({ origin:true, credentials:true }));
app.listen(PORT,"0.0.0.0", ()=>{
    console.log(`conncted at port ${PORT}`)
    });