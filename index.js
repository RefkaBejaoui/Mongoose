const express= require("express")
const bodyParser = require("body-parser")
const app= express();
require("dotenv").config()
const connecting = require("./DataBase/connecting")
connecting()
const router = require("./routes/person")
app.use(bodyParser.json())
app.use("/person", router)

app.listen(process.env.port, (err)=>err ? console.error(err): console.log(`server is connecting to http://localhost:${process.env.port}`))