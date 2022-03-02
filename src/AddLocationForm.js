import React, { useState, useContext } from "react";
import UserContext from "./UserContext";
import Alert from "./Alert";
// import "./AddLocationForm.css"


/** AddLocationForm: Add Location page presents form that takes in all
 *  needed information to create a new user-specific location in our database.
 *
 *  State: formData, formError
 *  Context: addLocation, currentUser
 */

// TODO get lat and long to autopopulate once usgsId is typed 
// in?? or deal with it in app.js on submission?? latter for now

function AddLocationForm() {
  const { addLocation, currentUser } = useContext(UserContext);
  const [ formError, setFormError ] = useState(null);
  const [ formData, setFormData ] = useState({
    username: currentUser.username,
    name: "",
    usgsId: "",
    fish: ""
  });

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  }

  // Sends search back to parent component
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await addLocation(formData);
    } catch (err) {
      setFormError(err);
    }
  }

  return (
    <div className="AddLocationForm">
      <div className="AddLocationForm-body">
        <div className="AddLocationForm-form card mx-auto">
          <form className="AddLocation-page" onSubmit={handleSubmit}>
            <div className="form-group">
              <legend className="form-title">Add Location</legend>
              <div className="form-floating mb-3">
                <input
                  id="floatingName"
                  name="name"
                  type="name"
                  className="form-control"
                  placeholder="name"
                  onChange={handleChange}
                  value={formData.name}
                  required
                />
                <label htmlFor="floatingName">Location Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  id="floatingUsgsId"
                  name="usgsId"
                  type="usgsId"
                  className="form-control"
                  placeholder="usgsId"
                  onChange={handleChange}
                  value={formData.usgsId}
                  required
                />
                <label htmlFor="floatingUsgsId">USGS Location Id</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  id="floatingFish"
                  name="fish"
                  className="form-control"
                  placeholder="Fish Species"
                  onChange={handleChange}
                  value={formData.fish}
                  required
                />
                <label htmlFor="floatingFish">Fish Species</label>
              </div>
            </div>
            <button className="btn btn-primary me-2">Add Location</button>
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

export default AddLocationForm;