import React from 'react'
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import CommonTable from '../components/commonTable';
import Pegination from '../components/Pegination';
import { Link } from 'react-router-dom';



const ManageUser = () => {
  return (
    
      <div className='px-10 py-10'>
      <h1 className='text-xl font-semibold '>Users</h1>
     
     <div className='mt-7 flex justify-between'>
      <div className='flex gap-2'>
        <div className='flex  bg-white rounded-md  '>
           <button>
                      <div className='flex justify-center items-center gap-2 border-r border-gray-200 p-3'>
                        <p className=''>Filter</p>
                        <MdKeyboardArrowDown className='inline-block'/>
                      </div>
                    </button>
                      <div className='flex-1 flex items-center'>
                      <input type="text" className='w-full p-2 lg:p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2F365F]/20 h-full' placeholder='Search...' />
                    </div>
        </div>
          
                    <button className='cursor-pointer'>
                      <span className='text-gray-400 coursor-pointe'>Reset</span>
                    </button>
      </div>
      <div className='border rounded-md flex justify-center items-center px-5 text-white bg-[#2F365F]'>
        <Link to="/create-contact">
        <button>
          Create User
        </button></Link>
        
      </div>
     </div>

     <div className='w-full mt-5'>
        <table className='table-auto w-full border-collapse border border-gray-100 bg-white'>
        <thead>
          <tr className='border border-gray-200'>
            <th className='text-start p-3'>Name</th>
            <th className='text-start p-3'>Email</th>
            <th className='text-start p-3'>Role</th>
            <th className='text-start p-3'></th>
          </tr>
        </thead>
        <tbody>
          <tr className='border border-gray-200 hover:bg-gray-100'>
            <td className='text-start  p-3'>Data 1</td>
            <td className='text-start p-3'>Data 2</td>
            <td className='text-start p-3'>Data 3</td>
            <td className='text-start p-3'><MdKeyboardArrowRight className='text-[30px]'/></td>
          </tr>
         
        </tbody>
      </table>
      {/* <CommonTable /> */}
     </div>

     {/* <Pegination /> */}
      </div>
     
  )
}

export default ManageUser
