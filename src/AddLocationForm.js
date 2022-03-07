import React, { useState, useContext } from "react";
import UserContext from "./UserContext";
import Alert from "./Alert";
import "./AddLocationForm.css"


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

  // Sends addLocation call back to parent component
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
      <div className="card location-form-card">
        <form className="location-form" onSubmit={handleSubmit}>
            <legend className="form-title m-2">Add Location</legend>
            <div className="form-floating mb-4">
              <input
                id="floatingName"
                name="name"
                type="name"
                className="form-control"
                // placeholder="Location Name"
                onChange={handleChange}
                value={formData.name}
                aria-describedby="nameHelpBlock"
                required
              />
              <div id="nameHelpBlock" className="form-text m-2">
                Provide a name of your choosing for the location.
              </div>
              <label className="form-label" htmlFor="floatingName">Location Name</label>
            </div>
            <div className="form-floating mb-4">
              <input
                id="floatingUsgsId"
                name="usgsId"
                type="usgsId"
                className="form-control"
                // placeholder="USGS Station Number"
                onChange={handleChange}
                value={formData.usgsId}
                aria-describedby="usgsIdHelpBlock"
              />
              <div id="passwordHelpBlock" className="form-text m-2">
              Provide a USGS Station Number if you'd like to access current and historical flow data for your location. Visit https://waterdata.usgs.gov/STATE_ABBR_HERE/nwis/current/?type=flow with the state abbreviation included to view river flow gauge sites and find the appropriate USGS Station Number.
              </div>
              <label htmlFor="floatingUsgsId">USGS Station Number</label>
            </div>
            <div className="form-floating mb-3">
              <input
                id="floatingFish"
                name="fish"
                className="form-control"
                // placeholder="Fish Species"
                onChange={handleChange}
                value={formData.fish}
                aria-describedby="fishHelpBlock"
              />
              <div id="fishHelpBlock" className="form-text m-2">
                Provide a list of fish species for the location. You must separate fish species with a comma and space like so: Rainbow Trout, Brown Trout, Smallmouth Bass
              </div>
              <label htmlFor="floatingFish">Fish Species</label>
          </div>
          <button type="submit" className="btn btn-primary m-2">Add Location</button>
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
  );
}

export default AddLocationForm;