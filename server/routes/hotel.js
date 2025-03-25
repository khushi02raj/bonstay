import Hotel from "../schema/hotel.js";
import express from "express";

const HotelRouter = express.Router();

HotelRouter.post("/create",async(req,res)=>{
    try{
    const data=req.body;
    console.log(data);
    
    const hotel= new Hotel(data);
    await hotel.save();
    res.status(201).send(hotel);
    }
    catch(err){
        console.log(err);
    }
})
HotelRouter.get("/all",async(req,res)=>{
    try{
        const hotels=await Hotel.find();
        res.status(200).send(hotels);
    }
    catch(err){
        console.log(err);
    }
})
export default HotelRouter;