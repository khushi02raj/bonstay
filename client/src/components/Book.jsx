import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Book = () => {
  const {hotelId} = useParams();
  const [state, setState] = useState({
    startDate: "",
    endDate: "",
    noOfPersons: "",
    noOfRooms: "",
    typeOfRoom: "",
  });
  const [formErrors, setFormErrors] = useState({
    startDate: "",
    endDate: "",
    noOfPersons: "",
    noOfRooms: "",
    typeOfRoom: "",
  });
  // state variable used to disable the button when any of the given form values is invalid
  const [valid, setValid] = useState(false);
  // state variable to indicate whether user has given values to all the mandatory fields of the form.
  const [mandatory, setMandatory] = useState(false);
  // state variable to capture the success Message once the booking is completed successfully.
  const [Message, setMessage] = useState("");

  useEffect(() => {
    // Validate form fields and update the valid state variable
    const isValid =
      state.startDate &&
      state.endDate &&
      state.noOfPersons > 0 &&
      state.noOfPersons <= 5 &&
      state.noOfRooms > 0 &&
      state.noOfRooms <= 3 &&
      state.typeOfRoom;
    setValid(isValid);
  }, [state]);

  const change = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });

    // set the condition as the starting date should be after today's date.
    if (e.target.name === "startDate") {
      if (new Date(e.target.value) < new Date()) {
        setFormErrors({
          ...formErrors,
          startDate: "Start date should be after today's date",
        });
      } else {
        setFormErrors({ ...formErrors, startDate: "" });
      }
    }
    // set the condition as the End date should be greater than or equal to start date.
    if (e.target.name === "endDate") {
      if (new Date(e.target.value) < new Date(state.startDate)) {
        setFormErrors({
          ...formErrors,
          endDate: "End date should be greater than or equal to start date",
        });
      } else {
        setFormErrors({ ...formErrors, endDate: "" });
      }
    }
    // set the condition as the number of persons should be greater than 0 and less than or equal to 5
    if (e.target.name === "noOfPersons") {
      if (e.target.value < 1 || e.target.value > 5) {
        setFormErrors({
          ...formErrors,
          noOfPersons: "The number of persons should be greater than 0 and less than or equal to 5",
        });
      } else {
        setFormErrors({ ...formErrors, noOfPersons: "" });
      }
    }

    // set the condition as the number of rooms should be greater than 0 and less than or equal to 3
    if (e.target.name === "noOfRooms") {
      if (e.target.value < 1 || e.target.value > 3) {
        setFormErrors({
          ...formErrors,
          noOfRooms: "The number of rooms should be greater than 0 and less than or equal to 3",
        });
      } else {
        setFormErrors({ ...formErrors, noOfRooms: "" });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      state.startDate === "" ||
      state.endDate === "" ||
      state.noOfPersons === "" ||
      state.noOfRooms === "" ||
      state.typeOfRoom === ""
    ) {
      setMandatory(true);
      setMessage("Enter all the form fields");
      return;
    } else {
      setMandatory(false);
    }
    console.log(hotelId);
    
    try {
      const response = await axios.post("http://localhost:4000/api/bookings/create", {...state,hotelId});
      setMessage("Booking is successfully created!",response.data);
    } catch (error) {
      console.log(error);
      setMessage("Something went wrong while booking");
    }
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
                  {formErrors.startDate && (
                    <div className="text-danger">{formErrors.startDate}</div>
                  )}
                </div>
                <div className="mb-2 mt-2">
                  <label className="form-label">End Date:</label>
                  <input
                    type="Date"
                    className="form-control"
                    name="endDate"
                    value={state.endDate}
                    onChange={change}
                  />
                  {formErrors.endDate && (
                    <div className="text-danger">{formErrors.endDate}</div>
                  )}
                </div>
                <div className="mb-2 mt-2">
                  <label className="form-label">No Of Persons:</label>
                  <input
                    type="number"
                    className="form-control"
                    name="noOfPersons"
                    value={state.noOfPersons}
                    onChange={change}
                  />
                  {formErrors.noOfPersons && (
                    <div className="text-danger">{formErrors.noOfPersons}</div>
                  )}
                </div>
                <div className="mb-2 mt-2">
                  <label className="form-label">No Of Rooms:</label>
                  <input
                    type="number"
                    className="form-control"
                    name="noOfRooms"
                    value={state.noOfRooms}
                    onChange={change}
                  />
                  {formErrors.noOfRooms && (
                    <div className="text-danger">{formErrors.noOfRooms}</div>
                  )}
                </div>
                <div className="mb-2">
                  <label className="form-label">Type of Rooms:</label>
                  <select
                    name="typeOfRoom"
                    className="form-control"
                    value={state.typeOfRoom}
                    onChange={change}
                  >
                    <option value="">--select room type--</option>
                    <option value="AC">AC</option>
                    <option value="Non AC">Non AC</option>
                  </select>
                  {formErrors.typeOfRoom && (
                    <div className="text-danger">{formErrors.typeOfRoom}</div>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn mb-2 d-block text-white"
                  style={{ backgroundColor: "#88685e" }}
                  onClick={(e) => handleSubmit(e)}
                  disabled={!valid}
                >
                  Book
                </button>

                {mandatory && (
                  <div data-testid="mandatory" className="text-danger">
                    Enter all the form fields
                  </div>
                )}
                {Message && (
                  <div data-testid="Message" className="text-danger">
                    {Message}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Book;