import React, { useState, useEffect, useContext } from "react";
import UserContext from "./UserContext";
import { Link } from "react-router-dom";
import "./RecordCard.css";


function RecordCard({ record }) {
  const { currentUser, getLocation } = useContext(UserContext);
  const [ location, setLocation ] = useState({});

  useEffect(
    function getRecordLocation() {
      async function getRecordLocationResponse() {
        const recordLocation = await getLocation(record.locationId, currentUser.username);
        setLocation(recordLocation);
      }
      getRecordLocationResponse();
    },
    [record.locationId, currentUser.username, getLocation]
  )
  
  /** Reformats date from yyyy-mm-dd to mm/dd/yyyy */
  function reformatDate(date) {
    date = date.slice(0, 10);
    const dateParts = date.split("-");

    return `${dateParts[1]}/${dateParts[2]}/${dateParts[0]}`
  }

  return (
    <div className="RecordCard col-lg-6">
      <Link to={`/users/${record.username}/records/${record.id}`} className="nav-link">
        <div className="card record-card">
          <div className="record-titles-container card-header">
            <h5 className="card-title pt-2 record-location-name">{location.name}</h5>
            <h5 className="card-title pt-2 record-date">{reformatDate(record.date)}</h5>
          </div>
          <div className="card-body">
            <div className="row mb-4">
              <div className="col-6 text-center">
                <ul className="record-card-list-group list-group  list-group-flush">
                  {record.weather
                    ?
                    <li className="list-group-item">
                      Weather:
                      <span className="badge rounded-pill bg-light text-dark">{record.weather}</span>
                    </li>
                    :
                    null
                  }
                  {record.highTemp
                    ?
                    <li className="list-group-item">
                      High Temp:
                      <span className="badge rounded-pill bg-light text-dark">{record.highTemp}°</span>
                    </li>
                    :
                    null
                  }
                  {record.lowTemp
                    ?
                    <li className="list-group-item">
                      Low Temp:
                      <span className="badge rounded-pill bg-light text-dark">{record.lowTemp}°</span>
                    </li>
                    :
                    null
                  }
                </ul>
              </div>
              <div className="col-6">
                <ul className="record-card-list-group list-group  list-group-flush">
                  {record.flow
                    ?
                    <li className="list-group-item">
                      Flow:
                      <span className="badge rounded-pill bg-light text-dark">{record.flow} CFS</span>
                    </li>
                    :
                    null
                  }
                  {record.pressure
                    ?
                    <li className="list-group-item">
                      Pressure:
                      <span className="badge rounded-pill bg-light text-dark">{record.pressure} in Hg</span>
                    </li>
                    :
                    null
                  }
                  {record.waterTemp
                    ?
                    <li className="list-group-item">
                      Water Temp:
                      <span className="badge rounded-pill bg-light text-dark">{record.waterTemp}°</span>
                    </li>
                    :
                    null
                  }
                </ul>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-3 text-center">
                <h3><span className="badge" id={`rating-badge-${record.rating}`}>{record.rating}</span></h3>
              </div>
              <div className="col-9">

              </div>
            </div>
            <p className="card-text record-description m-2">
              {record.description}
            </p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default RecordCard;