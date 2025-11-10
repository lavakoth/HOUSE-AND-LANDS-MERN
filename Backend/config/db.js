const mongoose = require("mongoose");

async function connectDB() {
    try{
        await mongoose.connect()
    }
    
}
// Love123@5047