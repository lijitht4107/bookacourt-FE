import React, { useState } from 'react';
import {
  MDBValidation,
  MDBValidationItem,
  MDBInput,
  MDBBtn,
  MDBTextArea ,
  MDBFile,
  MDBCheckbox
} from 'mdb-react-ui-kit';
import Axiosinstance from '../../Config/AxiosInstants'

import {useNavigate} from 'react-router-dom'
import { toastError, toastSuccess } from '../../Constants/Plugins';
 
export default function Addcourtform() {
  const [formValue, setFormValue] = useState({
    courtName: '',
    location: '',
    type: '',
    address: '',
    about:'',
    description:''
  });
  
 const navigate=useNavigate();
  const [courtimage, setCourtimage] = useState(null)
  const [selectedimage, setSelectedimage] = useState('')
  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
   const addfileData=(e)=>{
    setCourtimage(e.target.files[0])
    e.target.files[0] ? setSelectedimage(URL?.createObjectURL(e.target.files[0]) ?? null):setSelectedimage(null)
   }


  const addCourtdata=()=>{
    let fileData=new FormData();
    fileData.append('image',courtimage)

    Axiosinstance.post('/admin/addCourtData',fileData,{params:formValue},{Headers:{"content-Type":'multipart/form-data'}}).then((response)=>{
        toastSuccess("court added successfully")
      navigate('/home')
    })
    .catch(error=>{
        console.log(error)
      toastError("court adding unsuccesfull")
    })
  }

  return (<>
  <div className='pt-5'>
  <div className='container p-5 border border-info rounded bg-info '>
    <MDBValidation className='row g-3 mt-5 ms-4 me-4'>
      <MDBValidationItem className='col-md-4'>
        <MDBInput
          value={formValue.courtName}
          name='courtName'
          onChange={onChange}
          id='validationCustom01'
          required
          label='Court Name'
        />
      </MDBValidationItem>
      <MDBValidationItem className='col-md-4'>
        <MDBInput
          value={formValue.location}
          name='location'
          onChange={onChange}
          id='validationCustom02'
          required
          label='Location'
        />
      </MDBValidationItem>
      <MDBValidationItem className='col-md-4'>
        <MDBInput
          value={formValue.type}
          name='type'
          onChange={onChange}
          id='validationCustom03'
          required
          label='Type'
        />
      </MDBValidationItem>
      <MDBValidationItem className='col-md-6'>
      <MDBInput
          value={formValue.about}
          name='about'
          type='text'
          onChange={onChange}
          id='textAreaExample'
          required
          label='About'
        />
      </MDBValidationItem>
      <MDBValidationItem className='col-md-6'>
        <MDBTextArea rows={4}
          value={formValue.address}
          name='address'
          type='text'
          onChange={onChange}
          id='textAreaExample'
          required
          label='Address'
        />
      </MDBValidationItem>
      <MDBValidationItem className='col-md-6'>
        <MDBTextArea rows={4}
          value={formValue.description}
          name='description'
          type='text'
          onChange={onChange}
          id='textAreaExample'
          required
          label='Description'
        />
      </MDBValidationItem>
    <MDBValidationItem className='col-md-6'>
        <MDBFile
          value={formValue.courtimage}    
          name='courtimage'
          onChange={addfileData}
          id='customFile'
          required
          label='Court Image'
        />
      </MDBValidationItem>
{ selectedimage&& <img src={selectedimage} alt="" className='object-fit w-25 ml-5' />}
      <MDBValidationItem className='col-12' feedback='You must agree before submitting.' invalid>
        <MDBCheckbox label='Agree to terms and conditions' id='invalidCheck' required />
      </MDBValidationItem>
      <div className='col-12'>
        <MDBBtn type='submit' onClick={addCourtdata}>Submit form</MDBBtn>
         <MDBBtn type='reset' className='ms-4 '>Reset form</MDBBtn>
      </div>
         
    </MDBValidation>
    </div>
    </div>
    </>
  );
}