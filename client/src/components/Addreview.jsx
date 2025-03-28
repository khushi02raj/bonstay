import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Addreview = () => {
  const {hotelId} = useParams();
  const [state, setState] = useState({
    Reviews: "",
  });
  const [formErrors, setFormErrors] = useState({
    Reviews: "",
  });
  const [Message, setMessage] = useState("");
  const [mandatory, setMandatory] = useState(false);
  const [valid, setValid] = useState(false);

  const change = (e) => {
    console.log(e.target.value);
    
    setState({ ...state, [e.target.name]: e.target.value });
    /*
       1. This method will be invoked whenever the user changes the value of any form field. This method should also validate the form fields.
       2. 'event' input parameter will contain both name and value of the form field.
       3. Set state using the name and value recieved from event parameter. 
       */
    //set the condition as It's a required field.
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("adding review");
    try{
      if(state.Reviews===""){
        setMandatory(true);
        return;
      }
      await axios.patch(`http://localhost:4000/api/hotels/${hotelId}`,{
        review: state.Reviews,
      })
      .then((res)=>{
        setMessage("Review is successfully added.");
        console.log(res);
        
      })
      .catch((err)=>{
        setMessage("Something went wrong while adding review");
        console.log(err);
        
      })
    }
    catch(err){
      console.log(err);
    }
    // 2. You should prevent page reload on submit
    // 3. check whether the form fields are entered. If the form field is not entered set the mandatory state variable to true.
    // 4.  If the form field values are entered then make axios call to
    // "http://localhost:4000/hotels/:hotelId" and pass the appropriate state as data to the axios call
    // 5. If the axios call is successful, assign the below string to Message state:
    //   "Review is successfully added."
    // 6. If the axios call is not successful, assign the error message to "Something went wrong"
  };

  return (
    <>
      <div>
        <div
          className="container mt-3 text-start p-5"
          style={{ width: "80%", fontSize: "14px" }}
        >
          <div className="row p-3">
            <div className="col-lg-6 " style={{ marginRight: "10%" }}>
              {" "}
            </div>
            <div className="col-lg-6" style={{ backgroundColor: "#ebe7e7" }}>
              <form style={{ marginRight: "20px", marginLeft: "20px" }}>
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
                  Your Reviews means a lot for us
                </div>
                <br />
                <br />
                <div className="mb-2 mt-2">
                  <label className="form-label" style={{ color: "brown" }}>
                    Add your Review:
                  </label>
                  <textarea
                    type="textarea"
                    className="form-control"
                    name="Reviews"
                    rows="4"
                    cols="20"
                    maxLength="100"
                    value={state.Reviews}
                    onChange={change}
                  ></textarea>
                  {/* Check whether the reviews error is set, if set display the corresponding error message using conditional rendering
                   */}
                </div>
                <br />
                {/* Bind the disabled attribute to the button to the valid state variable */}
                <button
                  type="submit"
                  className="btn mb-2 d-block text-white"
                  style={{ backgroundColor: "#88685e" }}
                  onClick={handleSubmit}
                >
                  Add Review
                </button>
                <br />
                {/*Using the concept of conditional rendering,display success message, error messages related to required fields and axios calls */}
                {/* {if the form fields are not entered then set the message as 'Enter all the form fields'} */}
                <div data-testid="mandatory" className="text-danger"></div>
                <div data-testid="Message" className="text-danger"></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Addreview;
