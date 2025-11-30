import React from 'react'
import { MdKeyboardArrowDown } from "react-icons/md";

const NavBar = () => {
  return (
     
        <div className='w-full flex'>
          <div className='w-1/6'>
             <div className='font-bold text-2xl text-white text-center p-4 bg-[#191E38]'>Ping <span className='text-sm italic'>CRM</span></div>
          </div>
          <div className='w-5/6'>
           <div className=' flex justify-between mx-10 h-full items-center text-gray-600 '>
              <p className='text-md'>Acme corporation</p>
              <button>
                <div className='flex justify-center items-center gap-2'>
                  <p>user name</p>
                  <MdKeyboardArrowDown className='inline-block'/>
                </div>
              </button>
           </div>
          </div>
        </div>

  )
}

export default NavBar