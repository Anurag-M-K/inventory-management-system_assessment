const express = require("express");
const app = express();
const PORT = 5000;
const bodyParser = require("body-parser");
const cors = require("cors")
const db = require("./config/connection")
const userRouter = require("./router/userRouter")

db(()=>{
    try {
        console.log('Database connected successfully')
    } catch (error) {
        console.log("Database connection failed")
    }
})

app.use(cors())
app.use(bodyParser())


app.use("/api",userRouter)
app.listen(PORT , ()=>{
    console.log(`Server running on ${`http://localhost:${PORT}`}`)
})