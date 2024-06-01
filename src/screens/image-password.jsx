import React, { useState,useEffect } from "react";
import { collection, setDoc,  doc, getDoc, getDocs , } from "firebase/firestore";
import { db } from "../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";



export default function Imagepassword() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [numClicks, setNumClicks] = useState(0);
  const [imageStack, setImageStack] = useState([]);
  const [selectedNumbers,setSelectedNumbers] = useState([]);
  const [array, setArray] = useState([...Array(16)].map((_, index) => index));
  const [timer,setTimer] = useState(0);
  const [text,setText] = useState("");
  const [doSuffle,setDoSuffle] = useState(true)
  const navigate = useNavigate();


  useEffect(() => {
 
    if(!localStorage.getItem("name")){
      navigate("/")
    }
  });


    const initCheck =async ()=>{
      try{
        const docRef = doc(db, "celeb_grphical_password_shuffle",localStorage.getItem("name"));
        const docSnap = await getDoc(docRef);
       if (docSnap.exists()){
        setText("Confirm")
        
       
        // setDoSuffle(true)
       }else{
       
        // setDoSuffle(false)

        setText("Set as password")
       }
      }
      catch(er){
      console.log(er)
      }
        }


  useEffect(()=>{
initCheck()
shuffleArray()
  },[])

  useEffect(()=>{
    setTimeout(() => {
      setTimer(timer+1)
     }, 1000);
  },[timer])

  const handleImageClick = (image,index) => {
    if (numClicks < 6) {
      if(numClicks+1!==6){
        shuffleArray()
      }
      setSelectedImages([...selectedImages, image]);
      setImageStack([...imageStack, image]);
      setSelectedNumbers([...selectedNumbers,index])
      setNumClicks(numClicks + 1);
  
          
    }
    
  };

  const handleBackButtonClick = () => {
    if (numClicks > 0) {
      setImageStack(imageStack.slice(0, -1));
      setSelectedImages(selectedImages.slice(0, -1));
      setSelectedNumbers(selectedNumbers.slice(0,-1))
      setNumClicks(numClicks - 1);
      
      // if(numClicks!==){
        shuffleArray()
      // }

    }
  };
  const shuffleArray = () => {
if(doSuffle){
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  setArray(newArray);
}
  };

  const isPasswordCorrect = () => {
    if (selectedImages.length !== 6) {
      return false;
    }
    // for (let i = 0; i < password.length; i++) {
    //   if (selectedImages[i] !== password[i]) {
    //     return false;
    //   }
    // }
    return true;
  };

  const handleConfirmClick = async ()=>{
    const docRef = doc(db, "celeb_grphical_password_shuffle",localStorage.getItem("name"));
    const docSnap = await getDoc(docRef);
   if (docSnap.exists()){
  //  console.log(docSnap.data())
  //  const attemptsCollectionRef = collection(db, "celeb_grphical_password_shuffle", localStorage.getItem("name"), "attempts");
  //  const attemptsSnapshot = await getDocs(attemptsCollectionRef);
 
  //  const numberOfAttempts = attemptsSnapshot.size;

  //  if(numberOfAttempts>=4){
  //   toast.error("You have exhausted all recall attempts")
  //   return
  //  }

   if(docSnap.data().setup.toString()===selectedNumbers.toString()){
    await setDoc(doc(db, "celeb_grphical_password_shuffle",localStorage.getItem("name"),"attempts",`recall-${Date.now()}`), {
      time: new Date(),
      setup:docSnap.data().setup,
      recall:selectedNumbers ,
      incorrect:"",
      status:true   ,
      time_taken:timer

    });
    navigate("/verified");
   }else{
    var incorrect = []
    selectedNumbers.forEach((element,index) => {
      if (element !== docSnap.data().setup[index]){
       incorrect.push(docSnap.data().setup[index])
      } 
    });
    await setDoc(doc(db, "celeb_grphical_password_shuffle",localStorage.getItem("name"),"attempts",`recall-${Date.now()}`), {
      time: new Date(),
      setup:docSnap.data().setup,
      recall:selectedNumbers ,
      status:false  ,
      incorrect:incorrect,
      time_taken:timer,


    });
    navigate("/error");
   }
   }
   else{
   
    await setDoc(doc(db, "celeb_grphical_password_shuffle",localStorage.getItem("name")), {
      time:new Date(),
      name: localStorage.getItem("name"),
      setup:selectedNumbers   ,
      setup_time_taken:timer

    });
    navigate("/success");
   }
    
  }
  return (
    <center>
      <div className="outer__layer">
        {imageStack.length > 0 && (
         
       <FontAwesomeIcon className="btnI" onClick={handleBackButtonClick} icon={faCircleArrowLeft} />
         
        )}

{imageStack.length === 6 && (
        <button className="confirm-button " 
        onClick={handleConfirmClick}
        >
         <span className="confirm-button-text"> {text}</span>
        </button>
      )}
       {imageStack.length !== 6 && (
         <p className="inner__text">एक चेहरा चुनें</p>)
       }

  
        {/* cirlce start  */}

        <div className="outer__div__circle">
          {selectedImages.map((image, index) => (
            <div key={index} className="inner__circle">
           {
          index+1 !== selectedImages.length ?<div className="div__askterisk">*</div> :<img src={image} key={index} />
         }
            </div>
          ))}
          {[...Array(6 - selectedImages.length)].map((image, index) => (
            <div key={index} className="inner__circle"></div>
          ))}
        </div>

        {/* cirlce ends  */}

        <div className="images__box">
          <div className="grid-container">
            {
              array.map((im,index)=><div key={im} onClick={() => handleImageClick(require(`../assets/Celeb${numClicks+1>6?6:numClicks+1}/${im+1}.jpg`),im+1)} className="grid-item">
              <img alt="img1" src={require(`../assets/Celeb${numClicks+1>6?6:numClicks+1}/${im+1}.jpg`)} width={76} height={76} />
            </div>)
            }
           
          </div>
        </div>
      </div>
      {/* <small ><b>User: {localStorage.getItem("name")}</b></small> */}
    </center>
  );
}
