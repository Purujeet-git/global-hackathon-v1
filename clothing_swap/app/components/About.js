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
        
    </div>
  )
}

export default About
