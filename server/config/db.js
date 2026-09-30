const mongoose = require("mongoose");

async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected");
    }catch(error){
        console.error("Error while connecting to MongoDB");
        console.error(error.message);
        process.exit(1);
    }
}

module.exports = connectDB;