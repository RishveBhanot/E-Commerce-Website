import React, { useState, useEffect } from 'react'
import Navbar from '../../Components/Header/Navbar'
import MainNavbar from '../../Components/Header/MainNavbar'
import Pictures from '../Pictures/Pictures'
import MainBody from './MainBody'
import { productsApi } from "./ProductsApi.jsx";
import Error from './Error.jsx'

const Home = () => {

  const [products, setProducts] = useState(null)
  const [error, setError] = useState(false)


  useEffect(() => {
    const fetchedProducts = async () => { 
      try{
        const productsData = await productsApi();
        setProducts(productsData);
        

      } catch(err) {
        console.error('Error shows:', err)
        setError(true)
      }
    }
    fetchedProducts();
  
  }, []);

  if(products === null){
    return <Error/>
  }

  return (
   <>
      <Navbar products={products}/>
      <MainNavbar/>
      <Pictures/>
      <MainBody products={products}/>
   </>
  )
}

export default Home