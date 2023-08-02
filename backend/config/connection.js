const mongoose = require("mongoose");

const db = async () => {
    try {
        connectionParams = {
            useNewUrlParser  : true,
            useUnifiedTopology : true
        };

        await mongoose.connect("mongodb+srv://AnuragM-K:s69BCSIsT8g0fwvn@cluster0.li6oaod.mongodb.net/inventory-management-system?retryWrites=true&w=majority",connectionParams);
        console.log("Database connected successfully");
    } catch (error) {
        console.log(error)
    }
}

module.exports = db;