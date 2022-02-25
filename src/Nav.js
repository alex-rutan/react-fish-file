import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
// import "./Nav.css";
import UserContext from "./UserContext";


/** Nav: navbar for each page
 *  
 *  State: logout, currentUser
 */

function Nav() {
  const { logout, currentUser } = useContext(UserContext);

  return (
    <div className="Nav">
      {currentUser 
        ?
        <nav className="navbar navbar-expand">
          <div className="container-fluid">
            <NavLink to="/" className="navbar-brand">
              FishFile
            </NavLink>
            <div className="navbar-nav me-auto">
              <div className="nav-item">
                <NavLink to="/locations/new" className="nav-link">
                  Add Location
                </NavLink>
              </div>
              <div className="nav-item">
                <NavLink to="/records/new" className="nav-link">
                  Add Record
                </NavLink>
              </div>
              <div className="nav-item">
                <NavLink to="/locations" className="nav-link">
                  My Locations
                </NavLink>
              </div>
              <div className="nav-item">
                <NavLink to="/records" className="nav-link">
                  My Records
                </NavLink>
              </div>
            </div>
            <div className="navbar-right">
              <NavLink to="/" className="nav-link" onClick={logout}>
                Log Out {currentUser.firstName}
              </NavLink>
            </div>
          </div>
        </nav>
        :
        <nav className="navbar navbar-expand">
          <div className="container-fluid">
            <NavLink to="/" className="navbar-brand">
              FishFile
            </NavLink>
            <div className="navbar-right d-flex">
              <div className="nav-item">
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>
              </div>
              <div className="nav-item">
                <NavLink to="/signup" className="nav-link">
                  Sign Up
                </NavLink>
              </div>
            </div>
          </div>
        </nav>
      }
    </div>
  );
}


export default Nav;