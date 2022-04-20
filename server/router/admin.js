const express=require('express');
const mongoose=require('mongoose'),Schema = mongoose.Schema;
const jwt=require('jsonwebtoken');
const router=express.Router();
require('dotenv').config();
const Workshop = require('../models/workshop');
const User = require('../models/user');

router.get('/users',async (req,res)=>{
    try{
        const userData=await User.find();
        if(userData){
            res.status(201).json(userData)
        }
    }catch(err){
        res.status(422).json(error);
    }
});

router.get('/users/:id',async(req,res)=>{
try{
const {id}=req.params;

const user= await User.findById({_id:id});
console.log(user);
res.status(201).json(user);
}catch(err){
    res.status(422).json(err);
}
});

router.delete("/deleteuser/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const user = await User.findByIdAndDelete({_id:id})
        res.status(201).json(user);

    } catch (error) {
        res.status(422).json(error);
    }
})

router.get('/workshops',async (req,res)=>{
    try{
        const workshopData=await Workshop.find();
        if(workshopData){
            res.status(201).json(workshopData)
        }
    }catch(err){
        res.status(422).json(error);
    }
});

router.get('/workshops/:id',async(req,res)=>{
try{
const {id}=req.params;

const workshop= await Workshop.findById({_id:id});
res.status(201).json(workshop);
}catch(err){
    res.status(422).json(err);
}
});

router.delete("/deleteworkshop/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const workshop = await Workshop.findByIdAndDelete({_id:id})
        res.status(201).json(workshop);

    } catch (error) {
        res.status(422).json(error);
    }
})


module.exports=router;