import { Router } from "express";
import User from '../schema/user.js';

const UserRouter = Router();

UserRouter.post("/register",async (req, res) => {
    console.log(req.body);
    
    const data = req.body;    
    const {email}=data;
    try{
        const existingUser = await User.findOne( {email} );
        if (existingUser) {
            return res.status(400).send('Email already exists');
        }
        const newUser = new User(data);
        await newUser.save();
        res.status(201).send(newUser);
    }
    catch(err){
        console.log(err); 
        res.status(500).send('Internal Server Error');
    }
    
})

UserRouter.post("/login",async (req, res) => {
    const {email,password}=req.body;
    try{
        const findUser=await User.findOne({email});
        console.log(findUser);
        
        if(findUser)
        {
        if(findUser.password===password)
            return res.status(200).json("Login Successful!!");
        else 
            return res.status(401).json("Wrong Password!!");
        }
        else{
        return res.status(401).json("No user found!");
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
})
export default UserRouter;