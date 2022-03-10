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
        :
        <Navbar variant="light" bg="light" expand="sm">
            <Navbar.Brand href="/">
            <img className="me-3" src={'trout.png'} alt="trout logo"></img>
              FishFile
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
              </Nav>
              <Nav>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/signup">Sign Up</Nav.Link>
              </Nav>
            </Navbar.Collapse>
        </Navbar>
      }
    </div>
  );
}


export default NavBar;