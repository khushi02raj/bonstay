import express from 'express';
import mongoose from 'mongoose';
import UserRouter from './routes/user.js';
import cors from 'cors';
import HotelRouter from './routes/hotel.js';
import BookingRouter from './routes/booking.js';

const app = express();
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(cors())
app.use(express.json());
app.use("/api/users",UserRouter);
app.use("/api/hotels",HotelRouter)
app.use("/api/bookings",BookingRouter);

mongoose.connect('mongodb+srv://khushi097raj:Khushi02@cluster0.ujrt9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(error => {
    console.error('Error connecting to MongoDB:', error);
});
