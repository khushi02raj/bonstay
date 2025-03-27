import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Reschedule = () => {
  const {bookingId}=useParams();
  const [state, setState] = useState({
    startDate: "",
    endDate: "",
  });
  const [Message, setMessage] = useState("");
  const [errMsg, setErrMessage] = useState("");
  const [dateErrors, setDateErrors] = useState({
    startDate: "",
    endDate: ""
  });

  const handleSubmit =async (e) => {
    e.preventDefault();
    if(dateErrors.startDate || dateErrors.endDate){
      setErrMessage("Please enter valid dates");
      return;
    }
    
    try{
      const res=await axios.put(`http://localhost:4000/api/bookings/${bookingId}`,state);
      setMessage("Reschedule is successfully done");
      console.log("res",res);
    }
    catch(err){
      setErrMessage("Something went wrong while rescheduling");
      console.log(err);
    }
  };

  const change = (e) => {
    if(e.target.name==="startDate" && e.target.value===""){
      setDateErrors({...dateErrors,startDate:"Start date is required"})
    }
    else if(e.target.name==="endDate" && e.target.value===""){
      setDateErrors({...dateErrors,endDate:"End date is required"})
    }
    else if(e.target.name==="startDate" && e.target.value<new Date().toISOString().split('T')[0]){
      setDateErrors({...dateErrors,startDate:"Start date should be greater than or equal to current date"})
    }
    else if(e.target.name==="endDate" && e.target.value<new Date().toISOString().split('T')[0]){
      setDateErrors({...dateErrors,endDate:"End date should be greater than or equal to current date"})
    }
    else setDateErrors({...dateErrors,[e.target.name]:""})
    setState({...state,[e.target.name]:e.target.value})
  };

  return (
    <>
      <div>
        <div
          className="container mt-3 text-start p-5"
          style={{ width: "60%", fontSize: "14px" }}
        >
          <div className="row p-3">
            <div className="col-lg-6 "></div>
            <div className="col-lg-6" style={{ backgroundColor: "#ebe7e7" }}>
              <form>
                {/*
                1. Display successMessage or errorMessage after submission of form
                2. Form should be controlled
                3. Event handling methods should be binded appropriately
                4. Invoke the appropriate method on form submission
                */}
                <div
                  className="navbar-brand"
                  style={{
                    color: "brown",
                    textAlign: "center",
                    fontFamily: "sans-serif",
                    fontWeight: "bolder",
                    paddingTop: "25px",
                    fontSize: "2em",
                  }}
                >
                  Book a Room
                </div>

                <br />
                <br />
                <div className="mb-2 mt-2">
                  <label className="form-label">Start Date:</label>
                  <input
                    type="Date"
                    className="form-control"
                    name="startDate"
                    value={state.startDate}
                    onChange={change}
                  />
                </div>
                {dateErrors.startDate && (
                  <div className="text-danger">{dateErrors.startDate}</div>
                )}
                <div className="mb-2 mt-2">
                  <label className="form-label">End Date:</label>
                  <input type="Date" className="form-control" name="endDate" 
                  value={state.endDate}
                  onChange={change}/>
                </div>
                {dateErrors.endDate && (
                  <div className="text-danger">{dateErrors.endDate}</div>
                )}
                <br />
                <button
                  type="submit"
                  className="btn mb-2 d-block text-white"
                  style={{ backgroundColor: "#88685e", width: "100%" }}
                  onClick={handleSubmit}
                >
                  Reschedule
                </button>
                {/*Using the concept of conditional rendering,display success message, error messages related to axios calls */}
                {Message && <div data-testid="Message" className="text-success">{Message}</div>}
                {errMsg && <div data-testid="Message" className="text-danger">{errMsg}</div>}
                <div data-testid="Message" className="text-danger"></div>
                <br />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reschedule;
