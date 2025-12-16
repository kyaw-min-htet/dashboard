import { MdKeyboardArrowDown } from "react-icons/md";
import Pegination from '../components/Pegination';

import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from 'react-router-dom';

const Contacts = () => {
  return (
    <div className='flex-1 bg-gray-50 overflow-auto'>
      <div className='px-4 lg:px-10 py-6 lg:py-10'>
      <h1 className='text-xl lg:text-2xl font-semibold text-gray-800'>Contacts</h1>
     
     <div className='mt-6 lg:mt-7 flex flex-col lg:flex-row justify-between gap-4'>
      <div className='flex flex-col sm:flex-row gap-2 flex-1'>
        <div className='flex bg-white rounded-lg shadow-sm border border-gray-200 items-stretch'>
           <button>
                      <div className='flex justify-center items-center gap-2 border-r border-gray-200 p-3 hover:bg-gray-50 transition-colors h-full'>
                        <p className='text-sm font-medium'>Filter</p>
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
      <div className='border rounded-lg flex justify-center items-center px-5 py-2 lg:py-3 text-white bg-[#2F365F] shadow-md hover:shadow-lg transition-shadow'>
        <Link to="/create-contact">
        <button className="font-medium">
          Create Contact
        </button></Link>
        
      </div>
     </div>

     <div className='w-full mt-5 lg:mt-6 overflow-x-auto'>
        <table className='table-auto w-full min-w-full border-collapse bg-white rounded-lg shadow-sm border border-gray-200'>
        <thead>
          <tr className='bg-gray-50 border-b border-gray-200'>
            <th className='text-start p-3 lg:p-4 font-semibold text-gray-700'>Name</th>
            <th className='text-start p-3 lg:p-4 font-semibold text-gray-700'>City</th>
            <th className='text-start p-3 lg:p-4 font-semibold text-gray-700'>Phone</th>
            <th className='text-start p-3 lg:p-4 font-semibold text-gray-700'></th>
          </tr>
        </thead>
        <tbody>
          <tr className='border-b border-gray-200 hover:bg-gray-50 transition-colors'>
            <td className='text-start p-3 lg:p-4 text-gray-800'>Data 1</td>
            <td className='text-start p-3 lg:p-4 text-gray-600'>Data 2</td>
            <td className='text-start p-3 lg:p-4 text-gray-600'>Data 3</td>
            <td className='text-start p-3 lg:p-4'><MdKeyboardArrowRight className='text-[20px] lg:text-[30px] text-gray-400 hover:text-[#2F365F] transition-colors cursor-pointer'/></td>
          </tr>
         
        </tbody>
      </table>
     </div>

     <Pegination />
      </div>
     
    </div>
  )
}

export default Contacts