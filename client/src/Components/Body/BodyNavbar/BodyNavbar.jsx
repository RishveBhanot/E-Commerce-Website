import React, { useState } from 'react'

const BodyNavbar = ({onFilter}) => {

  return (
    <div className='flex justify-evenly text-gray-600 mt-6 border-b-[1px] border-gray-400 pb-4'>
      <div onClick={() => onFilter('All')} className='cursor-pointer hover:text-red-500 transition-all hover:scale-110'>All</div>
        <div onClick={() => onFilter("men's clothing")} className='cursor-pointer hover:text-red-500 transition-all hover:scale-110'>Men</div>
        <div onClick={() => onFilter("women's clothing")} className='cursor-pointer hover:text-red-500 transition-all hover:scale-110'>Women</div>
        <div onClick={() => onFilter('jewelery')} className='cursor-pointer hover:text-red-500 transition-all hover:scale-110'>Jewellery</div>
        <div onClick={() => onFilter('electronics')} className='cursor-pointer hover:text-red-500 transition-all hover:scale-110'>Electronics</div>
    </div>
  )
}

export default BodyNavbar