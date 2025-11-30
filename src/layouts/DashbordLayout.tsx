import React from 'react'
import { RiDashboard2Fill, RiOrganizationChart, RiContactsBook2Line  } from "react-icons/ri";
import { TbReportSearch } from "react-icons/tb";
import { Link, Outlet } from 'react-router-dom';
import NavBar from './NavBar';


const nav = [
  {icon: RiDashboard2Fill, name: 'Dashboard', path: '/', current: false },
  {icon: RiOrganizationChart, name: 'Organizations', path: 'organizations', current: false },
  {icon: RiContactsBook2Line, name: 'Contacts', path: 'contacts', current: false },
  {icon: TbReportSearch, name: 'Reports', path: 'report', current: false },
]

const DashbordLayout = () => {
  return (
    <div className='flex flex-col font-serif h-screen'>
        <NavBar />
        <div className='flex h-full'>
          <div className='w-1/6 bg-[#2F365F]'>
          <div className='flex justify-center items-center pt-10'>
            <ul className=''>
           {nav.map((item) => (
            <li key={item.name} className={`${item.current ? 'text-white' : 'text-gray-300 hover:text-white'} block px-4 py-3 text-lg font-medium cursor-pointer flex  items-center gap-3`}>
               <item.icon className='size-5'/><Link to={item.path}>{item.name}</Link>
            </li>
           ))}
          </ul>
          </div>
        </div>
        <div className='w-5/6 bg-gray-200'>
          <Outlet />
        </div>
        </div>
        
    </div>
  )
}

export default DashbordLayout