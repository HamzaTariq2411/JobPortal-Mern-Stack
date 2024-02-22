import React from "react";
import { hero_img } from "../../images";

const HeroSection = () => {
  return (
    <>
     <div className='md:h-[800px] h-[500px] w-full relative'>
      <img src={hero_img} alt="" className="w-full h-full object-cover absolute mix-blend-overlay"/>
      <div className=' absolute lg:top-[307px] lg:left-[170px] top-60 left-10'>
        <h1 className="text-black lg:text-[45px] lg:leading-[55px] font-black text-xl">Find Best jobs<br />Or Post Jobs Here</h1>
        <p className='text-black pt-3 text-sm lg:text-lg'>      A job portal serves as a digital platform connecting job seekers with <br /> employment opportunities and employers seeking qualified candidates. <br /> It provides a centralized space for individuals to explore and apply for <br /> various job positions, enabling them to upload resumes, build profiles, <br /> and browse through diverse job listings. <br /> 
</p>
      </div>
    </div>
    </>
  );
};

export default HeroSection;
