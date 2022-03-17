import React, { useState, useContext, useEffect } from "react";
import UserContext from "./UserContext";
import Alert from "./Alert";
import "./AddRecordForm.css"
import WeatherTypeArr from "./WeatherTypeArray";
import { useNavigate } from "react-router-dom";

/** AddRecordForm: Add Record page that presents form that takes in all
 *  needed information to create a new record instance in our database.
 *
 *  State: AddRecordInfo, formError
 *  Context: AddRecord
 */

function AddRecordForm() {
  const { currentUser, addRecord, getAllLocations } = useContext(UserContext);
  const [ locations, setLocations ] = useState([]);
  const [ formError, setFormError ] = useState(null);
  const [ formData, setFormData ] = useState({
    username: currentUser.username,
    locationId: "",
    date: "",
    rating: "",
    description: "",
    flies: "",
    waterTemp: "",
    pressure: "",
    weather: "",
    highTemp: "",
    lowTemp: ""
  });
  const navigate = useNavigate();

  useEffect(
    function getLocations() {
      async function getLocationsResponse() {
        const allLocations = await getAllLocations(currentUser.username);

        setLocations(allLocations);
      }
      getLocationsResponse();
    },
    [currentUser.username, getAllLocations]
  )

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  }

  // Sends addRecord call back to parent component
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await addRecord(formData);
      navigate('/records');
    } catch (err) {
      setFormError(err);
    }
  }

  return (
    <div className="AddRecordForm">
      <div className="card record-form-card">
        <form className="record-form" onSubmit={handleSubmit}>
          <legend className="form-title mb-4">Add Record</legend> 
          {formError !== null ?
            <Alert
              type="danger"
              messages={formError} />
            :
            null
          }
          <div className="row mb-4">
            <div className="col-7">
              <div className="form-floating">
                <select
                  id="floatingLocation"
                  name="locationId"
                  type="select"
                  className="form-select form-control"
                  onChange={handleChange}
                  value={formData.location}
                  required
                >
                  <option value={null}></option>
                  {locations.map(location => (
                    <option key={location.id} value={location.id}>{location.name}</option>
                  ))}
                </select>
                <label className="form-floating-label" htmlFor="floatingLocation">Location</label>
              </div>
            </div>
            <div className="col-3">
              <div className="form-floating">
                <input
                  id="floatingDate"
                  name="date"
                  type="date"
                  className="form-control"
                  placeholder="date"
                  onChange={handleChange}
                  value={formData.date}
                  required
                />
                <label htmlFor="floatingDate">Date</label>
              </div>
            </div>
            <div className="col-2">
              <div className="form-floating">
                <select
                  id="floatingRating"
                  name="rating"
                  type="select"
                  className="form-select form-control"
                  onChange={handleChange}
                  value={formData.rating}
                  required
                >
                  <option value={null}></option>
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num, index) => (
                    <option key={index} value={num}>{num}</option>
                  ))}
                </select>
                <label className="form-floating-label" htmlFor="floatingRating">Rating</label>
              </div>
            </div>
          </div>

          <div className="form-floating mb-4">
            <textarea 
              id="floatingDescription"
              name="description"
              className="form-control"
              // placeholder="description"
              onChange={handleChange}
              value={formData.description} 
              style={{height: "100px"}}>
            </textarea>
            <label htmlFor="floatingDescription" className="form-label">Description</label>
          </div>             

          <div className="form-floating mb-4">
            <input
              id="floatingFlies"
              name="flies"
              className="form-control"
              // placeholder="Flies"
              onChange={handleChange}
              value={formData.flies}
              aria-describedby="fliesHelpBlock"
            />
            <div id="fliesHelpBlock" className="form-text m-2">
              List flies that worked well for the day. You must separate flies with a comma and space like so: Sculpzilla, Olive WD-40, Parachute Adams
            </div>
            <label htmlFor="floatingFlies">Flies</label>
          </div>

          <div className="row mb-3">
            <div className="col-3">
              <div className="form-floating">
                <input
                  id="floatingWaterTemp"
                  name="waterTemp"
                  className="form-control"
                  // placeholder="Water Temperature"
                  onChange={handleChange}
                  value={formData.waterTemp}
                />
                <label htmlFor="floatingWaterTemp">Water Temp (°F)</label>
              </div>
            </div>
            <div className="col-6">
              <div className="form-floating">
                <select
                  id="floatingWeather"
                  name="weather"
                  type="select"
                  className="form-select form-control"
                  onChange={handleChange}
                  value={formData.weather}
                  required
                >
                  <option value={null}></option>
                  {WeatherTypeArr.map((weather, index) => (
                    <option key={index} value={weather}>{weather}</option>
                  ))}
                </select>
                <label className="form-floating-label" htmlFor="floatingWeather">Weather</label>
              </div>
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-3">
              <div className="form-floating">
                <input
                  id="floatingPressure"
                  name="pressure"
                  className="form-control"
                  // placeholder="Water Temperature"
                  onChange={handleChange}
                  value={formData.pressure}
                />
                <label htmlFor="floatingPressure">Pressure (in Hg)</label>
              </div>
            </div>
            <div className="col-3">
              <div className="form-floating mb-3">
                <input
                  id="floatingHighTemp"
                  name="highTemp"
                  className="form-control"
                  // placeholder="High Temperature"
                  onChange={handleChange}
                  value={formData.highTemp}
                />
                <label htmlFor="floatingHighTemp">High Temp (°F)</label>
              </div>
            </div>
            <div className="col-3">
              <div className="form-floating mb-4">
                <input
                  id="floatingLowTemp"
                  name="lowTemp"
                  className="form-control"
                  // placeholder="Low Temperature"
                  onChange={handleChange}
                  value={formData.lowTemp}
                />
                <label htmlFor="floatingLowTemp">Low Temp (°F)</label>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Add Record</button>
        </form>
      </div>
    </div>
  );
}

export default AddRecordForm;