import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: true,
  },
});

const hotelSchema = new mongoose.Schema({
  hotelName: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  amenities: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  reviews: [reviewSchema],
});

const Hotel = mongoose.model('Hotel', hotelSchema);
const Review=mongoose.model('Review',reviewSchema);

export { Hotel, Review };