import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FishFileApi from "./Api";
import UsgsApi from "./UsgsApi";
import "./LocationCard.css";


function LocationCard({ location }) {
  const [ currFlow, setCurrFlow ] = useState();
  const [ currWeather, setCurrWeather ] = useState({});

  useEffect(
    function getCurrFlow() {
      async function getCurrFlowResponse() {
        if (location.usgsId) {
          const flow = await UsgsApi.getCurrentFlow(location.usgsId);

          setCurrFlow(flow);
        }
      }
      getCurrFlowResponse();
    },
    [location.usgsId]
  )

  useEffect(
    function getWeather() {
      async function getWeatherResponse() {
        const decLat = String(location.decLat);
        const decLong = String(location.decLong);
        const coords = { decLat, decLong };
        const weather = await FishFileApi.getWeather(location.id, location.username, coords);
        console.log("THIS IS THE WEATHER OBJECT IN REACT APP:", weather)

        setCurrWeather(weather);
      }
      getWeatherResponse();
    },
    [location.id, location.username, location.decLat, location.decLong]
  )
  
  return (
    <div className="LocationCard col-lg-4">
      <Link to={`/users/${location.username}/locations/${location.id}`} className="nav-link">
        <div className="card">
          {/* <img className="card-img-top" src="..." alt="Card image cap"> */}
          <div className="card-body">
            <h5 className="card-title">{location.name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{location.usgsId}</h6>
            <div className="row">
              <div className="col-12 col-sm-7">
                <ul className="list-group list-group-flush">
                  { currFlow ? 
                  <li className="list-group-item">Flow: {currFlow} CFS</li>
                  :
                  null
                  }
                  <li className="list-group-item">Atmospheric Pressure: {currWeather.pressure}</li>
                </ul>
              </div>
              <div className="col-12 col-sm-5">
                <p>THIS IS WHERE WEATHER ICON IS</p>
                <div className="row">
                  <div className="col-12 col-sm-6">
                    <p>{currWeather.currTemp}</p>
                  </div>
                  <div className="col-12 col-sm-6">
                    <p>L: {currWeather.minTemp}</p> 
                    <p>H: {currWeather.maxTemp}</p>                  
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default LocationCard;