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
BookingRouter.get("/all",async(req,res)=>{
    try{
        const booking= await Booking.find();
        res.status(200).send(booking);
    }
    catch(err){
        console.log(err);
    }
})

BookingRouter.delete("/:id",async(req,res)=>{
    try{
        const id=req.params.id;
        await Booking.findByIdAndDelete(id);
        res.status(200).send("Booking deleted successfully");
    }
    catch(err){
        console.log(err);
    }
}
)
export default BookingRouter;