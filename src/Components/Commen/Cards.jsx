import React from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardSubTitle,
  MDBCardText,
  MDBCardImage,
  MDBRipple
} from 'mdb-react-ui-kit';
import { BASE_URL } from '../../Constants/Const';
import { useNavigate } from 'react-router-dom';
import './css/Cards.css'
export default function Cards({court}) {
  const navigate=useNavigate()
  return (
    <MDBCard style={{width:'19rem'}} className='col-12 col-md-3 col-lg-4 col-xl-2 col-xxl-1' onClick={()=>navigate(`/courtUserPage/${court._id}`)}  >
      <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
        <MDBCardImage src={`${BASE_URL}/courts/${court.courtPic}`} fluid alt='...' 
         style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto', padding:'5px' }} />
      </MDBRipple>
      <MDBCardBody className='court-card'>
        <MDBCardTitle>{court?.courtName}</MDBCardTitle>
        <MDBCardSubTitle>{court?.type}</MDBCardSubTitle>
        <MDBCardSubTitle>{court?.location}</MDBCardSubTitle>
       <MDBCardText>
        {court.about}
        </MDBCardText>
        <button className='btn btn-primary btn rounded-2'>Booking</button>
      </MDBCardBody>
    </MDBCard>
  );
}