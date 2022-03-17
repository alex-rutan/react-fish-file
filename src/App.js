import UserContext from './UserContext';
import AppRoutes from './Routes';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import FishFileApi from './Api';
import jwt from 'jsonwebtoken';
import UsgsApi from './UsgsApi';
import NavBar from './Nav';
import { setWithExpiration } from "./expirationLocalStorage";
import 'bootstrap/dist/css/bootstrap.css';


function App() {
  const [ currentUser, setCurrentUser ] = useState();
  const [ token, setToken ] = useState(
    localStorage.getItem("fishfile-token") || null
  );
  const [ isLoading, setIsloading ] = useState(false);
  const navigate = useNavigate();

  /** Sets a token in local storage for use throughout the app */
  useEffect(
    function setLocalStorageToken() {
      if (token === null) {
        localStorage.removeItem("fishfile-token");
      } else {
        localStorage.setItem("fishfile-token", token);
      }
    },
    [token]
  );

  /** Updates currentuser if valid token */
  useEffect(
    function getCurrUser() {
      async function getCurrUserResponse() {
        if (token !== null) {
          FishFileApi.token = token;
          const { username } = jwt.decode(token);
          let user = await FishFileApi.getUserInfo(username);
          setCurrentUser(user);
        }
        setIsloading(true);
      }
      getCurrUserResponse();
    },
    [token]
  );

  async function login(loginUserInfo) {
    const response = await FishFileApi.login(loginUserInfo);
    console.log("INSIDE APP AT LOGIN", response)
    setToken(response);
    navigate('/');
  }

  async function signup(userInfo) {
    const newToken = await FishFileApi.register(userInfo);

    if (newToken) {
      setToken(newToken);
      navigate('/');
    }
  }

  function logout() {
    setCurrentUser(null);
    setToken(null);
    localStorage.removeItem("fishfile-token");
  }

  async function updateProfile(profileInfo) {
    const user = await FishFileApi.updateProfile(profileInfo);
    setCurrentUser(user);
  }

  async function getLocation(id, username) {
    const location = await FishFileApi.getLocation(id, username);
    return location;
  }

  async function getLocationRecords(id, username) {
    const records = await FishFileApi.getLocationRecords(id, username);
    return records;
  }

  async function getLocationWeather(locationId, username, coordinates) {
    const weather = await FishFileApi.getLocationWeather(locationId, username, coordinates);
    console.log("THIS IS THE WEATHER OBJECT IN REACT APP: ", weather);

    // sets a location's weather into localStorage with a 30 minute expiration
    setWithExpiration(`location-${locationId}-weather`, weather, 1800000);

    return weather;
  }

  async function getAllLocations(username, onlyShowFavorites) {
    onlyShowFavorites = { onlyShowFavorites };
    const locations = await FishFileApi.getAllLocations(username, onlyShowFavorites);
    return locations;
  }
  
  async function addLocation(locationData) {
    const usgsId = locationData.usgsId;
    const { decLat, decLong } = await UsgsApi.getLocationLatAndLong(usgsId);

    locationData.decLat = decLat;
    locationData.decLong = decLong;
    
    console.log("LOCATION DATA************: ", locationData);
    await FishFileApi.addLocation(locationData, currentUser.username);
  }

  async function getAllRecords(username) {
    const records = await FishFileApi.getAllRecords(username);
    return records;
  }

  async function addRecord(recordData) {
    console.log("HERES THE DATE: ", recordData.date);

    // find location to access usgsId property
    const location = await FishFileApi.getLocation(recordData.locationId, currentUser.username);

    // if there is a usgs Id for the location, get past flow on the given date, with the string version of the location Id
    if (location.usgsId) {
      const pastFlow = await UsgsApi.getPastFlow(location.usgsId, recordData.date);
      recordData.flow = Number(pastFlow);
    } else {
      recordData.flow = null;
    }

    // change string values to numbers for back-end db validation & storage
    recordData.locationId = Number(recordData.locationId);
    recordData.rating = Number(recordData.rating);
    recordData.waterTemp = Number(recordData.waterTemp);
    recordData.pressure = Number(recordData.pressure);
    recordData.highTemp = Number(recordData.highTemp);
    recordData.lowTemp = Number(recordData.lowTemp);

    console.log("RECORD DATA************: ", recordData);
    await FishFileApi.addRecord(recordData, currentUser.username);
  }

  // TODO: make loading spinner component
  if (!isLoading) return <p>Fetching User</p>;

  return (
    <UserContext.Provider
      value={{
        currentUser,
        login,
        signup,
        logout,
        updateProfile,
        addLocation,
        getLocation,
        getLocationRecords,
        getLocationWeather,
        getAllLocations,
        addRecord,
        getAllRecords
      }}>
      <div className="App">
        <NavBar />
        <AppRoutes />
      </div>
    </UserContext.Provider>
  );
}

export default App;
