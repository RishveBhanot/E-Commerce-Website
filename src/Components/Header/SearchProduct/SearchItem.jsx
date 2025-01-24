import React from 'react'
import { useLocation } from 'react-router-dom';
import ProductsCard from '../../Body/ProductsCard';

const SearchItem = () => {

    const location=useLocation();
    console.log(location)
    const data = location.state.category;
    console.log(data)
    return (
    
    <div className='flex'>
      
      {data.map((product,index) => {
      return <ProductsCard key={index} product={product}/>
    })}</div>
  )
}

export default SearchItem