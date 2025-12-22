import React, { useState } from 'react'
import { organizationsAPI } from '../api/services'
import { useNavigate } from 'react-router-dom'

interface FormData {
  name: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  country: string
  postalCode: string
}

const CreateOrganization = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    postalCode: ''
  })
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      await organizationsAPI.create(formData)
      navigate('/dashboard/organizations')
    } catch (err) {
      console.error('Error creating organization:', err)
      alert('Failed to create organization')
    } finally {
      setLoading(false)
    }
  }
  return (
   <div className='min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-10 py-6 lg:py-8'>

      <div className='pb-6 lg:pb-10 pt-8 lg:pt-15 flex flex-wrap items-center gap-2'>
        <p className='text-lg lg:text-xl text-[#191E38]'>Organizations/</p>
        <p className='text-lg lg:text-xl font-semibold'>Create</p>
      </div>

       
      <div className='w-full lg:w-2/3 xl:w-3/5 rounded-md shadow-md mx-auto'>
        <div className=''>
            <form onSubmit={handleSubmit}>
                <div className='p-4 lg:p-5 bg-white'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5 mb-5 lg:mb-6'>
                <div className='flex flex-col '>
                    <label htmlFor="name" className="text-sm lg:text-base font-medium text-gray-700 mb-1">Name:</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      value={formData.name}
                      onChange={handleInputChange}
                      className='border border-gray-300 rounded-md p-2 lg:p-3 w-full'
                    />
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="email" className="text-sm lg:text-base font-medium text-gray-700 mb-1">Email:</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleInputChange}
                      className='border border-gray-300 rounded-md p-2 lg:p-3 w-full'
                    />
                </div>
                </div>

                 <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5 mb-5 lg:mb-6'>
                <div className='flex flex-col'>
                    <label htmlFor="phone" className="text-sm lg:text-base font-medium text-gray-700 mb-1">Phone:</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      value={formData.phone}
                      onChange={handleInputChange}
                      className='border border-gray-300 rounded-md p-2 lg:p-3 w-full'
                    />
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="address" className="text-sm lg:text-base font-medium text-gray-700 mb-1">Address:</label>
                    <input 
                      type="text" 
                      id="address" 
                      name="address" 
                      value={formData.address}
                      onChange={handleInputChange}
                      className='border border-gray-300 rounded-md p-2 lg:p-3 w-full'
                    />
                </div>
                </div>

                 <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5 mb-5 lg:mb-6'>
                <div className='flex flex-col'>
                    <label htmlFor="text" className="text-sm lg:text-base font-medium text-gray-700 mb-1">City:</label>
                    <input 
                      type="text" 
                      id="city" 
                      name="city" 
                      value={formData.city}
                      onChange={handleInputChange}
                      className='border border-gray-300 rounded-md p-2 lg:p-3 w-full'
                    />
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="text" className="text-sm lg:text-base font-medium text-gray-700 mb-1">Province/State:</label>
                    <input 
                      type="text" 
                      id="state" 
                      name="state" 
                      value={formData.state}
                      onChange={handleInputChange}
                      className='border border-gray-300 rounded-md p-2 lg:p-3 w-full'
                    />
                </div>
                </div>

                 <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5 mb-5 lg:mb-6'>
                <div className='flex flex-col'>
                    <label htmlFor="text" className="text-sm lg:text-base font-medium text-gray-700 mb-1">Country:</label>
                    <input 
                      type="text" 
                      id="country" 
                      name="country" 
                      value={formData.country}
                      onChange={handleInputChange}
                      className='border border-gray-300 rounded-md p-2 lg:p-3 w-full'
                    />
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="text" className="text-sm lg:text-base font-medium text-gray-700 mb-1">Postal code:</label>
                    <input 
                      type="text" 
                      id="postalCode" 
                      name="postalCode" 
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className='border border-gray-300 rounded-md p-2 lg:p-3 w-full'
                    />
                </div>
                </div>
                </div>
            

            <div className='flex justify-end bg-gray-100 p-4 lg:p-5'>
             <div className='border rounded-md flex justify-center items-center px-4 lg:px-5 py-2 lg:py-3 text-white bg-[#2F365F] hover:bg-[#24294A] transition-colors'>
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Organization'}
        </button>
        
      </div>
                    </div>
          
            
          </form>
        </div>
        
        </div>
        
    </div>
  )
}

export default CreateOrganization
