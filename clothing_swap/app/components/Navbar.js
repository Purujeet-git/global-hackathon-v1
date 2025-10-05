'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Lobster } from 'next/font/google';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';


const Lob = Lobster({
    subsets:['latin'],
    weight:'400'
}) 
const Navbar = () => {
  useGSAP(() => {
    gsap.to('#navbar',{
      opacity:1,
      y:0,
      ease:'sine.out',
    })
  },[]);

  return (
    <div id='navbar' className='pt-14 mx-4 opacity-0 translate-y-20'>
    <div className=' rounded-4xl bg-[#ffe6a7] text-[#6f1d1b]'>
        <div className='flex items-center p-2 justify-between'>
          <Link href={'/'}>
      <div className='flex items-center ml-5'><Image src={'/logo.png'} height={100} width={100} alt='logo'/>
      <p className={`text-3xl ${Lob.className}`}>ClothSwap</p></div></Link>
        <div className='flex gap-10 text-3xl mr-5'>
            <Link href={'/'}>Home</Link>
            <Link href={'/Shop'}>Shop</Link>
            <Link href="/chats">My Chats</Link>
            <Link href="/signup">My Account</Link>
            <Link href={'/'}>Cart</Link>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Navbar
