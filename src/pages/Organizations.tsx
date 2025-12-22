import React, { useState, useEffect } from 'react'
import { MdKeyboardArrowDown, MdDelete } from "react-icons/md";
import Pegination from '../components/Pegination';
import { organizationsAPI } from '../api/services';

import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from 'react-router-dom';

interface Organization {
  id: string;
  name: string;
  city: string;
  phone: string;
}

const Organizations = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [filteredOrganizations, setFilteredOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cityFilter, setCityFilter] = useState('');

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const fetchOrganizations = async () => {
    try {
      setLoading(true);
      const response = await organizationsAPI.getAll();
      setOrganizations(response.data);
      setFilteredOrganizations(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch organizations');
      console.error('Error fetching organizations:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCityFilter(value);
    
    if (value.trim() === '') {
      setFilteredOrganizations(organizations);
    } else {
      const filtered = organizations.filter(org => 
        org.city.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOrganizations(filtered);
    }
  };

  const handleReset = () => {
    setCityFilter('');
    setFilteredOrganizations(organizations);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this organization?')) {
      try {
        await organizationsAPI.delete(id);
        fetchOrganizations(); // Refresh the list
      } catch (err) {
        console.error('Error deleting organization:', err);
        alert('Failed to delete organization');
      }
    }
  };

  
   return (
      <div className='h-screen bg-gray-100'>
       <div className='px-4 sm:px-6 lg:px-10 py-6 lg:py-8'>
       <h1 className='text-xl lg:text-2xl font-semibold '>Organizations</h1>
     
      <div className='mt-7 lg:mt-8 flex justify-between'>
        <div className='flex flex-col sm:flex-row gap-2 flex-1'>
        <div className='flex  bg-white rounded-md  '>
           <button>
                      <div className='flex justify-center items-center gap-2 border-r border-gray-200 p-3'>
                        <p className='text-sm lg:text-base'>Filter</p>
                        <MdKeyboardArrowDown className='inline-block'/>
                      </div>
                    </button>
                      <div className='flex-1 flex items-center'>
                      <input 
                        type="text" 
                        value={cityFilter}
                        onChange={handleCityChange}
                        className='w-full p-2 lg:p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2F365F]/20 h-full' 
                        placeholder='Search by city...' 
                      />
                    </div>
         </div>
           
          <button className='cursor-pointer' onClick={handleReset}>
            <span className='text-gray-400 hover:text-gray-600 transition-colors text-sm lg:text-base'>Reset</span>
          </button>
      </div>
      <div className='border rounded-md flex justify-center items-center px-5 text-white bg-[#2F365F]'>
        <Link to="/dashboard/create-organization">
        <button>
          Create Organization
        </button></Link>
        
      </div>
     </div>

      <div className='w-full mt-5 lg:mt-6 overflow-x-auto'>
        <table className='table-auto w-full border-collapse border border-gray-100 bg-white'>
        <thead>
          <tr className='border border-gray-200'>
            <th className='text-start p-3'>Name</th>
            <th className='text-start p-3'>City</th>
            <th className='text-start p-3'>Phone</th>
            <th className='text-start p-3'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={4} className='text-center p-4 text-gray-500'>
                Loading organizations...
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan={4} className='text-center p-4 text-red-500'>
                {error}
              </td>
            </tr>
          ) : filteredOrganizations.length === 0 ? (
            <tr>
              <td colSpan={4} className='text-center p-4 text-gray-500'>
                No organizations found
              </td>
            </tr>
          ) : (
            filteredOrganizations.map((org) => (
              <tr key={org.id} className='border border-gray-200 hover:bg-gray-100'>
                <td className='text-start p-3'>{org.name}</td>
                <td className='text-start p-3'>{org.city}</td>
                <td className='text-start p-3'>{org.phone}</td>
                <td className='text-start p-3'>
                  <div className='flex gap-2 items-center'>
                    <Link to={`/dashboard/edit-organization/${org.id}`}>
                      <MdKeyboardArrowRight className='text-[30px] text-gray-400 hover:text-[#2F365F] transition-colors cursor-pointer'/>
                    </Link>
                    <button 
                      onClick={() => handleDelete(org.id)}
                      className='text-red-500 hover:text-red-700 transition-colors'
                      title='Delete organization'
                    >
                      <MdDelete className='text-[25px]'/>
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {/* <CommonTable /> */}
     </div>

     <Pegination />
      </div>
     
    </div>
  )
}

export default Organizations