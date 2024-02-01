import './Commen/css/BookedSlots.css'
import { BASE_URL } from '../Constants/Const'

function BookedSlots({bookingData}) {
  
    
  return (
    <>
    <div className='container booked-slots'>
      <div className='d-flex '>
      <img src={`${BASE_URL}/courts/${bookingData.courtData?.courtPic}`} className='slots-image '></img>
      <div className='slot-details'>
        <h2 className=' mx-5'>{bookingData?.courtData?.courtName}</h2>
      <h6 className=' mx-5'>{bookingData?.courtData?.location}</h6>
      <p className=' mx-5'>{bookingData?.courtData?.address}</p>
      <p className=' mx-5'>{bookingData?.date.slice(0,10)}</p>
      <p className=' mx-5'>{bookingData?.slot?.name}</p>
      <p className=' mx-5'>{bookingData?.courtData?.description}</p>
      <p className=' mx-5'>{bookingData?.courtData?.about}</p>
      </div>
      
      
      </div>
      
    </div>
    </>
  )
}

export default BookedSlots
