import React, { useState, useEffect, useContext } from "react";
import UserContext from "./UserContext";
import LocationCard from "./LocationCard";
import "./LocationList.css";


/** LocationList: List of locations that returns locationCards.
 *  List could include favorite locations or all locations.
 * 
 *  Props: onlyShowFavorites
 *  Context: currentUser, getAllLocations
 *  State: locationList
 */

function LocationList({ onlyShowFavorites }) {
  const { currentUser, getAllLocations } = useContext(UserContext);
  const [locationList, setLocationList] = useState([]);

  useEffect(
    function getLocations() {
      async function getLocationsResponse() {
        const locations = await getAllLocations(
          currentUser.username, onlyShowFavorites);
        console.log("LOCATION LIST *********** LOCATIONS HERE:", locations);

        setLocationList(locations);
      }
      getLocationsResponse();
    },
    [currentUser.username, getAllLocations, onlyShowFavorites]
  )

  return (
    <div className="LocationList">
      {locationList.map((location, index) => (
        <LocationCard key={location.id} location={location} position={index} />
      ))}
    </div>
  )
}

export default LocationList;