import React, { useEffect, useState } from "react";
import axios from "axios";
import Book from "./Book";
import { useNavigate } from "react-router-dom";

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await axios.get("https://bonstay.onrender.com/api/hotels/all");
        // const res = await axios.get("http://localhost:4000/api/hotels/all");
        console.log("hotels", res.data);
        setHotels(res.data);
      } catch (err) {
        console.log("Getting all hotels went wrong", err);
      }
    };
    fetchHotels();
  }, []);

  return (
    <div className="container">
      <div className="row">
        {hotels.map((hotel) => (
          <div className="col-12 mb-4" key={hotel._id}>
            <div className="card">
              <div className="row no-gutters">
                <div className="col-md-4">
                  <img
                    src={hotel.imageUrl}
                    className="card-img"
                    alt={hotel.hotelName}
                    style={{ height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div className="col-md-4">
                  <div className="card-body">
                    <h5 className="card-title">{hotel.hotelName}</h5>
                    <p className="card-text">
                      <strong>City:</strong> {hotel.city}
                    </p>
                    <p className="card-text">
                      <strong>Amenities:</strong> {hotel.amenities}
                    </p>
                    <p className="card-text">
                      <strong>Address:</strong> {hotel.address}
                    </p>
                    <p className="card-text">
                      <strong>Contact No:</strong> {hotel.phoneNo}
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-12 mb-2">
                        <button
                          className="btn btn-success btn-lg w-100"
                          style={{ backgroundColor: "#88685e" }}
                          onClick={() => navigate(`/book/${hotel._id}`) }
                        >
                          Book A Room
                        </button>
                      </div>
                      <div className="col-12 mb-2">
                        <button
                          className="btn btn-success btn-lg w-100"
                          style={{ backgroundColor: "#88685e" }}
                          onClick={()=>navigate(`/hotels/${hotel._id}/add`)}
                        >
                          Add Review
                        </button>
                      </div>
                      <div className="col-12">
                        <button
                          className="btn btn-success btn-lg w-100"
                          style={{ backgroundColor: "#88685e" }}
                          onClick={()=>navigate(`/hotels/${hotel._id}/show`)}
                        >
                          View Review
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hotels;
