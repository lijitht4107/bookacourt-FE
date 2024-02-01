import {MDBInput,MDBIcon}from 'mdb-react-ui-kit';
import React, { useState } from 'react'
import axios from 'axios';
import { BASE_URL } from '../Constants/Const';



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
      try {
        e.preventDefault();
        axios.post(`${BASE_URL}/auth/signup`, signupData).then((res) => {
          if (res.data.message === "signup data successfull") {
            setBoxName("login");
          }
  
          if (res.data.message === "email already exist") {
            alert("email already exist");
           }
        })
      } catch (error) {
        console.log(error)
      }
    };
  return (
    <>
    <div className="d-flex flex-row align-items-center mb-4 ">
          <MDBIcon fas icon="user me-3" size='lg'/>
          <MDBInput label='first Name'  type='text' className='w-100' required  value={signupData.fName}
                      onChange={(e) => {
                        setSignupData({ ...signupData, fName: e.target.value });
                      }}/>
        </div>

        <div className="d-flex flex-row align-items-center mb-4 ">
          <MDBIcon fas icon="user me-3" size='lg'/>
          <MDBInput label='Last Name'  type='text' className='w-100' required  onChange={(e) => {
                        setSignupData({ ...signupData, lName: e.target.value });
                      }}/>
        </div>

        <div className="d-flex flex-row align-items-center mb-4">
          <MDBIcon fas icon="envelope me-3" size='lg'/>
          <MDBInput label='Your Email'  type='email' required  onChange={(e) => {
                    setSignupData({ ...signupData, email: e.target.value });
                  }}/>
        </div>

        <div className="d-flex flex-row align-items-center mb-4">
          <MDBIcon/>
          <MDBInput label='Password' id='form3' type='password' required onChange={(e) => {
                    setSignupData({ ...signupData, password: e.target.value });
                  }}/>
        </div>

        <div className="d-flex flex-row align-items-center mb-4">
          <MDBIcon />
          <MDBInput label='Repeat your password' id='form4' type='password' required onChange={(e) => {
                    setSignupData({ ...signupData, conPass: e.target.value });
                  }}/>
        </div>

      
        <button className="mb-4 btn btn-primary" size="lg" onClick={handleRegister}>Signup</button>
        <p className="text-center mb-5 mx-1 mx-md-4 mt-4" onClick={handleLogin}>Login</p>



    </>
  )
}

export default SighnupBox
