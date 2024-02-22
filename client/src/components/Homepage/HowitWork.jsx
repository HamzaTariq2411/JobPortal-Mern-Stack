import React from "react";

const HowitWork = () => {
  return (
    <div className="bg-gray-200">
    <h1 className="text-center pt-5 text-5xl font-bold">How It Works</h1>
    <div className="flex justify-center items-center gap-5 flex-wrap py-16 ">
      <div className="w-80 h-[400px] bg-black opacity-85 text-white rounded-xl flex flex-col justify-center items-center text-center">
        <h1 className=" text-[22px] font-black">
        Create Account
        </h1>
        <p className=" px-10">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque illo maxime omnis rem fuga dolores et, veritatis voluptate vero tenetur, est, cum cupiditate corrupti nemo earum ipsam in. Nam, nihil?
        </p>
      </div>
      <div className="w-80 h-[400px] bg-black text-white opacity-85 rounded-xl flex flex-col justify-center items-center text-center">
        <h1 className=" text-[22px] font-black">
          Find A Job
        </h1>
        <p className=" px-10">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit quasi mollitia nam doloremque tempore saepe maxime. Placeat veritatis amet omnis nam! Non beatae nisi ut dolor omnis asperiores vero porro?
        </p>
      </div>
      <div className="w-80 h-[400px] bg-black text-white opacity-85  rounded-xl flex flex-col justify-center items-center text-center">
        <h1 className=" text-[22px] font-black">
        Post A Job
        </h1>
        <p className=" px-10">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam fugiat id quibusdam natus, doloremque optio tempora saepe ullam neque laborum consequuntur cum, illo eum laboriosam sed, corrupti possimus inventore ut!
        </p>

      </div>
    </div>
    </div>
  );
};

export default HowitWork;
