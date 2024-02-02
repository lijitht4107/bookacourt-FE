// import React, { useState } from "react";
import './css/Navbar.css'
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  // MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import AxiosInstance from "../../Config/AxiosInstants";

function Navbar() {
  const { userDetails } = useSelector((state) => state.user);
  // const [serarchResult,setSearchResult] =useState([]);
  // const SearchArea = ()=>{
  //   AxiosInstance.post('/user/search',{serarchResult}).then((res)=>{
  //     debugger
  //   }).catch(alert("empty") )
  // }
  const navigate = useNavigate();
  const doLogout =()=>{
    localStorage.clear()
    navigate('/')

  }

  return (
    <div>
      <MDBNavbar expand="lg" className="bg bg-warning nav-area">
        <MDBContainer fluid>
          <MDBNavbarBrand className="btn btn-outline-primary" href="/home">
            bookA
          </MDBNavbarBrand>

          <MDBNavbarToggler
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>

          <MDBCollapse navbar>
            <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
              <MDBNavbarItem>
                <MDBNavbarLink
                  className="nav"
                  active
                  aria-current="page"
                  href="/home"
                >
                  Home
                </MDBNavbarLink>
              </MDBNavbarItem>
              {userDetails.role === 1 && (
                <MDBNavbarItem>
                  <MDBNavbarLink
                    className="nav"
                    active
                    aria-current="page"
                    href="/addNewcourt"
                  >
                    Add Court
                  </MDBNavbarLink>
                </MDBNavbarItem>
              )}

              <MDBNavbarItem>
                <MDBDropdown>
                  <MDBDropdownToggle
                    className="nav nav-link"
                    tag="a"
                    role="button"
                  >
                    Dropdown
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem link className="nav">
                      Action
                    </MDBDropdownItem>
                    <MDBDropdownItem link className="nav">
                      Another action
                    </MDBDropdownItem>
                    <MDBDropdownItem link className="nav">
                      Something else here
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavbarItem>

              <MDBNavbarItem>
                <MDBNavbarLink href="/Mybookings">My bookings</MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>

            {/* <div className="d-flex input-group w-auto">
              <input
                type="search"
                className="form-control"
                placeholder="Type query"
                aria-label="Search"
                value={serarchResult}
                onChange={(e)=>setSearchResult(e.target.value)}
              />
              <MDBBtn color="primary" onClick={SearchArea}>Search</MDBBtn>
            </div> */}

            <div className="">
              
              <MDBDropdown>
                <MDBDropdownToggle
                  className="nav nav-link  rounded "
                  tag="a"
                  role="button"
                >
                  profile : {userDetails.fname}
                  {userDetails.lname}
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem link className="nav" href="/Mybookings">
                    My Bookings
                  </MDBDropdownItem>
                  <MDBDropdownItem link className="nav">
                    Another action
                  </MDBDropdownItem>
                  <MDBDropdownItem link onClick={doLogout}>
                    Logout
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </div>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </div>
  );
}

export default Navbar;
