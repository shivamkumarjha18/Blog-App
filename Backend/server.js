import express from "express"
import dotenv from "dotenv"
import connectDB from "./database/db.js"
import userRoute  from "./routes/user.routes.js"

dotenv.config()
const app=express()
app.use(express.json())
//https://localhost:8000//api/v1/user/register
const PORT=process.env.PORT||3000
app.use("/api/v1/user",userRoute)
app.listen(PORT,()=>{
    connectDB()
    console.log(`SERVER LISTEN AT PORT ${PORT}`)

}) 