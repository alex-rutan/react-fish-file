import React, { useState, useContext } from "react";
import UserContext from "./UserContext";
import Alert from "./Alert";
import "./LoginForm.css"


/** LoginForm: Login page that presents form that takes in a username 
 *  and password to run authentication.
 *
 *  State: loginInfo, formError
 *  Context: login
 */

function LoginForm() {
  const { login } = useContext(UserContext);
  const [loginInfo, setLoginInfo] = useState({ username: "", password: "" });
  const [formError, setFormError] = useState(null);


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
    <div className="LoginForm">
      <div className="LoginForm-body">
        <div className="LoginForm-form card mx-auto">
          <form className="Login-page" onSubmit={handleSubmit}>
            <div className="form-group">
              <legend className="form-title">Login</legend>
              <div className="form-floating mb-3">
                <input
                  id="floatingUsername"
                  name="username"
                  type="username"
                  className="form-control"
                  placeholder="Username"
                  onChange={handleChange}
                  value={loginInfo.username}
                  required
                />
                <label htmlFor="floatingUsername">Username</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  id="floatingPassword"
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={handleChange}
                  value={loginInfo.password}
                  required
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>
            </div>
            <button className="btn btn-primary me-2">Login</button>
          </form>
          {formError !== null ?
            <Alert
              className="alert"
              type="danger"
              messages={formError} />
            :
            null
          }
        </div>
      </div>
    </div>
  );
}

export default LoginForm;