import React,{useEffect} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";


export default function ErrorC() {
    const navigate = useNavigate();
   

  
    useEffect(() => {
   
      if(!localStorage.getItem("name")){
        navigate("/")
      }
      setTimeout(() => {
        navigate("/")
       }, 2000);
   
    });
  return (
   <center>
     <div className='success_bt success__box'>
       <FontAwesomeIcon  className='scs__btn ' style={{color:"red"}} icon={faCircleXmark} />
       <p className='scs_btn_text '>Incorrect</p>
    </div>
   </center>
  )
}
