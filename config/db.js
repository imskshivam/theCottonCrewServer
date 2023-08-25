require('dotenv').config();
const mongoose = require("mongoose");


    

async function connectDB() {
    //DataBase Coonection

    

   await mongoose.connect(process.env.MONGO_CONNECTION_URL).then(()=>{
        console.log('DataBas connected.');
    }).catch((e) =>{
        console.log('Connection Failed');
    });
}

module.exports = connectDB;