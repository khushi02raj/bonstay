
//   //state variable used to disable the button when any given form values is invalid.
//   const [valid, setValid] = useState(false);
//   //state variable to indicate whether user has given values to all the mandatory fields of the form.
//   const [mandatory, setMandatory] = useState(false);
//   //state variable to capture the success Message once the registration is completed successfully.
//   const [successMessage, setSuccessMessage] = useState("");

//     /*
//        1. This method will be invoked whenever the user changes the value of any form field. This method should also validate the form fields.
//        2. 'event' input parameter will contain both name and value of the form field.
//        3. Set state using the name and value recieved from event parameter 
//        */
    
    
//       // set the condition as The length of the name should be minimum 3 character.
//       if(name==="name"){
//         if(value.length<3){
//           setFormErrors({...formErrors, name:"Name should be minimum 3 characters"})
//         }else{
//           setFormErrors({...formErrors, name:""})
//         }
//       }
    
//       // set the condition as required field.
//       if(name==="address"){
//         if(value.length===0){
//           setFormErrors({...formErrors, address:"Address is required"}) 
//         }else{
//           setFormErrors({...formErrors, address:""})
//         }
//       }
//          // set the condition as the Phone number should have 10 digits.

//       if(name==="phoneNo"){
//         if(value.length!==10){    
//           setFormErrors({...formErrors, phoneNo:"Phone number should have 10 digits"})
//         }else{
//           setFormErrors({...formErrors, phoneNo:""})  
//         } 
//       }
    
//       // set the condition as the Email should match the basic email format.
//       if(name==="email"){
//         if(!value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
//           setFormErrors({...formErrors, email:"Email should match the basic email format"})
//         }else{
//           setFormErrors({...formErrors, email:""})
//         }
//       }
//       // set the condition as The length of the password should be between 8 and 12 characters
//       if(name==="password"){
//         if(value.length<8 || value.length>12){
//           setFormErrors({...formErrors, password:"Password should be between 8 and 12 characters"})
//         }else{
//           setFormErrors({...formErrors, password:""})
//         }
//       }
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // 3. check whether all the form fields are entered. If any of the form fields is not entered set the mandatory state variable to true.
//     if (
//       state.name === "" ||
//       state.address === "" ||
//       state.phoneNo === "" ||
//       state.email === "" ||
//       state.password === ""
//     ) {
//       setMandatory(true);
//     } else {
//       setMandatory(false);
//     }
//     // 4.  If all the form fields values are entered then make axios call to
//     // "http://localhost:4000/users/" and pass the appropriate state as data to the axios call
//     if (
//       state.name !== "" &&
//       state.address !== "" &&
//       state.phoneNo !== "" &&
//       state.email !== "" &&
//       state.password !== ""
//     ) {
//       //axios call
//       axios.post("http://localhost:4000/api/users/register", state)
//       .then((res) => {
//         setSuccessMessage("User registered successfully with the id " + res.data.id);
//       })
//       .catch((err) => {
//         setSuccessMessage("Error while registering user");
//       });
//     } else {
//       setSuccessMessage("Enter all the form fields");     
//     }
//     // 5. If the axios call is successful, assign the below string to successMessage state:
//     //    "User registered successfully with the id "+ <id>
//     // 6. If the axios call is not successful, assign the error message to "Error while registering user"
//     navigate("/login");
//   };
//   return (
//     <>
//       <div>
//         <div
//           className="container text-start p-5"
//           style={{ width: "60%", fontSize: "14px" }}
//         >
//           <div className="row p-3">
//             <div className="col-lg-6 "></div>
//             <div className="col-lg-6" style={{ backgroundColor: "#ebe7e7" }}>
//               <form>
//                 {/*
//                 1. Display successMessage or errorMessage after submission of form
//                 2. Form should be controlled
//                 3. Event handling methods should be binded appropriately
//                 4. Invoke the appropriate method on form submission
//                 */}
//                 <div className="mb-2 mt-2">
//                   <label className="form-label">Name:</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     name="name"
//                     value={state.name}
//                     onChange={change}
//                   />
//                   {/* check whether name error is set,if set display the corresponding error message using conditional rendering */}
//                 </div>
//                 <div className="mb-2 mt-2">
//                   <label className="form-label">Address:</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     name="address"
//                     value={state.address}
//                     onChange={change}
//                   />
//                   {/* check whether address error is set,if set display the corresponding error message using conditional rendering */}
//                 </div>
//                 <div className="mb-2 mt-2">
//                   <label className="form-label">PhoneNo:</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     name="phoneNo"
//                     value={state.phoneNo}
//                     onChange={change}
//                   />
//                   {/* check whether phoneNo error is set,if set display the corresponding error message using conditional rendering */}
//                 </div>
//                 <div className="mb-2 mt-2">
//                   <label className="form-label">Email:</label>
//                   <input
//                     type="email"
//                     className="form-control"
//                     name="email"
//                     value={state.email}
//                     onChange={change}
//                   />
//                   {/* check whether email error is set,if set display the corresponding error message using conditional rendering */}
//                 </div>
//                 <div className="mb-2">
//                   <label className="form-label">Password:</label>
//                   <input
//                     type="password"
//                     className="form-control"
//                     name="password"
//                     value={state.password}
//                     onChange={change}
//                   />
//                   {/* check whether password error is set,if set display the corresponding error message using conditional rendering */}
//                 </div>
//                 {/* bind the disabled attribute to the button to the valid state variable */}
//                 <button
//                   type="submit"
//                   className="btn mb-2 d-block text-white"
//                   style={{ backgroundColor: "#88685e" }}
//                   onClick={handleSubmit}
//                 >
//                   Register
//                 </button>
//                 <br />
//                 {/*Using the concept of conditional rendering,display success message, error messages related to required fields and axios calls */}
//                 {/* {if the form fields are not entered then set the message as 'Enter all the form fields'} */}
//                 <div data-testid="mandatory" className="text-danger"></div>
//                 <div data-testid="successMessage" className="text-danger"></div>
//                 <Link to="/login">Login</Link> with your existing account
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
// export default Register;
import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    name: "",
    address: "",
    phoneNo: "",
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    address: "",
    phoneNo: "",
    email: "",
    password: "",
  });
  const [valid, setValid] = useState(false);
  const [mandatory, setMandatory] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const change = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });

    if (name === "name") {
      if (value.length < 3) {
        setFormErrors({ ...formErrors, name: "Name should be minimum 3 characters" });
      } else {
        setFormErrors({ ...formErrors, name: "" });
      }
    }

    if (name === "address") {
      if (value.length === 0) {
        setFormErrors({ ...formErrors, address: "Address is required" });
      } else {
        setFormErrors({ ...formErrors, address: "" });
      }
    }

    if (name === "phoneNo") {
      if (value.length !== 10) {
        setFormErrors({ ...formErrors, phoneNo: "Phone number should have 10 digits" });
      } else {
        setFormErrors({ ...formErrors, phoneNo: "" });
      }
    }

    if (name === "email") {
      if (!value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
        setFormErrors({ ...formErrors, email: "Email should match the basic email format" });
      } else {
        setFormErrors({ ...formErrors, email: "" });
      }
    }

    if (name === "password") {
      if (value.length < 8 || value.length > 12) {
        setFormErrors({ ...formErrors, password: "Password should be between 8 and 12 characters" });
      } else {
        setFormErrors({ ...formErrors, password: "" });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      state.name === "" ||
      state.address === "" ||
      state.phoneNo === "" ||
      state.email === "" ||
      state.password === ""
    ) {
      setMandatory(true);
      setSuccessMessage("Enter all the form fields");
      return;
    } else {
      setMandatory(false);
    }

    try {
      const response = await axios.post("http://localhost:4000/api/users/register", state);
      setSuccessMessage("User registered successfully with the id ",response);
      navigate("/login");
    } catch (error) {
      console.error("Error while registering user:", error);
      setSuccessMessage("Error while registering user");
    }
  };

  return (
    <div>
      <div className="container text-start p-5" style={{ width: "60%", fontSize: "14px" }}>
        <div className="row p-3">
          <div className="col-lg-6 "></div>
          <div className="col-lg-6" style={{ backgroundColor: "#ebe7e7" }}>
            <form>
              <div className="mb-2 mt-2">
                <label className="form-label">Name:</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={state.name}
                  onChange={change}
                />
                {formErrors.name && <div className="text-danger">{formErrors.name}</div>}
              </div>
              <div className="mb-2 mt-2">
                <label className="form-label">Address:</label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={state.address}
                  onChange={change}
                />
                {formErrors.address && <div className="text-danger">{formErrors.address}</div>}
              </div>
              <div className="mb-2 mt-2">
                <label className="form-label">PhoneNo:</label>
                <input
                  type="text"
                  className="form-control"
                  name="phoneNo"
                  value={state.phoneNo}
                  onChange={change}
                />
                {formErrors.phoneNo && <div className="text-danger">{formErrors.phoneNo}</div>}
              </div>
              <div className="mb-2 mt-2">
                <label className="form-label">Email:</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={state.email}
                  onChange={change}
                />
                {formErrors.email && <div className="text-danger">{formErrors.email}</div>}
              </div>
              <div className="mb-2">
                <label className="form-label">Password:</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={state.password}
                  onChange={change}
                />
                {formErrors.password && <div className="text-danger">{formErrors.password}</div>}
              </div>
              <button
                type="submit"
                className="btn mb-2 d-block text-white"
                style={{ backgroundColor: "#88685e" }}
                onClick={handleSubmit}
              >
                Register
              </button>
              <br />
              {mandatory && <div data-testid="mandatory" className="text-danger">Enter all the form fields</div>}
              {successMessage && <div data-testid="successMessage" className="text-danger">{successMessage}</div>}
              <Link to="/login">Login</Link> with your existing account
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;