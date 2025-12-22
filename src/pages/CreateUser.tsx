import React, { useState } from 'react'
import { adminUsersAPI } from '../api/services'
import { useNavigate } from 'react-router-dom'

interface FormData {
  firstName: string
  lastName: string
  email: string
  password: string
  owner: boolean
}

interface FormErrors {
  firstName?: string
  lastName?: string
  email?: string
  password?: string
  owner?: string
}

const CreateUser = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    owner: false
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [loading, setLoading] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
    
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    try {
      setLoading(true)
      await adminUsersAPI.createUser(formData)
      navigate('/dashboard/manage-user')
    } catch (err) {
      console.error('Error creating user:', err)
      alert('Failed to create user')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-10 py-6 lg:py-8'>

      <div className='pb-6 lg:pb-10 pt-8 lg:pt-15 flex flex-wrap items-center gap-2'>
        <p className='text-lg lg:text-xl text-[#191E38]'>Users/</p>
        <p className='text-lg lg:text-xl font-semibold'>Create</p>
      </div>

      <div className='w-full lg:w-2/3 xl:w-3/5 rounded-md shadow-md mx-auto'>
        <div className=''>
          <form onSubmit={handleSubmit}>
            <div className='p-4 lg:p-5 bg-white'>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5 mb-5 lg:mb-6'>
                <div className='flex flex-col '>
                  <label htmlFor="firstName" className="text-sm lg:text-base font-medium text-gray-700 mb-1">First Name:</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    name="firstName" 
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`border border-gray-300 rounded-md p-2 lg:p-3 w-full ${errors.firstName ? 'border-red-500' : ''}`}
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>

                <div className='flex flex-col '>
                  <label htmlFor="lastName" className="text-sm lg:text-base font-medium text-gray-700 mb-1">Last Name:</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    name="lastName" 
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`border border-gray-300 rounded-md p-2 lg:p-3 w-full ${errors.lastName ? 'border-red-500' : ''}`}
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5 mb-5 lg:mb-6'>
                <div className='flex flex-col'>
                  <label htmlFor="email" className="text-sm lg:text-base font-medium text-gray-700 mb-1">Email:</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`border border-gray-300 rounded-md p-2 lg:p-3 w-full ${errors.email ? 'border-red-500' : ''}`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div className='flex flex-col'>
                  <label htmlFor="password" className="text-sm lg:text-base font-medium text-gray-700 mb-1">Password:</label>
                  <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`border border-gray-300 rounded-md p-2 lg:p-3 w-full ${errors.password ? 'border-red-500' : ''}`}
                  />
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5 mb-5 lg:mb-6'>
                <div className='flex flex-col'>
                  <label htmlFor="owner" className="text-sm lg:text-base font-medium text-gray-700 mb-1">Role:</label>
                  <select 
                    id="owner"
                    name="owner" 
                    value={formData.owner.toString()}
                    onChange={handleInputChange}
                    className={`border border-gray-300 rounded-md p-2 lg:p-3 w-full ${errors.owner ? 'border-red-500' : ''}`}
                  >
                    <option value="false">User</option>
                    <option value="true">Owner</option>
                  </select>
                  {errors.owner && <p className="text-red-500 text-sm mt-1">{errors.owner}</p>}
                </div>

                <div className='flex flex-col'>
                  <label htmlFor="photo" className="text-sm lg:text-base font-medium text-gray-700 mb-1">Photo URL:</label>
                  <input 
                    type="text" 
                    id="photo" 
                    name="photo" 
                    // value={formData.photo}
                    onChange={handleInputChange}
                    className={`border border-gray-300 rounded-md p-2 lg:p-3 w-full `}
                    placeholder="https://example.com/photo.jpg"
                  />
                  {/* {errors.photo && <p className="text-red-500 text-sm mt-1">{errors.photo}</p>} */}
                </div>
              </div>
            </div>

            <div className='flex justify-between bg-gray-100 p-4 lg:p-5 items-center'>
              <button 
                type="button" 
                onClick={() => navigate('/dashboard/manage-user')}
                className="text-sm lg:text-base text-gray-500 hover:text-gray-700 transition-colors"
              >
                Cancel
              </button>
              
              <div className='border rounded-md flex justify-center items-center px-4 lg:px-5 py-2 lg:py-3 text-white bg-[#2F365F] hover:bg-[#24294A] transition-colors'>
                <button type="submit" disabled={loading} className="text-sm lg:text-base">
                  {loading ? 'Creating...' : 'Create User'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateUser