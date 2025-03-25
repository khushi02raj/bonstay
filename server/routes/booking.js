import express from "express";
import Booking from '../schema/booking.js';

const BookingRouter = express.Router();

BookingRouter.post("/create",async(req,res)=>{
    try{
    const data=req.body;
    console.log(data);
    
    const booking= new Booking(data);
    await booking.save();
    res.status(201).send(booking);
    }
    catch(err){
        console.log(err);
    }
})

export default BookingRouter;