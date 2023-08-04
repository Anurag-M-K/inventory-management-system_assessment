const express = require("express");
const app = express();
const dotenv = require('dotenv').config();
const bodyParser = require("body-parser");
const cors = require("cors")
const db = require("./config/connection")
const userRouter = require("./router/userRouter");
const inventoryRouter = require("./router/inventoryRouter")
const customerRoute = require("./router/customerRoute");
const salesRouter = require("./router/salesRouter")
const errorHandler = require("./middlewares/errorMiddleware");
const PORT =  8000;  

db(()=>{
    try {
        console.log('Database connected successfully')
    } catch (error) {
        console.log("Database connection failed")
    }
})

app.use(express.json())
app.use(cors())
app.use(bodyParser.json())
//error middleware
app.use(errorHandler)

//routes
app.use("/api",userRouter)
app.use("/api/inventoryitem",inventoryRouter)
app.use("/api/customer",customerRoute);
app.use("/api/sales",salesRouter)
app.listen(PORT, ()=>{
    console.log(`Server running on ${`http://localhost:${PORT}`}`)
})