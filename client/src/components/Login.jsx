import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });
  const [valid, setValid] = useState(false);
  const [message, setMessage] = useState("");

  const change = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (state.email === "" || state.password === "") {
        setFormErrors({
          ...formErrors,
          email: state.email === "" ? "Email is required" : "",
          password: state.password === "" ? "Password is required" : "",
        });
        setMessage("Please fill in all required fields.");
      } else if (state.password.length < 8 || state.password.length > 12) {
        setFormErrors({
          ...formErrors,
          password: "Password should be between 8 and 12 characters",
        });
        setMessage("Password should be between 8 and 12 characters.");
      } else {
        setFormErrors({ email: "", password: "" });
        const response = await axios.post("https://bonstay.onrender.com/api/users/login", state);
        // const response = await axios.post("http://localhost:4000/api/users/login", state);
        setMessage("User logged in successfully");
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      setMessage("Error while logging in");
    }
  };

  return (
    <>
      <br />
      <div className="row">
        <div>
          <br />
          <div
            className="cards"
            style={{
              backgroundColor: "lavender",
              width: "500px",
              marginLeft: "400px",
              marginBottom: "100px",
            }}
          >
            <div className="card-body">
              <div className="row p-3">
                <div className="col-lg-6 "></div>
                <div style={{ backgroundColor: "#ebe7e7" }}>
                  <form onSubmit={handleSubmit}>
                    <h3
                      style={{
                        textAlign: "center",
                        fontFamily: "revert-layer",
                        color: "brown",
                      }}
                    >
                      Bonstay with us
                    </h3>
                    <div className="mb-2 mt-2">
                      <label className="form-label">Email:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="email"
                        value={state.email}
                        onChange={change}
                      />
                      {formErrors.email && (
                        <div className="text-danger">{formErrors.email}</div>
                      )}
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
                      {formErrors.password && (
                        <div className="text-danger">{formErrors.password}</div>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="btn mb-2 d-block text-white"
                      style={{
                        backgroundColor: "#88685e",
                        paddingRight: "20px",
                        paddingLeft: "15px",
                      }}
                    >
                      Login
                    </button>
                    <br />
                    {message && (
                      <div data-testid="Message" className="text-danger">
                        {message}
                      </div>
                    )}
                    <Link to="/register">Sign Up</Link> to create a new account
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;


//   //state variable used to disable the button when any given form values is invalid.
//   const [valid, setValid] = useState(false);
//   //state variable to capture the success Message once the Login is completed successfully.
//   const [Message, setMessage] = useState("");

//   const change = (e) => {
//     setstate({...state,[e.target.name]:e.target.value})
//     /*
//        1. This method will be invoked whenever the user changes the value of any form field. This method should also validate the form fields.
//        2. 'event' input parameter will contain both name and value of the form field.
//        3. Set state using the name and value recieved from event parameter 
//        */
//     // set the condition as it's a required field.
//     // set the condition as The length of the password should be between 8 and 12 characters
//   };
//   const handleSubmit =async (e) => {
//     e.preventDefault();
    
//     // 3.  If all the form fields values are entered then make axios call to
//     // "http://localhost:4000/users/" and pass the appropriate state as data to the axios call
//     try{
//     if(state.email===""||state.password===""){
//       setFormErrors({...formErrors,email:"Email is required",password:"Password is required"});
//     }
//     else if(state.password.length<8||state.password.length>12){ 
//       setFormErrors({...formErrors,password:"Password should be between 8 and 12 characters"});
//     }
//     else{
//       setFormErrors({...formErrors,email:"",password:""});
//     }
//     if(formErrors.email===""&&formErrors.password===""){
//         await axios.post("http://localhost:4000/api/users/login",state);
//         setMessage("user logged in successfully");
//         navigate("/");
//     }
//   }
//     catch(err){
//       console.log(err);
//       setMessage("Error while logging in");
//     }

//     // 4. If the axios call is successful, assign the below string to successMessage state:
//     //    "user logged in successfully."
//     // 5. If the axios call is not successful, assign the error message to "Error while logging in"
//   };

//   return (
//     <>
//       <br />
//       <div className="row">
//         <div>
//           <br />
//           <div
//             className="cards"
//             style={{
//               backgroundColor: "lavender",
//               width: "500px",
//               marginLeft: "400px",
//               marginBottom: "100px",
//             }}
//           >
//             <div className="card-body">
//               <div className="row p-3">
//                 <div className="col-lg-6 "></div>
//                 <div style={{ backgroundColor: "#ebe7e7" }}>

//                   <form>
//                     {/*
//                 1. Display successMessage or errorMessage after submission of form
              
//                 2. Form should be controlled
//                 3. Event handling methods should be binded appropriately
//                 4. Invoke the appropriate method on form submission
//                 */}
                
//                     <h3
//                       style={{
//                         textAlign: "center",
//                         fontFamily: "revert-layer",
//                         color: "brown",
//                       }}
//                     >
//                       Bonstay with us
//                     </h3>
//                     <div className="mb-2 mt-2">
//                       <label className="form-label">Email:</label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         name="email"
//                         value={state.email}
//                         onChange={change}
//                       />
//                       {/* check whether email error is set,if set display the corresponding error message using conditional rendering */}
//                    {formErrors.email && <div className="text-danger">{formErrors.email}</div>}
//                     </div>
//                     <div className="mb-2">
//                       <label className="form-label">Password:</label>
//                       <input
//                         type="password"
//                         className="form-control"
//                         name="password"
//                         value={state.password}
//                         onChange={change}
//                       />
//                       {/* check whether password error is set,if set display the corresponding error message using conditional rendering */}
//                     </div>
//                     {formErrors.password && <div className="text-danger">{formErrors.password}</div>}
//                     {/* bind the disabled attribute to the button to the valid state variable */}
//                     <button
//                       type="submit"
//                       className="btn mb-2 d-block text-white"
//                       style={{
//                         backgroundColor: "#88685e",
//                         paddingRight: "20px",
//                         paddingLeft: "15px",
//                       }}
//                       onClick={ handleSubmit }
//                     >
//                       Login
//                     </button>
//                     <br />
//                     {/*Using the concept of conditional rendering,display success message, error messages related to required fields and axios calls */}
//                     <div data-testid="Message" className="text-danger"></div>
//                     <Link to="/register">Sign Up</Link> to create a new account
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;
