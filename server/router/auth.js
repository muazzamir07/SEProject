const express=require('express');
const mongoose=require('mongoose'),Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
require('dotenv').config();
const authenticate=require('../middleware/authenticate');

const router=express.Router();


mongoose.connect('mongodb+srv://aun1414:aun1414@cluster0.lzljb.mongodb.net/mernSE?retryWrites=true&w=majority');
const User = require('../models/user');
const Appointment=require('../models/appointment');


router.get('/',(req,res)=>{
    res.send('Hello world from server router js');
});

router.post('/register',async (req,res)=>{
const {name,email,password,city}=req.body;
let role;
if(email==="aun0@gmail.com"){
    role="admin";
}
else{
    role="user"
}

if(!name || !email || !password){
    return res.status(422).json({status:true,error:"Please fill all the fields"})
}

try{
    const userExist=await User.findOne({email:email});
    if(userExist){
        return res.status(422).json({status:true,error:"Email already exists"})
    }
    else{

    const user=new User({_id: mongoose.Types.ObjectId(),name,email,password,role,city});
    await user.save();
    res.status(201).json({message:"User registered successfully"})
    }

} catch(err){
    console.log(err);
}
});

router.post('/signin',async (req,res)=>{
    try{
    let token;
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(400).json({status:true,error:"Please fill the data"})
    }
    
    
        const userLogin=await User.findOne({email:email});
        if(userLogin){
        const passwordMatch=await bcrypt.compare(password,userLogin.password);
        token=await userLogin.generateAuthToken();
        res.cookie("jwtoken",token,{
            expires: new Date(Date.now()+ 25892000000),
            httpOnly:true
        });

        if(passwordMatch){
            res.json({message:"Login successful"});
        }
        else{
            res.status(400).json({status:true,error:"Login Failed"});
        }
    }
    else{
        res.json({error:"Could not find mail"});
    }
    
    } catch(err){
        console.log(err);
    }
    });

    router.get('/home',authenticate,async (req,res)=>{
        res.send(req.rootUser);
    })

    router.get('/makeAppointment',authenticate,async (req,res)=>{
        res.send(req.rootUser);
    })

    router.post('/makeAppointment',authenticate,async (req,res)=>{
    
    
        const {workshopName,time,user}=req.body;
        if(!workshopName || !time){
            return res.status(422).json({error:"Please fill all the fields"})
        }
        
        try{
        
                const appointment=new Appointment({_id:mongoose.Types.ObjectId(),workshopName,time});
                appointment.user=req.rootUser;
                await appointment.save();
                res.status(201).json({message:"Appointment made successfully"})
        
        } catch(err){
            console.log(err);
        }
        });

module.exports=router;