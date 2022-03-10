import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FishFileApi from "./Api";
import UsgsApi from "./UsgsApi";
import "./LocationCard.css";
import WeatherCodes from "./WeatherCodeObject";


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

  // useEffect(
  //   function getWeather() {
  //     async function getWeatherResponse() {
  //       const decLat = String(location.decLat);
  //       const decLong = String(location.decLong);
  //       const coords = { decLat, decLong };
  //       const weather = await FishFileApi.getWeather(location.id, location.username, coords);
  //       console.log("THIS IS THE WEATHER OBJECT IN REACT APP: ", weather);

  //       setCurrWeather(weather);
  //     }
  //     getWeatherResponse();
  //   },
  //   [location.id, location.username, location.decLat, location.decLong]
  // )
  
  return (
    // <div className="LocationCard col-lg-4">
    //   <Link to={`/users/${location.username}/locations/${location.id}`} className="nav-link">
    //     <div className="card">
    //       <div className="card-body">
    //         <h5 className="card-title">{location.name}</h5>
    //         <h6 className="card-subtitle mb-2 text-muted">{location.usgsId}</h6>
    //         <div className="row">
    //           <div className="col-12 col-sm-7">
    //             <ul className="list-group list-group-flush">
    //               { currFlow ?
    //               <li className="list-group-item">Flow: {currFlow} CFS</li>
    //               :
    //               null
    //               }
    //               <li className="list-group-item">Atmospheric Pressure: {currWeather.pressure} inches Hg</li>
    //               <li className="list-group-item">Wind: {currWeather.windSpeed} mph</li>
    //             </ul>
    //           </div>
    //           <div className="col-12 col-sm-5">
    //             <img className="weather-icon-img" src={`/tomorrowApiWeatherIcons/${currWeather.currWeatherCode}.png`} alt="Current Weather Icon"></img>
    //             <p>{WeatherCodes.currWeather.currWeatherCode</p>
    //             <div className="row">
    //               <div className="col-12 col-sm-6">
    //                 <p>{currWeather.currTemp}°</p>
    //               </div>
    //               <div className="col-12 col-sm-6">
    //                 <p>L: {currWeather.minTemp}°</p>
    //                 <p>H: {currWeather.maxTemp}°</p>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </Link>
    // </div>


    <div className="LocationCard col-lg-4">
      <Link to={`/locations/${location.id}`} className="nav-link">
        <div className="card location-card">
          <div className="titles-container card-header">
            <h5 className="card-title pt-2">{location.name}</h5>
            <p className="card-subtitle text-muted"><small>USGS ID: {location.usgsId}</small></p>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-7 mt-0 weather-left">
                <ul className="location-card-list-group list-group  list-group-flush">
                  {currFlow ?
                    <li className="list-group-item">
                      Flow: 
                      <span className="badge rounded-pill bg-light text-dark">{currFlow} CFS</span>
                    </li>
                    :
                    null
                  }
                  <li className="list-group-item">
                    Pressure:
                    <span className="badge rounded-pill bg-light text-dark">28.68 in Hg</span>
                  </li>
                  <li className="list-group-item">
                    Wind:
                    <span className="badge rounded-pill bg-light text-dark">8 mph</span>
                  </li>
                  <li className="list-group-item">
                    Precip. Chance:
                    <span className="badge rounded-pill bg-light text-dark">30%</span>
                  </li>
                  <li className="list-group-item">
                    Records:
                    <span className="badge rounded-pill bg-primary">{location.records.length}</span>
                  </li>
                </ul>
              </div>
              <div className="col-5 mt-3 text-center weather-right">
                <div>
                  <img className="weather-icon-img" src={`/tomorrowApiWeatherIcons/10010.png`} alt="Current Weather Icon"></img>
                  <p className="mt-2 mb-3"><small>{WeatherCodes["10010"]}</small></p>
                </div>
                <div className="row">
                  <div className="col-6 align-middle">
                    <h2>60°</h2>
                  </div>
                  <div className="col-6">
                    <h6>L: 49°</h6>
                    <h6>H: 60°</h6>
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