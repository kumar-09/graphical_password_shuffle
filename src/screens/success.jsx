import React,{useEffect} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';

export default function Success() {
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => {
         navigate("/")
        }, 2000);
      });
  return (
   <center>
     <div className='success_bt success__box'>
       <FontAwesomeIcon  className='scs__btn ' icon={faCircleCheck} />
        <p className='scs_btn_text '>Done</p>
    </div>
   </center>
  )
}
