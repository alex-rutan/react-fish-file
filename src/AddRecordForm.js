import React, { useState, useContext } from "react";
import UserContext from "./UserContext";
import Alert from "./Alert";
// import "./AddRecordForm.css"


/** AddRecordForm: Add Record page that presents form that takes in all
 *  needed information to create a new user instance in our database.
 *
 *  State: AddRecordInfo, formError
 *  Context: AddRecord
 */

function AddRecordForm() {
  const { AddRecord } = useContext(UserContext);
  const [ formError, setFormError ] = useState(null);
  const [ AddRecordInfo, setAddRecordInfo ] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: ""
  });

  function handleChange(evt) {
    const { name, value } = evt.target;
    setAddRecordInfo((AddRecordData) => ({
      ...AddRecordData,
      [name]: value,
    }));
  }

  // Sends search back to parent component
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await AddRecord(AddRecordInfo);
    } catch (err) {
      setFormError(err);
    }
  }

  return (
    <div className="AddRecordForm">
      <div className="AddRecordForm-body">
        <div className="AddRecordForm-form card mx-auto">
          <form className="AddRecord-page" onSubmit={handleSubmit}>
            <div className="form-group">
              <legend className="form-title">Sign Up</legend>
              <div className="form-floating mb-3">
                <input
                  id="floatingUsername"
                  name="username"
                  type="username"
                  className="form-control"
                  placeholder="Username"
                  onChange={handleChange}
                  value={AddRecordInfo.username}
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
                  value={AddRecordInfo.password}
                  required
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  id="floatingFirstName"
                  name="firstName"
                  className="form-control"
                  placeholder="First Name"
                  onChange={handleChange}
                  value={AddRecordInfo.firstName}
                  required
                />
                <label htmlFor="floatingFirstName">First Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  id="floatingLastName"
                  name="lastName"
                  className="form-control"
                  placeholder="Last Name"
                  onChange={handleChange}
                  value={AddRecordInfo.lastName}
                  required
                />
                <label htmlFor="floatingLastName">Last Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  id="floatingEmail"
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  onChange={handleChange}
                  value={AddRecordInfo.email}
                  required
                />
                <label htmlFor="floatingEmail">Email</label>
              </div>
            </div>
            <button className="btn btn-primary me-2">Sign Up</button>
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

export default AddRecordForm;