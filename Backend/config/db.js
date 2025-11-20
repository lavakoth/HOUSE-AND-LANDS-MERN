const mongoose = require("mongoose");

async function connectDB() {
    try{
        await mongoose.connect(process.env.mongoDB_localhost);
        console.log("mongodb connected successfully...");
    }
    catch (error){
        console.error("mongoDb error:",error.message);
        process.exit(1);

    }
    
}
module.exports = connectDB;

