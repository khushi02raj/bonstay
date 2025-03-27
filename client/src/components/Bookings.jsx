import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Bookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [errMsg, setErrMessage] = useState("");
  const [deleteSuccess, setDeleteSuccess] = useState("");
  
  useEffect(() => {
    async function getBookings() {
      try {
        const response = await axios.get("http://localhost:4000/api/bookings/all");
        console.log("bookings:", response.data);  
        setBookings(response.data);
      } catch (err) {
        console.log("Getting all bookings went wrong", err);
      }
    }
    getBookings();
  }, []);
  //useEffect can be used to fetch the booking details when the component is mounted. Hence the data obtained is to be updated in the corresponding state.
  const handleAction = async(id) => {
    await axios.delete(`http://localhost:4000/api/bookings/${id}`).then((response) => {
      console.log("response", response);
      setDeleteSuccess(`The booking for Booking ID : ${id} is deleted`);
      setBookings(bookings.filter((booking)=>booking._id !== id));
    }).catch((err) => {
      console.log("Error while deleting the booking", err);
      setErrMessage("Something went wrong while deleting the booking");
    }
    );
    // Delete the booking from the database by placing HTTP delete request 
  };
  return (
    <>

      <div className="container" >
      {
        bookings.map((booking) => (
          <div className="card" style={{width:"40rem",display:"flex", alignItems:"center"}} key={booking._id}>
        <h5 className="card-title">Hotel Name :{booking.hotelName} </h5>
        <p className="card-text">Start Date :{booking.startDate}</p>
        <p className="card-text">End Date :{booking.endDate}</p>
        <p className="card-text">No of Persons :{booking.noOfPersons}</p>
        <p className="card-text">No of Rooms :{booking.noOfRooms}</p>
        <p className="card-text">Type of Rooms :{booking.typeOfRoom}</p>

        <button className="btn btn-secondary w-50" data-testid="Reschedule-button"
        onClick={()=>navigate(`/bookings/${booking._id}`)}>
          Reschedule
        </button>
        {/* generate necessary code to call the function to handle reschedule opration of the user */}
        <br />
        <br />

        <button className="btn btn-secondary w-50" data-testid="delete-button" onClick={() => handleAction(booking._id)}>
          Cancel
        </button>
        </div>
))
}
        {/* generate necessary code to call the function to handle delete opration of the user and set the successful delete message */}
        {errMsg && <div className="alert alert-danger" role="alert">{errMsg}</div>}
        {deleteSuccess && <div className="alert alert-success" role="alert">{deleteSuccess}</div>}
      </div>
    </>
  );
};

export default Bookings;
