import UserContext from './UserContext';
import AppRoutes from './Routes';
import Nav from './Nav';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import FishFileApi from './Api';
import jwt from 'jsonwebtoken';
import UsgsApi from './UsgsApi';


function App() {
  const [ currentUser, setCurrentUser ] = useState();
  const [ token, setToken ] = useState(
    localStorage.getItem("fishfile-token") || null
  );
  const [ isLoading, setIsloading ] = useState(false);
  const navigate = useNavigate();

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

  /**updates currentuser if valid token */
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
  
  async function addLocation(locationData) {
    const usgsId = locationData.usgsId;
    const { decLat, decLong } = await UsgsApi.getLocationLatAndLong(usgsId);

    locationData.decLat = decLat;
    locationData.decLong = decLong;
    
    console.log("LOCATION DATA************: ", locationData);
    const location = await FishFileApi.addLocation(locationData, currentUser.username);
  }

  async function getAllLocations(username) {
    const locations = await FishFileApi.getAllLocations(username);
    return locations;
  }

  async function addRecord(recordData) {
    const location = await FishFileApi.getLocation(recordData.locationId);
    const usgsId = location.usgsId;

    const pastFlow = await UsgsApi.getPastFlow(usgsId, recordData.date);
    recordData.flow = pastFlow;

    console.log("RECORD DATA************: ", recordData);
    const record = await FishFileApi.addRecord(recordData, currentUser.username);
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
        getAllLocations,
        addRecord
      }}>
      <div className="App">
        <Nav />
        <AppRoutes />
      </div>
    </UserContext.Provider>
  );
}

export default App;
