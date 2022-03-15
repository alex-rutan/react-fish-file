import React, { useState, useContext } from "react";
import UserContext from "./UserContext";
import Alert from "./Alert";
import "./SignUpForm.css"


/** SignUpForm: Sign up page that presents form that takes in all
 *  needed information to create a new user instance in our database.
 *
 *  State: signUpInfo, formError
 *  Context: signup
 */

function SignUpForm() {
  const { signup } = useContext(UserContext);
  const [formError, setFormError] = useState(null);
  const [signUpInfo, setSignUpInfo] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: ""
  });

  function handleChange(evt) {
    const { name, value } = evt.target;
    setSignUpInfo((SignUpData) => ({
      ...SignUpData,
      [name]: value,
    }));
  }

  // Sends search back to parent component
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await signup(signUpInfo);
    } catch (err) {
      setFormError(err);
    }
  }

  return (
    <div className="SignUpForm text-center">
      <div className="card signup-form-card">
        <form className="signup-form" onSubmit={handleSubmit}>
          <legend className="form-title mb-3">Sign Up</legend>
          {formError !== null ?
            <Alert
              type="danger"
              messages={formError} />
            :
            null
          }
          <div className="form-floating mb-4">
            <input
              id="floatingUsername"
              name="username"
              type="username"
              className="form-control"
              // placeholder="Username"
              onChange={handleChange}
              value={signUpInfo.username}
              required
            />
            <label className="form-label" htmlFor="floatingUsername">Username</label>
          </div>
          <div className="form-floating mb-4">
            <input
              id="floatingPassword"
              name="password"
              type="password"
              className="form-control"
              // placeholder="Password"
              onChange={handleChange}
              value={signUpInfo.password}
              required
            />
            <label className="form-label" htmlFor="floatingPassword">Password</label>
          </div>
          <div className="form-floating mb-4">
            <input
              id="floatingFirstName"
              name="firstName"
              className="form-control"
              // placeholder="First Name"
              onChange={handleChange}
              value={signUpInfo.firstName}
              required
            />
            <label className="form-label" htmlFor="floatingFirstName">First Name</label>
          </div>
          <div className="form-floating mb-4">
            <input
              id="floatingLastName"
              name="lastName"
              className="form-control"
              // placeholder="Last Name"
              onChange={handleChange}
              value={signUpInfo.lastName}
              required
            />
            <label className="form-label" htmlFor="floatingLastName">Last Name</label>
          </div>
          <div className="form-floating mb-3">
            <input
              id="floatingEmail"
              name="email"
              type="email"
              className="form-control"
              // placeholder="Email"
              onChange={handleChange}
              value={signUpInfo.email}
              required
            />
            <label className="form-label" htmlFor="floatingEmail">Email</label>
          </div>
          <button type="submit" className="btn btn-primary m-2">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignUpForm;