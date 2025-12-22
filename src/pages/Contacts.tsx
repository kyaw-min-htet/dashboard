import { useState, useEffect } from 'react';
import { MdKeyboardArrowDown, MdDelete } from "react-icons/md";
import Pegination from '../components/Pegination';
import { contactsAPI } from '../api/services';

import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from 'react-router-dom';

interface Contact {
  id: string;
  first_name: string;
  last_name: string;
  name: string;
  city: string;
  phone: string;
}

const Contacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchFilter, setSearchFilter] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await contactsAPI.getAll();
      setContacts(response.data);
      setFilteredContacts(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch contacts');
      console.error('Error fetching contacts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchFilter(value);
    
    if (value.trim() === '') {
      setFilteredContacts(contacts);
    } else {
      const filtered = contacts.filter(contact => 
        contact.phone.toLowerCase().includes(value.toLowerCase()) ||
        contact.city.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredContacts(filtered);
    }
  };

  const handleReset = () => {
    setSearchFilter('');
    setFilteredContacts(contacts);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this contact?')) {
      try {
        await contactsAPI.delete(id);
        fetchContacts(); // Refresh the list
      } catch (err) {
        console.error('Error deleting contact:', err);
        alert('Failed to delete contact');
      }
    }
  };

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
                      <input 
                        type="text" 
                        value={searchFilter}
                        onChange={handleSearchChange}
                        className='w-full p-2 lg:p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2F365F]/20 h-full' 
                        placeholder='Search by phone or city...' 
                      />
                    </div>
        </div>
          
                    <button className='cursor-pointer' onClick={handleReset}>
                      <span className='text-gray-400 hover:text-gray-600 transition-colors text-sm lg:text-base'>Reset</span>
                    </button>
      </div>
      <div className='border rounded-lg flex justify-center items-center px-5 py-2 lg:py-3 text-white bg-[#2F365F] shadow-md hover:shadow-lg transition-shadow'>
        <Link to="/dashboard/create-contact">
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
            <th className='text-start p-3 lg:p-4 font-semibold text-gray-700'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={4} className='text-center p-4 text-gray-500'>
                Loading contacts...
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan={4} className='text-center p-4 text-red-500'>
                {error}
              </td>
            </tr>
          ) : filteredContacts.length === 0 ? (
            <tr>
              <td colSpan={4} className='text-center p-4 text-gray-500'>
                No contacts found
              </td>
            </tr>
          ) : (
            filteredContacts.map((contact) => (
              <tr key={contact.id} className='border-b border-gray-200 hover:bg-gray-50 transition-colors'>
                <td className='text-start p-3 lg:p-4 text-gray-800'>{contact.first_name}{contact.last_name}</td>
                <td className='text-start p-3 lg:p-4 text-gray-600'>{contact.city}</td>
                <td className='text-start p-3 lg:p-4 text-gray-600'>{contact.phone}</td>
                <td className='text-start p-3 lg:p-4'>
                  <div className='flex gap-2 items-center'>
                    <Link to={`/dashboard/edit-contact/${contact.id}`}>
                      <MdKeyboardArrowRight className='text-[20px] lg:text-[30px] text-gray-400 hover:text-[#2F365F] transition-colors cursor-pointer'/>
                    </Link>
                    <button 
                      onClick={() => handleDelete(contact.id)}
                      className='text-red-500 hover:text-red-700 transition-colors'
                      title='Delete contact'
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
     
    </div>
  )
}

export default Contacts