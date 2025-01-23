import React, { useState, useEffect } from 'react'
import Navbar from '../../Components/Header/Navbar'
import MainNavbar from '../../Components/Header/MainNavbar'
import Pictures from '../Pictures/Pictures'
import MainBody from './MainBody'
import { productsApi } from "./ProductsApi.jsx";

const Home = () => {

 

  return (
   <>
    <Navbar/>
      <MainNavbar/>
      <Pictures/>
      <MainBody/>
   </>
  )
}

export default Home