const mongoose = require("mongoose")
const connecting = () =>{
mongoose.connect(process.env.MONGO_URI)
.then(()=>{console.log("connected to MONGOOSE")})
.catch((err)=>{console.error(err)})};


module.exports = connecting