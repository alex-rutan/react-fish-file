import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import UserContext from "./UserContext";
import WeatherCodes from "./WeatherCodeObject";
import RecordCard from "./RecordCard";
import getDayOfTheWeek from "./helpers/getDay";
import "./LocationDetails.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWind, faUmbrella, faGaugeHigh, faWater } from '@fortawesome/free-solid-svg-icons'


function LocationDetails() {
  const { currentUser, getLocationRecords } = useContext(UserContext);
  const [ locationRecords, setLocationRecords ] = useState([]);
  const location = useLocation();
  const { currLocation, weather, currFlow } = location.state;

  useEffect(
    function getAllLocationRecords() {
      async function getAllLocationRecordsResponse() {
        const records = await getLocationRecords(currLocation.id, currentUser.username);
        setLocationRecords(records);
      }
      getAllLocationRecordsResponse();
    },
    [currentUser.username, currLocation.id, getLocationRecords]
  )


  return (
    <div className="LocationDetails">
      <div className="location-details-titles-container">
        <h3 className="location-details-title">{currLocation.name}</h3>
        <h6 className="location-details-subtitle">USGS ID: {currLocation.usgsId}</h6>
      </div>

      <div className="cards-container">

        <div className="curr-weather-column col-3">
          <div className="card current-weather-card">
            <div className="weather-titles-container">
              <h5 className="card-title pt-2">Current Conditions</h5>
            </div>
            <div className="card-body">
              <div className="mt-3 text-center weather-top">
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
              <div className="mt-0 weather-bottom">
                <ul className="location-details-list-group list-group  list-group-flush">
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
                </ul>
              </div>
            </div>
          </div>
        </div> 

        <div className="flow-column col-7">
          <div className="card flow-card">
            <div className="flow-titles-container">
              <h5 className="card-title pt-2">8-Day Flow Chart</h5>
            </div>
            <div className="card-body flow-card-body">
              <img src={`http://waterdata.usgs.gov/nwisweb/graph?site_no=${currLocation.usgsId}&parm_cd=00060`} alt={`USGS Water-data graph for site ${currLocation.usgsId}`} />
            </div>
          </div>
        </div>

        <div className="forecast-weather-column col-10">
          <div className="card forecast-weather-card">
            <div className="weather-titles-container">
              <h5 className="card-title pt-2">Weather Forecast</h5>
            </div>

            <div className="card-body">
              <ul className="location-card-list-group list-group  list-group-flush">
                {weather.forecast.map(day => (
                  <li key={day.date} className="list-group-item">
                    <div className="day-info text-center">
                      <div className="day-of-week">
                        {getDayOfTheWeek(day.date)}
                      </div>
                      <div className="day-of-month">
                        <strong>{day.date.slice(8, 10)}</strong>
                      </div>
                    </div>
                    <span>
                      <img className="weather-icon-img" src={`/tomorrowApiWeatherIcons/${day.allDayWeatherCode}small.png`} alt="Weather Icon"></img>
                    </span>
                    <span>
                      <div className="temp-gradient-container">
                        <small>{day.lowTemp}</small>
                        <div className="temp-gradient-bar" style={{ width: `${(day.highTemp - day.lowTemp) * 4}px`, height: "5px" }}></div>
                        <small>{day.highTemp}</small>
                      </div>
                    </span>
                    <span>
                      <FontAwesomeIcon icon={faUmbrella} className="pe-3" />
                      <small>{day.precipChance}%</small>
                    </span>
                    <span>
                      <FontAwesomeIcon icon={faGaugeHigh} className="pe-3" />
                      <small>{day.pressure}</small>
                    </span>
                    <span>
                      <FontAwesomeIcon icon={faWind} className="pe-3" />
                      <small>{day.windSpeed}mph</small>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>

      <div className="location-records-container">
        {
        currLocation.records.length
        ?
        <div>
          <div className="location-details-titles-container">
            <h4 className="location-details-title">Records</h4>
          </div>
          <div className="location-record-cards-container">
            {locationRecords.map(record => (
              <RecordCard key={record.id} record={record} />
            ))}
          </div>
        </div>
        :
        null
        }      
      </div>        
      
    </div>
  )
}

export default LocationDetails;