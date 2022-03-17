import React, { useState, useContext } from "react";
import UserContext from "./UserContext";
import Alert from "./Alert";
import "./LoginForm.css"


/** LoginForm: Login page that presents form that takes in a username 
 *  and password to run authentication.
 * 
 *  Context: login
 *  State: loginInfo, formError
 */

function LoginForm() {
  const { login } = useContext(UserContext);
  const [loginInfo, setLoginInfo] = useState({ username: "", password: "" });
  const [formError, setFormError] = useState(null);

  // Handles form changes on keystrokes
  function handleChange(evt) {
    const { name, value } = evt.target;
    setLoginInfo((LoginData) => ({
      ...LoginData,
      [name]: value,
    }));
  }

  // Sends search back to parent component
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await login(loginInfo);
    } catch (err) {
      console.log("FORM ERROR", err)
      setFormError(err);
    }
  }

  return (
    <div className="LoginForm text-center">
      <div className="card login-form-card">
        <form className="login-form" onSubmit={handleSubmit}>
          <legend className="form-title mb-3">Log In</legend>
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
              value={loginInfo.username}
              required
            />
            <label className="form-label" htmlFor="floatingUsername">
              Username
            </label>
          </div>
          <div className="form-floating mb-3">
            <input
              id="floatingPassword"
              name="password"
              type="password"
              className="form-control"
              // placeholder="Password"
              onChange={handleChange}
              value={loginInfo.password}
              required
            />
            <label className="form-label" htmlFor="floatingPassword">
              Password
            </label>
          </div>
          <button type="submit" className="btn btn-primary m-2">Log In</button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;