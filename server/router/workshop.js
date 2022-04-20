const express=require('express');
const mongoose=require('mongoose'),Schema = mongoose.Schema;
const jwt=require('jsonwebtoken');
const router=express.Router();
const authenticate=require('../middleware/authenticate');


require('dotenv').config();
const Workshop = require('../models/workshop');
const User = require('../models/user');



router.post('/workshop',authenticate,async (req,res)=>{
    
    
const {name,city,address}=req.body;
if(!name || !city || !address){
    return res.status(422).json({error:"Please fill all the fields"})
}

try{
    const workshopExist=await Workshop.findOne({name:name});
    if(workshopExist){
        return res.status(422).json({error:"Workshop already exists"})
    }
    else{

        const workshop=new Workshop({_id:mongoose.Types.ObjectId(),name,city,address});
        workshop.user=req.rootUser;
        await workshop.save();
        res.status(201).json({message:"Workshop registered successfully"})
    }

} catch(err){
    console.log(err);
}
});

router.get('/workshop',async (req,res)=>{
    try{
    const workshop=await Workshop.find().populate('user');
    if(workshop){
        res.status(200).json(workshop)
    }
    else{
        res.status(422).json({error:"No workshops found"})
    }
    }catch(err){
        console.log(err);
    }
});

router.get('/nearbyWorkshop',authenticate,async (req,res)=>{
    try{
    const workshop=await Workshop.find({city:req.rootUser.city});
    if(workshop){
        res.status(200).json(workshop)
    }
    else{
        res.status(422).json({error:"No workshops found"})
    }
    }catch(err){
        console.log(err);
    }
});

router.get('/yourworkshop',authenticate,async (req,res)=>{
    try{
    const workshop=await Workshop.find({user:req.rootUser});
    if(workshop){
        res.status(200).json(workshop)
    }
    else{
        res.status(422).json({error:"No workshops"})
    }
    }catch(err){
        console.log(err);
    }
});

router.patch("/updateworkshop/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const updatedworkshop = await Workshop.findByIdAndUpdate(id,req.body,{
            new:true
        });

        res.status(201).json(updatedworkshop);

    } catch (err) {
        res.status(422).json(err);
    }
})


module.exports=router;