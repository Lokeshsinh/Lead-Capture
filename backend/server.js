require("dotenv").config()
const express  =  require("express");
const cors  =  require("cors");
const mongoose  =  require("mongoose");
const { v4: uuidv4 } = require("uuid");
const leadRouter =  require("./router/leads")



const app =  express();
app.use(express.json());
const allowedOrigins = [
  "http://localhost:5173",
  "https://lead-captures.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
}));

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