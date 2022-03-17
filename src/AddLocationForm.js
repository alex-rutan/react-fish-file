import React, { useState, useContext } from "react";
import UserContext from "./UserContext";
import Alert from "./Alert";
import "./AddLocationForm.css"
import { useNavigate } from "react-router-dom";


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
  const navigate = useNavigate();

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
      navigate('/locations');
    } catch (err) {
      setFormError(err);
    }
  }

  return (
    <div className="AddLocationForm">
      <div className="card location-form-card">
        <form className="location-form" onSubmit={handleSubmit}>
            <legend className="form-title mb-4">Add Location</legend>
            {formError !== null ?
              <Alert
                type="danger"
                messages={formError} />
              :
              null
            }
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
            <div className="form-floating mb-4">
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
          <div className="form-check form-switch mb-4">
            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>
              <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Add location as a favorite? (favorite locations show up on home screen)</label>
          </div>
          <button type="submit" className="btn btn-primary">Add Location</button>
        </form>
      </div>
    </div>
  );
}

export default AddLocationForm;