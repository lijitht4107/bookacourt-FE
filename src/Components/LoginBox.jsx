import { MDBInput, MDBIcon } from "mdb-react-ui-kit";
import AxiosInstance from "../Config/AxiosInstants";
import React, { useState } from "react";
import { toastError, toastSuccess } from "../Constants/Plugins";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../Toolkit/UserSlice";

function LoginBox({ setBoxName }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignUp = () => {
    setBoxName("signup");
  };

  const handleLogin = async () => {
    if (!email || !password) {
      toastError("Please fill in both fields");
      return;
    }

    try {
      const response = await AxiosInstance.post("/auth/login", { email, password });
      const { message, token } = response.data;

      if (message === "login successfull" && token) {
        localStorage.setItem("token", token);
        const parsedToken = parseJwt(token);
        localStorage.setItem("user", JSON.stringify(parsedToken));
        dispatch(setUserDetails(parsedToken));
        toastSuccess("Login successful");
        navigate("/home");
      } else {
        toastError("Login failed");
      }
    } catch (error) {
      if (error.code === 'ERR_NETWORK') {
        toastError("Network error: Unable to reach the backend service");
      } else {
        toastError("An error occurred during login");
      }
      console.error(error);
    }
  };

  // parseJwt function for decoding backend user token details
  function parseJwt(token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
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
  );
}

export default LoginBox;
