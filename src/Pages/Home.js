import React, { useEffect, useState } from "react";
import Navbar from "../Components/Commen/Navbar";
import AxiosInstance from "../Config/AxiosInstants";
import Cards from "../Components/Commen/Cards";
import { useNavigate } from "react-router-dom";
import './css/Home.css'

function Home() {
  const [courtData, setCourtData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getAllcourtsData();
  }, []);
  const getAllcourtsData = () => {
    AxiosInstance.get("/users/getAllcourtsData")
      .then((response) => {
        setCourtData(response.data);
      })
      .catch((err) => {
        if (err.response.data.message === "unauthorized user") {
          localStorage.clear();
          navigate("/");
        }
      });
  };
  return (
    < > 
      <Navbar />

      <div className="container home-bg">
        <div className="p-2 row gap-3 ">
          {courtData.map((court) => (
            <Cards court={court} />
          ))}
        </div>
      </div>
    
    </>
  );
}

export default Home;
