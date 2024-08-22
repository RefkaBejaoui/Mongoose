const mongoose = require("mongoose");
const personSchema = new mongoose.Schema(
    { name:{
        type : String ,
        required : true
    },
    age:{
        type : Number,
        default : 0
    },
    favoriteFoods:{
        type : [String],
        default : ["SPAGETTI"]
    }
    }
)
const person = mongoose.model("people",personSchema)

module.exports = person
