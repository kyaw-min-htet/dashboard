import { useState } from 'react'
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link } from 'react-router-dom';


const NavBar = () => {
  const [model, setModel ] = useState(false);

  const handleModel = () => {
    setModel(!model);
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setModel(false);
    }
  }

  return (
    <>
    <div className='w-full flex z-20 shadow-lg' >
      <div className='hidden lg:block lg:w-64 xl:w-72'>
        <div className='font-bold text-xl lg:text-2xl text-white text-center p-3 lg:p-4 bg-[#21234f] shadow-inner'>Ping
          <span className='text-sm italic block'>CRM</span></div>
      </div>
      <div className='flex-1'>
        <div className='flex justify-between px-4 lg:px-10 h-full items-center text-gray-600 bg-white shadow-sm'>
          <p className='text-sm lg:text-md font-medium'>Acme corporation</p>
          <button onClick={handleModel} className='cursor-pointer hover:bg-gray-50 rounded-lg px-3 py-2 transition-colors'>
            <div className='flex justify-center items-center gap-2'>
              <p className='text-sm lg:text-base'>user name</p>
              <MdKeyboardArrowDown className='inline-block' />
            </div>
          </button>
        </div>
      </div>
    </div>

    {model && (
      <>
        <div 
          className='fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-200'
          onClick={handleBackdropClick}
        />
        <div className='shadow-2xl rounded-xl absolute top-16 right-4 lg:right-10 flex flex-col bg-white z-50 py-2 min-w-48 border border-gray-100 transform transition-all duration-200 scale-100 opacity-100'>
          <div className='px-2 py-1'>
            <Link to="profile" onClick={() => setModel(false)}>
              <button className='hover:bg-[#2F365F] hover:text-white py-2 px-4 w-full text-sm text-gray-700 text-left transition-colors rounded-lg'>My Profile</button>
            </Link>
            <Link to="manage-user" onClick={() => setModel(false)}>
              <button className='hover:bg-[#2F365F] hover:text-white py-2 px-4 w-full text-sm text-gray-700 text-left transition-colors rounded-lg'>Manage Users</button>
            </Link>
            <Link to="profile" onClick={() => setModel(false)}>
              <button className='hover:bg-[#2F365F] hover:text-white py-2 px-4 w-full text-sm text-gray-700 text-left transition-colors rounded-lg'>Logout</button>
            </Link>
          </div>
        </div>
      </>
    )}
    </>
  )
}

export default NavBar