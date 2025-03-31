import {Hotel} from "../schema/hotel.js";
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
HotelRouter.patch("/:id/add",async(req,res)=>{
    try{
        const id=req.params.id;
        const { review } = req.body;

        const updatedHotel = await Hotel.findByIdAndUpdate(id,
            {$push: { reviews: { review } } }, { new: true });
        res.status(200).send(updatedHotel);
    }
    catch(err){
        console.log(err);
        res.status(500).send("Error adding review");
    }
})
HotelRouter.get("/:id/show",async(req,res)=>{
    try
    {
        const response=await Hotel.findById(req.params.id)
        console.log(response);
        
        res.status(200).send(response.reviews);
    }
    catch(err){
        console.log(err);
        res.status(500).send("Error finding hotel");
    }
})
export default HotelRouter;