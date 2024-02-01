import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardText,
  MDBCardOverlay,
  MDBCardImage,
} from "mdb-react-ui-kit";
import "./css/courtUserViewPage.css";
import { useNavigate, useParams } from "react-router-dom";
import AxiosInstance from "../../Config/AxiosInstants";
import { BASE_URL, TIMINGS } from "../../Constants/Const";
import Modal from "../Modal";
import { toastSuccess } from "../../Constants/Plugins";
import { ModalArea } from "../../Constants/modalView";
import { useSelector } from "react-redux";
import EditCourtDetails from "./EditCourtDetails";

export default function CourtBook() {
  const { id } = useParams();
  const [singleCourtData, setSingleCourtData] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [timeSlotData, setTimeSlotData] = useState({
    startDate: "",
    endDate: "",
    cost: "",
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedTimings, setSelectedTimings] = useState([]);
  const [filterTimings, setFilterTimings] = useState(TIMINGS);
  const [slotData, setSlotData] = useState([]);
  const [inputDate, setInputDate] = useState();
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedSlot, setSlectedSlot] = useState(null)
  const { userDetails } = useSelector(state => state.user);
  const [editCourtModal, setEditCourtModal] = useState(false)
  const [editedCourtData, setEditedCourtData] = useState({})
  const navigate = useNavigate()
  
  useEffect(() => {
    getSinglecourtData();
    getTimeSlotData(new Date());
  }, []);

  const getSinglecourtData = () => {
    AxiosInstance.get("/users/getSinglecourtData", { params: { courtId: id } })
      .then((res) => {
        setSingleCourtData(res.data);
        setEditedCourtData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getTimeSlotData = (date = new Date()) => {
    AxiosInstance.get("/users/dayWiseTimeSlot",  {
      params: { courtId: id, Date: date },
    })
      .then((res) => {
        setSlotData(res.data);
        toastSuccess("select your times");
      })
      .catch((err) => {
        console.log(err);
        debugger;
      });
  };
  
  const today = new Date().toString().slice(0,10)
  const tomorrow = (new Date().getDate()+1)+"-"+(new Date().getMonth()+1)+"-"+new Date().getFullYear();
  
  function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}
  const initiateBooking = async () =>{
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
  );

  if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
  }

  // creating a new order
  const result = await AxiosInstance.post("/payment/orders",{slotId:selectedSlot._id});

  if (!result) {
      alert("Server error. Are you online?");
      return;
  }

  // Getting the order details back
  const { amount, id: order_id, currency } = result.data;

  const options = {
      key: "rzp_test_YG9n5AzJN5tH9y", // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "court Corp.",
      description: "Court booking",
      order_id: order_id,
      handler: async function (response) {
          const data = {
              orderCreationId: order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
              slotId:selectedSlot._id
          };

          const result = await AxiosInstance.post("/payment/success", data);
          alert(result.data.msg);
          setBookingOpen(false)
          getTimeSlotData(new Date(inputDate))
      },
      prefill: {
          name: "ShaLiea",
          email: "shaLiea@gmail.com",
          contact: "9999999999",
      },
      notes: {
          address: "ShaLiea Couporate Office",
      },
      theme: {
          color: "#61dafb",
      },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
  }
  
  const HandleEditCourtDetails = () => {
    setEditCourtModal(true)
  }
  const handleEditedCortData = (e) => {
    setEditedCourtData({...editedCourtData,[e.target.name]:e.target.value})
  }
  const updateEditedCD = () => {
    AxiosInstance.post('/admin/updateEditedCD',editedCourtData).then((res)=>{
      setEditCourtModal(false)
      setSingleCourtData(editedCourtData);
    })
      .catch((err)=>{
        if(userDetails.role !== 1){
          localStorage.clear()
          navigate('/')
        }
        console.log(err)})
  }

  return (
    <>
    
      <div className="court-page.book ">
     
        <MDBCard background="dark" className="text-white">
       
          <MDBCardImage
            className="court-book-banner"
            overlay
            src={`${BASE_URL}/courts/${singleCourtData.courtPic}`}
            alt="..."
          />
 
          <MDBCardOverlay className="court-user-view-page ">
            <img
              className="cort-book-iside-img"
              src={`${BASE_URL}/courts/${singleCourtData.courtPic}`}
              alt=""
            ></img>
            <div className="court-page">
              <h2>{singleCourtData.courtName}</h2>
              <h6>{singleCourtData.location}</h6>
              <div className="d-flex">
                <button className="mx-3 btn btn-light" onClick={()=>getTimeSlotData()}>{today}</button>
                <button className="mx-3 btn btn-light" onClick={()=>getTimeSlotData(new Date({tomorrow}))}>{tomorrow}</button>
                <div className="select-date mx-3">
                  <input
                    type="date"
                    placeholder="select date"
                    className="select-date-area"
                    value={inputDate}
                    onChange={(e) => setInputDate(e.target.value)}
                  />
                </div>
                <button
                  className="mx-3 btn btn-dark"
                  onClick={() =>
                    inputDate && getTimeSlotData(new Date(inputDate))
                  }
                >
                  Search
                </button>
              </div>
              <div>
                <table className="mt-2">
                  <tr className="mt-5">
                    <td className="table-responsive-sm">
                      {slotData.map((slot) => (
                        <button
                          className={`mx-4 btn   ${slot.bookedBy? "bg-warning":"bg-white"}`}
                          key={slot.id}
                          onClick={()=>{!slot.bookedBy && setBookingOpen(true); !slot.bookedBy && setSlectedSlot(slot)}}
                        >
                          {slot.slot.name}
                        </button>
                      ))}
                    </td>
                  </tr>
                </table>
              </div>
              <MDBCardText className="bg-dark font-size-lg text-center">
                {singleCourtData.about}
              </MDBCardText>
              <MDBCardText className="bg-dark font-size-lg text-center">
                {singleCourtData.description}
              </MDBCardText>
             { userDetails.role === 1 && <button
                className="mx-3 btn btn-info "
                onClick={() => {
                  setOpenModal(true);
                }}
              >
                Add time slots
              </button>}
              
              {openModal && (
                <Modal
                  singleCourtData={singleCourtData}
                  setSingleCourtData={setSingleCourtData}
                  modalOpen={openModal}
                  timeSlotData={timeSlotData}
                  setTimeSlotData={setTimeSlotData}
                  showDropdown={showDropdown}
                  setShowDropdown={setShowDropdown}
                  selectedTimings={selectedTimings}
                  setSelectedTimings={setSelectedTimings}
                  filterTimings={filterTimings}
                  setFilterTimings={setFilterTimings}
                  setModalOpen={setOpenModal}
                  closeModal={setOpenModal}
                  id={id}
                />
              )}
              
              <ModalArea  modalOpen={bookingOpen} setModalOpen={setBookingOpen}>
                <div className="bg bg-dark">
                <table className="booking-confirm bg bg-warning">
                  <tr className="mt-1 ">
                    <td>Court :</td>
                    <td><h4>{selectedSlot?.court?.courtName}</h4></td>
                  </tr>
                  <tr className="mt-1">
                    <td>Location :</td>
                    <td><h6>{selectedSlot?.court?.location}<br/>{selectedSlot?.court?.address}</h6></td>
                  </tr>
                  <tr className="mt-1">
                    <td>Court type :</td>
                    <td><h6>{selectedSlot?.court?.type}</h6></td>
                  </tr>
                  <tr className="mt-1">
                    <td>Date:</td>
                    <td><h6>{new Date(selectedSlot?.date).toString().slice(0,16)}</h6></td>
                  </tr>
                  <tr className="mt-1">
                    <td>Time:</td>
                    <td><h6>{selectedSlot?.slot?.name}</h6></td>
                  </tr>
                  <tr className="mt-1">
                    <td>Price:</td>
                    <td> <h6>{selectedSlot?.cost} Rs</h6></td>
                  </tr>
                </table>
                <div className="mt-1 mb-1 mx-5">
                <button className="btn btn-success " onClick={initiateBooking}>Proceed</button>
                <button className="btn btn-danger mx-4" onClick={()=>setBookingOpen(false)}>Cancel</button>
                </div>
                </div>
              </ModalArea>
            </div>
            {userDetails.role === 1 && <button className="btn btn-secondary" onClick={HandleEditCourtDetails}>Edit Court Details</button>}
            
            <ModalArea  modalOpen={editCourtModal} setModalOpen={setEditCourtModal}>
                <div className="court-edit-modal bg bg-info">
                <table className="table-court-edit-modal bg bg-info ">
                  <tr className="mt-1 ">
                    <td><label htmlFor="">court name</label></td>
                    <td><input type="text" name="courtName" value={editedCourtData.courtName} onChange={handleEditedCortData} /></td>
                  </tr>
                  <tr className="mt-1">
                    <td><label htmlFor="">location</label></td>
                    <td><input type="text" name="location" value={editedCourtData.location} onChange={handleEditedCortData}/></td>
                  </tr>
                  <tr className="mt-1">
                    <td><label htmlFor="">court type</label></td>
                    <td><input type="text" name="type" value={editedCourtData.type} onChange={handleEditedCortData}/></td>
                  </tr>
                  <tr className="mt-1">
                    <td><label htmlFor="">address</label></td>
                    <td><input type="text" name="address" value={editedCourtData.address} onChange={handleEditedCortData}/></td>
                  </tr>
                  <tr className="mt-1">
                    <td><label htmlFor="" >about</label></td>
                    <td><input type="text" name="about" value={editedCourtData.about} onChange={handleEditedCortData}/></td>
                  </tr>
                  <tr className="mt-1">
                    <td><label htmlFor="">description</label></td>
                    <td><input type="text" name="description" value={editedCourtData.description} onChange={handleEditedCortData}/></td>
                  </tr>
                 
                </table>
                <div className="mt-1 mb-1 mx-5">
                <button className="btn btn-success " onClick={updateEditedCD} >Proceed</button>
                <button className="btn btn-danger mx-4" onClick={()=>setEditCourtModal(false)}>Cancel</button>
                </div>
                </div>
              </ModalArea>
          </MDBCardOverlay>
          
        </MDBCard>
      </div>
    </>
  );
}
