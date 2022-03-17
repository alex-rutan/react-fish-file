import LocationList from "./LocationList";
import React, { useContext } from "react";
import UserContext from "./UserContext";
import "./HomePage.css";
import RecordList from "./RecordList";

function HomePage() {
  const { currentUser } = useContext(UserContext);

  return (
    currentUser
    ?
    <div className="HomePage home-page-1">
      <div>
        <LocationList onlyShowFavorites={true} />        
      </div>
      <div>
        <div className="home-page-titles-container">
          <h4 className="home-page-title">My Records</h4>
        </div>
        <RecordList />
      </div>
    </div>
    :
    <div className="HomePage home-page-2 text-center">
      <div className="card home-page-card">
        <div className="home-page-titles-container">
          <h5 className="card-title pt-2">Welcome to FishFile</h5>
        </div>
        <div className="card-body">
          <p>Log in or sign up above to build your own flow and weather monitoring interface and fishing history.</p>
        </div>
      </div>
    </div>
  )
}

export default HomePage;