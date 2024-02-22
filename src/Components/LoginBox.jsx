import { MDBInput, MDBIcon } from "mdb-react-ui-kit";
import AxiosInstance from "../Config/AxiosInstants";
import React, { useState } from "react";

import { toastError, toastSuccess } from "../Constants/Plugins";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserDetails} from "../Toolkit/UserSlice";


function LoginBox({ setBoxName }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const dispatch=useDispatch()

  const handleSignUp = () => {
    setBoxName("signup");
  };
const handleLogin =()=>{
  try {
  if(email&&password){
    AxiosInstance.post('/auth/login',{email,password} ).then((res)=>{
        if(res.data.message==="login successfull"&&res.data.token){
          localStorage.setItem("token",res.data.token)
          const parsedToken=parseJwt(res.data.token)
          localStorage.setItem("user",JSON.stringify(parsedToken))
          //dispatch(setUserDetails(parsedToken))
          dispatch(setUserDetails(parsedToken))
          toastSuccess('login successfull')
          navigate("/home")
        }
     })

    }else{
      toastError('login faild')
    }
  } catch (error) {
    toastError('user not found')
    console.log(error)
  }
}


  // parseJwt function for decoding backend user token details
  function parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }
  return (
    <>
     <div className="d-flex flex-row align-items-center mb-4 pt-5">
        <MDBIcon />
        <MDBInput
          label="Your Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="d-flex flex-row align-items-center mb-4">
        <MDBIcon />
        <MDBInput
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button className="mb-4 btn btn-primary" size="lg" onClick={handleLogin}>
        Login
      </button>
      <p className="text-center mb-5 mx-1 mx-md-4 mt-4" onClick={handleSignUp}>
        Sign up:
      </p>
   
    
    </>
  )
}

export default LoginBox
