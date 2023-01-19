const express = require('express')
const {connection} = require("./Config/db")
const cors = require("cors")
const {authController} = require("./Controller/authController")
const authentication = require("./Middleware/authentication")
require("dotenv").config()

const app = express()
const PORT = 8000;
app.use(cors());

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/', authController)
//app.use(authentication)

app.listen(PORT, async () => {
    try {
      await connection;
      console.log(`database connected successfully on port ${PORT}`);
    } catch (err) {
      console.log("error while connecting db", err);
    }
  });