import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  noOfPersons: {
    type: Number,
    required: true,
  },
  noOfRooms: {
    type: Number,
    required: true,
  },
  typeOfRoom: {
    type: String,
    required: true,
  },
//   hotelName: {
//     type: String,
//     required: true,
//   },
  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
    required: true,
  },
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
});
const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;