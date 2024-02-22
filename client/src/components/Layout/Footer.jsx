import React from 'react'
import {AiOutlineInstagram} from 'react-icons/ai'
import {FaTiktok} from 'react-icons/fa'
import  {BiLogoFacebook} from 'react-icons/bi'
import {FaPinterestP} from 'react-icons/fa'

const Footer = () => {
  return (
    <>
    <div className='bg-gray-300 flex flex-col justify-center py-12 items-center text-center gap-6'>
      <div className='text-4xl font-semibold'>
      JobPulse.
      </div>
      <div className=' text-[#3C3C3C] text-sm'>
      A job portal serves as a digital platform connecting job seekers with employment opportunities and employers seeking qualified candidates. <br /> It provides a centralized space for individuals to explore and apply for various job positions, enabling them to upload resumes, build profiles, and browse through diverse job listings. <br /> Simultaneously, employers can post job openings, review applications, and identify suitable candidates efficiently. 
      </div>
      <div className='flex text-black gap-7 text-2xl'>
        <AiOutlineInstagram className="cursor-pointer"/>
        <FaTiktok className="cursor-pointer"/>
        <BiLogoFacebook className="cursor-pointer"/>
        <FaPinterestP className="cursor-pointer"/>
      </div>
      <div className='text-center text-black text-xs font-black leading-none'>© 2024, Hamza Tariq</div>
    </div></>
  )
}

export default Footer
