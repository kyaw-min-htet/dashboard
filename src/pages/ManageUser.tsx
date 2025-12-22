import React, { useState, useEffect } from 'react'
import { MdKeyboardArrowDown, MdKeyboardArrowRight, MdDelete } from "react-icons/md";
import CommonTable from '../components/commonTable';
import Pegination from '../components/Pegination';
import { Link } from 'react-router-dom';
import { adminUsersAPI } from '../api/services';

interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  owner: boolean;
}



const ManageUser = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await adminUsersAPI.getAllUsers();
      setUsers(response.data);
      setFilteredUsers(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch users');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.trim() === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user => 
        user.email.toLowerCase().includes(value.toLowerCase()) ||
        user.first_name.toLowerCase().includes(value.toLowerCase()) ||
        user.last_name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  };

  const handleReset = () => {
    setSearchTerm('');
    setFilteredUsers(users);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        await adminUsersAPI.deleteUser(id);
        fetchUsers(); // Refresh the list
      } catch (err) {
        console.error('Error deleting user:', err);
        alert('Failed to delete user');
      }
    }
  };

  return (
    
      <div className='px-4 sm:px-6 lg:px-10 py-6 lg:py-8 min-h-screen bg-gray-50'>
      <h1 className='text-xl lg:text-2xl font-semibold '>Users</h1>
     
     <div className='mt-7 flex justify-between'>
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
                      value={searchTerm}
                      onChange={handleSearchChange}
                      className='w-full p-2 lg:p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2F365F]/20 h-full' 
                      placeholder='Search by email, name...' 
                    />
                    </div>
        </div>
          
                    <button className='cursor-pointer' onClick={handleReset}>
                      <span className='text-gray-400 hover:text-gray-600 transition-colors text-sm lg:text-base'>Reset</span>
                    </button>
      </div>
      <div className='border rounded-md flex justify-center items-center px-4 lg:px-5 py-2 lg:py-3 text-white bg-[#2F365F] hover:bg-[#24294A] transition-colors'>
        <Link to="/dashboard/create-user">
        <button>
          Create User
        </button></Link>
        
      </div>
     </div>

     <div className='w-full mt-5 lg:mt-6 overflow-x-auto'>
        <table className='table-auto w-full min-w-full border-collapse border border-gray-100 bg-white rounded-lg shadow-sm'>
<thead>
          <tr className='border border-gray-200 bg-gray-50'>
            <th className='text-start p-3 lg:p-4 font-semibold text-gray-700'>Name</th>
            <th className='text-start p-3 lg:p-4 font-semibold text-gray-700'>Email</th>
            <th className='text-start p-3 lg:p-4 font-semibold text-gray-700'>Role</th>
            <th className='text-start p-3 lg:p-4 font-semibold text-gray-700'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={4} className='text-center p-4 lg:p-6 text-gray-500'>
                Loading users...
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan={4} className='text-center p-4 lg:p-6 text-red-500'>
                {error}
              </td>
            </tr>
           ) : filteredUsers.length === 0 ? (
            <tr>
              <td colSpan={4} className='text-center p-4 lg:p-6 text-gray-500'>
                No users found
              </td>
            </tr>
          ) : (
             filteredUsers.map((user) => (
              <tr key={user.id} className='border border-gray-200 hover:bg-gray-100 transition-colors'>
                <td className='text-start p-3 lg:p-4 font-medium'>
                  {user.first_name} {user.last_name}
                </td>
                <td className='text-start p-3 lg:p-4 text-gray-600'>
                  {user.email}
                </td>
                <td className='text-start p-3 lg:p-4'>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.owner 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {user.owner ? 'Owner' : 'User'}
                  </span>
                </td>
                <td className='text-start p-3 lg:p-4'>
                  <div className='flex gap-2 items-center'>
                    {/* <Link to={`/dashboard/edit-user/${user.id}`} className="text-gray-400 hover:text-[#2F365F] transition-colors">
                      <MdKeyboardArrowRight className='text-[20px] lg:text-[25px]'/>
                    </Link> */}
                    <button 
                      onClick={() => handleDelete(user.id)}
                      className='text-red-500 hover:text-red-700 transition-colors'
                      title='Delete user'
                    >
                      <MdDelete className='text-[20px] lg:text-[25px]'/>
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      </div>

     <Pegination />
      </div>
     
  )
}

export default ManageUser
