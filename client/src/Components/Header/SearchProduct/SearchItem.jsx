import React from 'react'
import { useLocation } from 'react-router-dom';
import ProductsCard from '../../Body/ProductsCard';

const SearchItem = () => {

    const location=useLocation();
    console.log(location)
    const data = location.state.category;
    console.log(data)
    return (
    
    <div>
      <div className='text-center text-[36px] font-semibold '>
      <h3>Related to <span className='text-orange-500'>Search</span>... </h3>
      </div>
      <div className='flex'>
      {data.map((product,index) => {
      return <ProductsCard key={index} product={product}/>
    })}
    </div>
    </div>
  )
}

export default SearchItem