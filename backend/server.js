require("dotenv").config()
const express  =  require("express");
const cors  =  require("cors");
const mongoose  =  require("mongoose");
const { v4: uuidv4 } = require("uuid");
const leadRouter =  require("./router/leads")



const app =  express();
app.use(express.json());
app.use(cors());

const PROT  =  5000

const MONGODB_URL =  process.env.MONGODB_URL


app.use('/leads', leadRouter)

app.listen(PROT, () => {
    console.log(`Server Running From http://localhost:${PROT}`)
    mongoose.connect(MONGODB_URL).then(() => {
        console.log("Mongoose Connected")
    }).catch(() => {
        console.log("Mongoose Disconnected")
    })
})