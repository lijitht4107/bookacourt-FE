import React, { useEffect, useState } from 'react'
import BookedSlots from '../Components/BookedSlots'
import Navbar from '../Components/Commen/Navbar'
import AxiosInstance from '../Config/AxiosInstants'

function Mybookings() {
  const [bookings, setBookings] = useState([])
  useEffect(()=>{
    getMyBookingsData()
},[])
const getMyBookingsData = () => {
    AxiosInstance.get('/users/getMyBookingsData').then((res)=>{
       
        setBookings(res.data)
    }).catch((err)=>{
        console.log(err);
    })
}
  return (
    <div>
      <Navbar/>
      {bookings.map((booking)=><BookedSlots key={booking.id} bookingData={booking} />)}
    </div>
  )
}

export default Mybookings
