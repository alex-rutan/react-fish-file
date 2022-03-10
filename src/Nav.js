import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
import "./Nav.css";
import UserContext from "./UserContext";
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

/** Nav: navbar for each page
 *  
 *  Context: logout, currentUser
 */

function NavBar() {
  const { logout, currentUser } = useContext(UserContext);

  return (
    <div className="Nav">
      {currentUser 
        ?
        <Navbar variant="light" bg="light" expand="md">
            <Navbar.Brand href="/">
            <img className="me-3" src={'trout.png'} alt="trout logo"></img>
              FishFile
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                <NavDropdown className="ms-3" title="Locations" id="basic-nav-dropdown">
                <NavDropdown.Item as={NavLink} end to="/locations">My Locations</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} end to="/locations/new">Add Location</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown className="ms-3" title="Records" id="basic-nav-dropdown">
                <NavDropdown.Item as={NavLink} end to="/records">My Records</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} end to="/records/new">Add Record</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav>
                <Nav.Link className="navbar-right" href="/" onClick={logout}>Log Out {currentUser.firstName}</Nav.Link>
              </Nav>
            </Navbar.Collapse>
        </Navbar>

        // <nav className="navbar navbar-expand">
        //   <div className="container-fluid">
        //     <div className="nav-title">
        //       <NavLink to="/" className="navbar-brand">
        //         FishFile
        //       </NavLink>
        //     </div> 
        //     <div className="navbar-nav me-auto">
        //       <div className="nav-item">
        //         <NavLink to="/locations/new" className="nav-link">
        //           Add Location
        //         </NavLink>
        //       </div>
        //       <div className="nav-item">
        //         <NavLink to="/records/new" className="nav-link">
        //           Add Record
        //         </NavLink>
        //       </div>
        //       <div className="nav-item">
        //         <NavLink to="/locations" className="nav-link">
        //           My Locations
        //         </NavLink>
        //       </div>
        //       <div className="nav-item">
        //         <NavLink to="/records" className="nav-link">
        //           My Records
        //         </NavLink>
        //       </div>
        //     </div>
        //     <div className="navbar-right">
        //       <NavLink to="/" className="nav-link" onClick={logout}>
        //         Log Out {currentUser.firstName}
        //       </NavLink>
        //     </div>
        //   </div>
        // </nav>
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


export default NavBar;