const express=require('express');

const mongoose=require('mongoose'),Schema = mongoose.Schema;;

const app=express();
const cookieParser = require('cookie-parser');
const User=require('./models/user');
app.use(express.json());



const DB='mongodb+srv://aun1414:aun1414@cluster0.lzljb.mongodb.net/mernSE?retryWrites=true&w=majority';


mongoose.connect(DB).then(()=>{
    console.log('Connection Successful')
}).catch((err)=>{
    console.log('Connection Error')
})


const setAdmin=async ()=>{
    try{
        const adminExist=await User.findOne({email:"aun0@gmail.com"});
        if(adminExist){
            return;
        }
        else{
    
            const admin=new User({_id:mongoose.Types.ObjectId(),name:"aun",email:"aun0@gmail.com",password:"aun",role:"admin",city:"islamabad"});
            await admin.save();
        }
    
    } catch(err){
        console.log(err);
    }
    };


setAdmin();


app.use(cookieParser());
app.use(require('./router/auth'));
app.use(require('./router/workshop'));
app.use(require('./router/admin'));



app.get('/',(req,res)=>{
    res.send("Hello from server")

});

app.get('/registerWorkshop',(req,res)=>{
    res.send("Hello from register workshop")

});

app.get('/signup',(req,res)=>{
    res.send("Hello from signup")

});

app.get('/login',(req,res)=>{
    res.send("Hello from login")

});

app.get('/findWorkshops',(req,res)=>{
    res.send("Hello from workshops")

});

app.listen(5000,()=>{
    console.log("Server is listening on port 5000")
});


