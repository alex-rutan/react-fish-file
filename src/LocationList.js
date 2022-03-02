import React, { useState, useEffect, useContext } from "react";
import UserContext from "./UserContext";
import FishFileApi from "./Api";
import LocationCard from "./LocationCard";
import "./LocationList.css";

function LocationList() {
  const { currentUser } = useContext(UserContext);
  const [ locationList, setLocationList ] = useState([]);

  useEffect(
    function getLocations() {
      async function getLocationsResponse() {
        const locations = await FishFileApi.getAllLocations(currentUser.username);
        setLocationList(locations);
      }
      getLocationsResponse();
    },
    [currentUser.username]
  )

  return (
    <div className="LocationList">
      {locationList.map(location => (
        <LocationCard key={location.id} location={location} />
      ))}
    </div>
  )
}

export default LocationList;