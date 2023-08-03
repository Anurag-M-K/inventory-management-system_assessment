const mongoose = require("mongoose");

const db = async () => {
    try {
        connectionParams = {
            useNewUrlParser  : true,
            useUnifiedTopology : true
        };

        await mongoose.connect("mongodb+srv://anuragmk10:3T0fukGrQobfjYwI@inventory-management-db.aywgphb.mongodb.net/?retryWrites=true&w=majority",connectionParams);
        console.log("Database connected successfully");
    } catch (error) {
        console.log(error)
    }
}

module.exports = db;