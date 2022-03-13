import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FishFileApi from "./Api";
import UsgsApi from "./UsgsApi";
import "./LocationCard.css";
import WeatherCodes from "./WeatherCodeObject";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWind, faUmbrella, faGaugeHigh, faWater } from '@fortawesome/free-solid-svg-icons'


function LocationCard({ location }) {
  const [ currFlow, setCurrFlow ] = useState();
  const [weather, setWeather] = useState({
    current: {},
    forecast: {}
  });

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
        const weatherResponse = await FishFileApi.getWeather(location.id, location.username, coords);
        console.log("THIS IS THE WEATHER OBJECT IN REACT APP: ", weatherResponse);

        setWeather(weatherResponse);
      }
      getWeatherResponse();
    },
    [location.id, location.username, location.decLat, location.decLong]
  )
  
  return (
    <div className="LocationCard col-xl-4 col-lg-6 col-md-12 col-sm-12 col-xs-12">
      <Link 
      to={`/locations/${location.id}`}
      state={{
        currLocation: location,
        weather,
        currFlow
      }} 
      className="nav-link">
        <div className="card location-card">
          <div className="location-titles-container">
            <h5 className="card-title pt-2">{location.name}</h5>
            <p className="card-subtitle text-muted"><small>USGS ID: {location.usgsId}</small></p>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-6 mt-0 weather-left">
                <ul className="location-card-list-group list-group  list-group-flush">
                  {currFlow ?
                    <li className="list-group-item">
                      <FontAwesomeIcon icon={faWater} /> 
                      <span className="badge rounded-pill bg-light text-dark">{currFlow} CFS</span>
                    </li>
                    :
                    null
                  }
                  <li className="list-group-item">
                    <FontAwesomeIcon icon={faGaugeHigh} />
                    <span className="badge rounded-pill bg-light text-dark">{weather.current.pressure} in Hg</span>
                  </li>
                  <li className="list-group-item">
                    <FontAwesomeIcon icon={faWind} />
                    <span className="badge rounded-pill bg-light text-dark">{weather.current.windSpeed} mph</span>
                  </li>
                  <li className="list-group-item">
                    <FontAwesomeIcon icon={faUmbrella} />
                    <span className="badge rounded-pill bg-light text-dark">{weather.current.precipChance}%</span>
                  </li>
                  <li className="list-group-item">
                    Records:
                    <span className="badge rounded-pill bg-primary">{location.records.length}</span>
                  </li>
                </ul>
              </div>
              <div className="col-6 mt-3 text-center weather-right">
                <div>
                  <img className="weather-icon-img" src={`/tomorrowApiWeatherIcons/${weather.current.currWeatherCode}.png`} alt="Current Weather Icon"></img>
                  <p className="mt-2 mb-3"><small>{WeatherCodes[weather.current.currWeatherCode]}</small></p>
                </div>
                <div className="row temps-container">
                  <div className="col-7 curr-temp-container">
                    <h1>{weather.current.currTemp}°</h1>
                  </div>
                  <div className="high-low-temps-container col-5">
                    <p className="high-temp"><small>H {weather.current.highTemp}°</small></p>
                    <p className="low-temp"><small>L {weather.current.lowTemp}°</small></p>
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