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
        <div className='flex flex-1 overflow-hidden'>
          <div className='hidden lg:block lg:w-64 xl:w-72 bg-[#2F365F] shadow-xl'>
          <div className='flex justify-center items-center pt-8 lg:pt-10'>
            <ul className='w-full px-4'>
           {nav.map((item) => (
            <li key={item.name} className={`${item.current ? 'text-white bg-white/10' : 'text-gray-300 hover:text-white hover:bg-white/5'} block px-4 py-3 text-base lg:text-lg font-medium cursor-pointer flex items-center gap-3 rounded-lg transition-all duration-200 mb-1`}>
               <item.icon className='size-5 flex-shrink-0'/><Link to={item.path} className="w-full">{item.name}</Link>
            </li>
           ))}
          </ul>
          </div>
        </div>
        <div className='flex-1 bg-gray-50 overflow-auto'>
          <Outlet />
        </div>
        </div>
        
    </div>
  )
}

export default DashbordLayout