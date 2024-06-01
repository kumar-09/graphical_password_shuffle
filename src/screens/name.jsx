import React, { useState,} from 'react'
import { useNavigate } from "react-router-dom";

import { toast } from 'react-toastify';
export default function Name() {
    const [name,setName] = useState();
    const navigate = useNavigate();
    localStorage.removeItem("name")
    // const initCheck =async ()=>{
    //   try{
    //     const docRef = doc(db, "celeb_grphical_password_shuffle",localStorage.getItem("name"));
    //     const docSnap = await getDoc(docRef);
    //    if (docSnap.exists()){
    //     toast.info("Confirm your password!")
    //    }else{
    //     toast.info("Set your password!")
    //    }
    //   }
    //   catch(er){
    //   console.log(er)
    //   }
    //     }
  return (
    <div>
        <center>
<div className=' outer__layer_name'>
<div className='text__input'>
<div>
  <label htmlFor="exampleFormControlInput1" className="form-label">Enter Your ID</label>
<input  type="text" className="form-control" id="exampleFormControlInput1" onChange={(e)=>setName(e.target.value)}  />
</div>

<button type="button" className="btn btn-primary mt-2" onClick={async()=>{
  if(!name){
    toast.error("Enter your unique id!")
    return
  }

    localStorage.setItem("name",name)
    // await initCheck()
    navigate("/ip")
}}>Next</button>
</div>
</div>
        </center>
    </div>
  )
}


