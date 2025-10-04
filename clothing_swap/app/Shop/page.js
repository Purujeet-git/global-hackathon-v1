import React from 'react'
import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard'

const Page = () => {
  return (
    <div>
        <div className='bg-[url(/shopImage.jpg)] h-[45vh]'>
        <Navbar/>
        </div>
        <div className='bg-[#CA5310] pb-24'>
            <p className='text-5xl p-16 pb-5'>All Products</p>
            <div className=' mx-16 mb-10 bg-[#691E06] h-0.5'>
                
            </div>
            <div className='mx-16'>
            <ProductCard/>
            </div>
        </div>
    </div>
  )
}

export default Page
