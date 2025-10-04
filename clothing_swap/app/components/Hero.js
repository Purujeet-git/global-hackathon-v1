'use client'
import React from 'react'
import Navbar from './Navbar'
import { Arimo } from 'next/font/google'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';



const Ari = Arimo({
    subsets:['latin'],
    weight:'400',
    
});

const Hero = () => {

  useGSAP(() => {
    gsap.to('#tab',{
      opacity:1,
      y:0,
      ease:'sine.out',
    })
  },[]);

  return (
    <div className='h-screen  bg-[url(/herobackgrounf.jpg)] relative'>
        <Navbar/>
        <div id='tab' className='opacity-0 translate-20 bg-[#bb9457] absolute flex flex-col  justify-start bottom-20 left-14 rounded-4xl py-10 pl-10'>
            <p className={`text-5xl font-bold ${Ari.className}`}>NEW ARRIVALS</p>
            <p className={`${Ari.className} w-2/3 text-2xl`}>Meet new clothes and discuss with people you like.</p>
            <button className='rounded-4xl w-fit p-3 my-3 bg-[#BB4D00]'>
                Shop Now
            </button>
        </div>
    </div>
  )
}

export default Hero
