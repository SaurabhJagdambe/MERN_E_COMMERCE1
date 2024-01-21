const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const authRouter = require("./routes/authRouter")
const cors = require("cors"); 


//env config
dotenv.config();

//rest object
const app = express();

//mongodb connection
connectDB();

//middelware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

//routes
app.use("/api/v1/auth", authRouter);

//rest api
app.get('/',(req,res)=>{
    res.status(200).send({
        "message":"Node server"
    })
})






//port
const PORT = process.env.PORT || 8080;

//listen
app.listen(8080, () => {
    console.log(
      `Server Running on ${process.env.DEV_MODE} mode port ${PORT}`.bgCyan.white
    );
  });