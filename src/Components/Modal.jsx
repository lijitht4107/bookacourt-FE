import React, { useEffect, } from "react";
import "./Commen/css/Modal.css";
import { TIMINGS } from "../Constants/Const";
import AxiosInstance from "../Config/AxiosInstants";
import { toastError, toastSuccess } from "../Constants/Plugins";

function Modal({
  closeModal,
  modalOpen,
  setModalOpen,
  singleCourtData,
  setSingleCourtData,
  timeSlotData,
  setTimeSlotData,
  showDropdown,
  setShowDropdown,
  selectedTimings,
  setSelectedTimings,
  id,
  filterTimings,
  setFilterTimings
}) {
  //const  [minDate]= useParams()
  //const [updatedLastTime,setUpdatedLasTime]=useState({})

  const handleChange = (e) => {
    setTimeSlotData({ ...timeSlotData, [e.target.name]: e.target.value });
    console.log(timeSlotData);
  };
  
  useEffect(()=>{
    getLatestFilterSlots()
  },[selectedTimings])
  const getLatestFilterSlots=()=>{
    if(selectedTimings.length===0){
      setFilterTimings(TIMINGS)
    }else{
      const tempArray = []
      for(let slot of TIMINGS){
        let flag = false
        for(let Sslot of selectedTimings){
          if(slot.id===Sslot.id){
            flag = true
          }
        }
        if(!flag){
          tempArray.push(slot)
        }
      }
      setFilterTimings(tempArray)
    }
  }
  const handleCreateTimeSlot=()=>{
    try {
      AxiosInstance.post('/admin/addTimeSlotData',{...timeSlotData,selectedTimings,courtId:id}).then((res) => {
        closeModal(false);
        toastSuccess('court time created successfully')
      })
    } catch (error) {
      toastError('time slot creating failed')
    console.log(error)
    }
  }
  //useEffect(()=>{
 //   getUpdatedLastTime()
  //},[getUpdatedLastTime])

  //const getUpdatedLastTime = () =>{

   // AxiosInstance.get('/admin/addTimeSlotData',{ params: { upDatedDate:minDate }}).then((res)=>{
   //   setUpdatedLasTime(res.upDatedDate)
   // })
  //}
  
  return (
    <div className="modal-background">
    <div className="modal-container">
      <button
        className="title-close-button"
        onClick={() => {
          closeModal(false);
        }}
      >
        X
      </button>
      <div className="modal-title">
        <h2>{singleCourtData.courtName}</h2>
        <h5>{singleCourtData.location}</h5>
      </div>
      <div className="modal-body">
        <div className="d-flex flex-column add-court-time-model">
          <label htmlFor="">
            Starting date:
            <input
              type="date"
              //min={timeSlotData.updatedLastTime}
              // min={min date should be add}
              value={timeSlotData.startDate}
              name="startDate"
              onChange={handleChange}
            />
          </label>

          <label className="mt-2" htmlFor="">
            Ending date:
            <input
              type="date"
              min={timeSlotData.startDate}
              value={timeSlotData.endDate}
              name="endDate"
              onChange={handleChange}
            />
          </label>

          <label className="mt-2" htmlFor="">
            Cost:
            <input type="number" name="cost" value={timeSlotData.cost} onChange={handleChange}/>
          </label>

          <div
            className="form-select mt-2"
            onClick={() => {
              setShowDropdown(!showDropdown);
            }}
          >
            <div className="">Select timings</div>
            {showDropdown && (
              <div className="cus-dropdown-options container">
                <div
                  onMouseLeave={() => {
                    setShowDropdown(false);
                  }}
                >
                  <ul className="scroll-area">
                    {filterTimings.map((element, index) => (
                      <li
                        key={index}
                        onClick={() => {
                          setSelectedTimings([...selectedTimings,element]);
                          setShowDropdown(false); // Close the dropdown after selection
                        }}
                      >
                        {element.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          <div className="mt-3">
            {selectedTimings.length > 0 ? (
              selectedTimings.map((element, index) => (
                <span
                  key={index}
                  className="border border-1 bg-warning border rounded-2 border-dark p-1"
                  
                >
                
                  {element.name} {/* Display relevant information */}
                </span>
              ))
            ) : (
              <i>No slot available</i>
            )}
          </div>
        </div>
      </div>
      <div className="modal-footer mt-3">
        <button
          id="cancel-button"
          onClick={() => {
            closeModal(false);
          }}
        >
          Cancel
        </button>
        <button onClick={handleCreateTimeSlot}>Continue</button>
      </div>
    </div>
  </div>
  );
}

export default Modal;
