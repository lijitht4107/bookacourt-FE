import {MDBInput,MDBIcon}from 'mdb-react-ui-kit';
import React, { useState } from 'react'
import AxiosInstance from '../Config/AxiosInstants';


function SighnupBox({ setBoxName }) {
  const handleLogin = () => {
    setBoxName("login");
  };

  const [signupData, setSignupData] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
    conPass: "",
  });

  const handleRegister = (e) => {
    e.preventDefault();
    AxiosInstance.post('/auth/signup', signupData)
      .then((res) => {
        if (res.data.message === "signup data successfull") {
          setBoxName("login");
        } else if (res.data.message === "email already exists") {
          alert("Email already exists");
        } else {
          alert("Unexpected response: " + res.data.message);
        }
      })
      .catch((error) => {
        console.error("There was an error with the signup request:", error.response || error.message || error);
        alert("There was an error with the signup request: " + (error.response ? error.response.data.message : error.message));
      });
  };

  return (
    <>
      <div className="d-flex flex-row align-items-center mb-4">
        <MDBIcon fas icon="user me-3" size='lg' />
        <MDBInput label='First Name' type='text' className='w-100' required value={signupData.fName}
          onChange={(e) => {
            setSignupData({ ...signupData, fName: e.target.value });
          }} />
      </div>

      <div className="d-flex flex-row align-items-center mb-4">
        <MDBIcon fas icon="user me-3" size='lg' />
        <MDBInput label='Last Name' type='text' className='w-100' required value={signupData.lName}
          onChange={(e) => {
            setSignupData({ ...signupData, lName: e.target.value });
          }} />
      </div>

      <div className="d-flex flex-row align-items-center mb-4">
        <MDBIcon fas icon="envelope me-3" size='lg' />
        <MDBInput label='Your Email' type='email' required value={signupData.email}
          onChange={(e) => {
            setSignupData({ ...signupData, email: e.target.value });
          }} />
      </div>

      <div className="d-flex flex-row align-items-center mb-4">
        <MDBIcon />
        <MDBInput label='Password' type='password' required value={signupData.password}
          onChange={(e) => {
            setSignupData({ ...signupData, password: e.target.value });
          }} />
      </div>

      <div className="d-flex flex-row align-items-center mb-4">
        <MDBIcon />
        <MDBInput label='Repeat your password' type='password' required value={signupData.conPass}
          onChange={(e) => {
            setSignupData({ ...signupData, conPass: e.target.value });
          }} />
      </div>

      <button className="mb-4 btn btn-primary" size="lg" onClick={handleRegister}>Signup</button>
      <p className="text-center mb-5 mx-1 mx-md-4 mt-4" onClick={handleLogin}>Login</p>
    </>
  );
}

export default SighnupBox;