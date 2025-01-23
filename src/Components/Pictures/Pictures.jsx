import React, { useEffect, useState } from 'react'
import FirstImage from '../Images/image1.jpg'
import SecondImage from '../Images/image2.jpg'
import ThirdImage from '../Images/image3.jpg'
import FourthImage from '../Images/image4.jpg'
import FifthImage from '../Images/image5.jpg'
import SixthImage from '../Images/image6.jpg'
import SeventhImage from '../Images/image7.jpg'
import NextButton from '../Button/next.png'
import BackButton from '../Button/back.png'


const Pictures = () => {

  const [currentPicture, setCurrentPicture] = useState(0);

  const pictureItems = [FirstImage, SecondImage, ThirdImage, FourthImage, FifthImage, SixthImage, SeventhImage];

  const nextPicture = () => {
    if(currentPicture<pictureItems.length-1){
      setCurrentPicture(currentPicture+1);
    }else{
      setCurrentPicture(0)
    }
  }
  
  const backPicture =() => {
    if(currentPicture === 0){
      setCurrentPicture(pictureItems.length - 1)
    }
    else{
      setCurrentPicture(currentPicture - 1)
    } 
  }

 useEffect(() => {
  const interval = setInterval(() => {
    setCurrentPicture((prevPicture) => prevPicture >= pictureItems.length - 1 ? 0 : prevPicture + 1)
  }, 8000)

  return () => clearInterval(interval)
 },[pictureItems])

  return (
    <div className='w-[100%] flex justify-center mt-6 mt-40'>
        <img onClick={backPicture} className='w-18 h-20 absolute top-[400px] left-10 cursor-pointer ' src={BackButton} alt="" />
        <img className='w-[80%] h-[100vh] rounded' src={pictureItems[currentPicture]} alt={currentPicture}/>
        <img onClick={nextPicture} className='w-24 h-24 absolute top-[400px] right-8 cursor-pointer hover:transform-cpu' src={NextButton} alt="" />
        
        
    </div>
  )
}

export default Pictures
