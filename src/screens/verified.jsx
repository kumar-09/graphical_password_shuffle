import React,{useEffect} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';

export default function Verified() {
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
       <FontAwesomeIcon  className='scs__btn ' icon={faCircleCheck} />
    </div>
   </center>
  )
}
