import React, { useState } from "react";
import {

  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,

}
from 'mdb-react-ui-kit';
import "./Login.css";
import LoginBox from "../Components/LoginBox";
import SighnupBox from "../Components/SighnupBox";

function Login() {
  const [boxName, setBoxName] = useState("login");
  return (
    <>



<MDBContainer fluid>

<MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
  <MDBCardBody>
    <MDBRow>
      <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

        <div className="login-signup">
              {boxName === "login" && <LoginBox setBoxName={setBoxName} />}
              {boxName === "signup" && <SighnupBox setBoxName={setBoxName} />}
            </div>

      </MDBCol>
      

      <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
        <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid/>
      </MDBCol>

    </MDBRow>
  </MDBCardBody>
</MDBCard>

</MDBContainer>

    </>
  );
}

export default Login;
