import React from 'react'
import Image from 'next/image'
const ProductCard = () => {
  return (
    <div className='bg-[#FBBA72] mt-10 rounded-4xl flex flex-col items-center  w-1/4 object-contain'> 
       <Image className='h-4/5 p-3 rounded-4xl w-full' src={'/product1.0.avif'} height={1000} width={1000} alt='Product Image'/> 
        <div className='flex justify-between mb-10 w-7/8 mx-3 text-3xl text-[#8F250C]'>
            <p>Yellow Kurti</p>
            <p>₹ 1400</p>
        </div>
        <button className='border-1 cursor-pointer text-2xl text-[#CA5310] mb-5 border-[#CA5310] rounded-4xl w-7/8 px-3'>View Details</button>
    </div> 
  )
}

export default ProductCard
