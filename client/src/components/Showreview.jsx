import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Showreview = () => {
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();
  useEffect(()=>{    
    const fetchReviews=async()=>{      
    try{
      const response=await axios.get(`http://localhost:4000/api/hotels/${id}/show`);
      setReviews(response.data);
      console.log("reviews",response.data);
    }
    catch(err){
      console.log(err);
    }
    }
    fetchReviews()
  },[id]);
  //useEffect can be used to fetch the review details when the component is mounted. Hence the data obtained is to be updated in the corresponding state.

  return (
    <>
      {/* display all the reviews with selected hotel name in a card and apply some inline styling */}
      <div className="container" style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "",
            padding: "10px",
            margin: "10px",
            width: "50%",
            border: "2px solid black",
            borderRadius: "10px",
            minHeight: "100px", // Minimum height for the container
            maxHeight: "80vh", // Maximum height for the container
            overflowY: "auto", // Add vertical scroll if content exceeds maxHeight
  }}> 
      <h3 style={{ color:"brown", fontStyle:"italic"}}>Customer's Reviews</h3>
      {
        reviews.map((review)=>(
          <div className="card" key={review._id} style={{ margin:"10px",height:"5%", width:"50%", alignItems:"center",justifyContent:"center"}}>
            <div style={{padding:"5px",height:"50px"}}>
              <h5 className="card-title">{review.hotelName}</h5>
              <p className="card-text">{review.review}</p>
            </div>
        </div>
        ))
      }
      </div>
    </>
  );
};

export default Showreview;
