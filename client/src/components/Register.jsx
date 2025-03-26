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