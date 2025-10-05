'use client'
import React from 'react';
import { TypewriterEffectSmooth } from './ui/TypeWriterEffect';

const About = () => {
    const words = [
        {
            text:"Sell"
        },
        {
            text:"Exchange "
        },
        {
            text:"Love "
        },
        {
            text:"Wear "
        },
        {
            text:"All at once",
            
        },
    ]
  return (
    <div className='flex flex-col items-center justify-center h-[40rem] '>
        <TypewriterEffectSmooth words={words} />
        <div className='flex'>
        <p className='pl-52 text-xl w-1/3'>
            Welcome to our clothing exchange platform, where sustainability meets style. We believe that fashion should be accessible, affordable, and environmentally friendly. By enabling users to sell, swap, and discover pre-loved garments, we help reduce textile waste and promote a circular economy. Our community-driven marketplace empowers you to refresh your wardrobe while making a positive impact on the planet.
        </p>
        <p className='pl-52 text-xl w-1/3'>
            Whether you are looking to declutter your closet, find unique pieces, or simply connect with fellow fashion enthusiasts, our platform makes it easy and enjoyable. With secure transactions and a user-friendly interface, you can exchange clothes with confidence. Join us in redefining the way we shop—one swap at a time—and experience the joy of sustainable fashion.
        </p>
        </div>
    </div>
  )
}

export default About
