import { RiDashboard2Fill, RiOrganizationChart, RiContactsBook2Line  } from "react-icons/ri";
import { TbReportSearch } from "react-icons/tb";
import { Link, Outlet, useLocation } from 'react-router-dom';
import NavBar from './NavBar';

const nav = [
  {icon: RiDashboard2Fill, name: 'Dashboard', path: '/dashboard' },
  {icon: RiOrganizationChart, name: 'Organizations', path: '/dashboard/organizations' },
  {icon: RiContactsBook2Line, name: 'Contacts', path: '/dashboard/contacts' },
  {icon: TbReportSearch, name: 'Reports', path: '/dashboard/report' },
]

const DashbordLayout = () => {
  const location = useLocation();
  return (
    <div className='flex flex-col font-serif h-screen'>
        <NavBar />
        <div className='flex flex-1 overflow-hidden'>
          <div className='hidden lg:block lg:w-64 xl:w-72 bg-[#2F365F] shadow-xl'>
           <div className='flex justify-center items-center pt-8 lg:pt-10'>
            <ul className='w-full px-4'>
           {nav.map((item) => {
            const isActive = location.pathname === item.path;
            return (
            <li key={item.name}>
               <Link 
                 to={item.path} 
                 className={`${isActive ? 'text-white bg-white/10' : 'text-gray-300 hover:text-white hover:bg-white/5'} block px-4 py-3 text-base lg:text-lg font-medium cursor-pointer flex items-center gap-3 rounded-lg transition-all duration-200 mb-1`}
               >
                 <item.icon className='size-5 flex-shrink-0'/>{item.name}
               </Link>
            </li>
            )
           })}
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