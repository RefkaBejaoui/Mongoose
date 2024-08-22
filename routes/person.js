const express = require("express");
const router = express.Router();
const person = require("../models/person");

//this one to add a person
router.post("/addPerson", async (req, res) => {
  try {
    let new_person = new person({
      name: req.body.name,
      age: req.body.age,
      favoriteFoods: req.body.favoriteFoods,
    });
    await new_person.save();
    res.send({msg: "effectuer avec succes", new_person});
    console.log("effectuer avec succes")
  } catch (err) {
    res.send(500).json({err});
    console.log(err)
  }
});

//to add Many persons
router.post("/addMany", async (req, res)=>{
    try {
        let newPersons = req.body;
        await person.create(newPersons)
        res.send({msg: "effectuer avec succes", newPersons})
    } catch (error) {
        res.send(500).json({err});
    console.log(err)
    }
})

//to find a person by his name
router.get("/toFind/:name", async(req,res)=>{
    try {
        let thePerson = await person.find({name:req.params.name}) 
        if(thePerson.length===0){
            res.send(404).json("user not found")
        } else {
        res.send({msg:"i find it", thePerson})}
    } catch (error) {
        res.send(500).json({err});
    console.log(err)
    }
})

//to find person by his favorite foods
router.get("/food/:favoriteFoods",async(req,res)=>{
    try {
        let favoriteFoods= await person.findOne({favoriteFoods:req.params.favoriteFoods})
        res.send({msg: "this is favoriteFoods" , favoriteFoods})
    } catch (error) { res.send(500).json({err})
        
    }
})

//to find persons by his ID
router.get("/theID/:id",async(req,res)=>{
    try {
        let theId = await person.findById({_id:req.params.id})
        res.send({msg: "get by ID" , theId})
    } catch (err) {res.send(500).json({err})
        
    }
})

//to add some foods to the list of the favorit foods
router.put("/addFood/:id", async(req,res)=>{
    try {
        let humburger = await person.findById({_id:req.params.id})
        if (humburger) {
            humburger.favoriteFoods.push("humburger");
            await humburger.save()
            
            res.send({msg:"zidt el mékla", humburger})
        }else {
            res.send(500).json("jawna mouch behi")
        }
    
        
    } catch (error) { res.send(500).json({error})
    console.log(error)
        
    }
})

//to change the age of the person
router.put("/updateAge/:name" , async(req,res)=>{
    try {
       let  updateAge = await person.findOneAndUpdate(
        {name:req.params.name},
        {age:20},
        {new: true})  
        res.send({msg:"the age is updated to 20 for : " , updateAge})
    } 
    catch (error) {res.send(500).json({error},
        console.log(error)
    )
    }
})

//to delete a person by his ID
router.delete("/deleteOne/:id",async(req,res)=>{
    try {
        let deleted = await person.findOneAndDelete({_id:req.params.id});
       if(deleted){
        res.send({msg:"this one is deleted", deleted})
       }
    else {
        res.send({msg:"it is already deleted"})
    }
    } catch (error) {
        res.send(500).json({error});
    console.log(error)
    } 
})

//to delete many persons
router.delete('/deleteMany/:name', async(req,res)=>{
    try {
        let deleteMany= await person.deleteMany({name:req.params.name})
    if(deleteMany.deletedCount!=0) {
        return res.send({msg:"they are deleted"})
    }
    else {
        return res.send({msg:"they are already deleted"})}

    } catch (error) { res.send(500).json(error)}
})


//the sorted list without shoing the age of the person and number limitid to 2
router.get("/chain/:favoriteFoods" , async(req,res)=>{
    try {
      let list= await person.find({favoriteFoods:req.params.favoriteFoods}).sort({name:1}).limit(2).select("-age").exec()
   
      if(list.length>0){

res.send({msg:"find, sort and limit the persons hwo like burritos",list})
      }
      else{
        res.send({msg:`i didn't find any one hwo likes ${req.params.favoriteFoods}`})
      }
        
    } catch (error) { res.send(error)
        console.log(error)
    }
})

// router.get("/chain/:favouriteFoods", async (req,res)=>{
//     try {
//         let list = await person.find({favoriteFoods: req.params.favouriteFoods})
//         .sort({name:1})
//         .limit(2)
//         .select("-age")
//         .exec()

//         res.send(list)
//     } catch (error) {
//         console.log(error)
//         res.send(error)
//     }
// })

module.exports = router;
