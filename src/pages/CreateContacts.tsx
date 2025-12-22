import React, { useState, useEffect } from 'react'
import validator from 'validator'
import { contactsAPI, organizationsAPI } from '../api/services'
import { useNavigate } from 'react-router-dom'

interface FormData {
  firstName: string
  lastName: string
  organization: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  country: string
  postalCode: string
}

interface FormErrors {
  firstName?: string
  lastName?: string
  organization?: string
  email?: string
  phone?: string
  address?: string
  city?: string
  state?: string
  country?: string
  postalCode?: string
}

const CreateContacts = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    organization: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    postalCode: ''
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [loading, setLoading] = useState(false)
  const [organizations, setOrganizations] = useState<any[]>([])

  useEffect(() => {
    fetchOrganizations()
  }, [])

  const fetchOrganizations = async () => {
    try {
      const response = await organizationsAPI.getAll()
      setOrganizations(response.data)
    } catch (err) {
      console.error('Error fetching organizations:', err)
    }
  }

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
    } else if (!validator.isEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!validator.isMobilePhone(formData.phone, 'any')) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required'
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required'
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State/Province is required'
    }

    if (!formData.country.trim()) {
      newErrors.country = 'Country is required'
    }

    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'Postal code is required'
    } else if (!validator.isPostalCode(formData.postalCode, 'any')) {
      newErrors.postalCode = 'Please enter a valid postal code'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
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
    if (validateForm()) {
      try {
        setLoading(true)
        await contactsAPI.create({
          firstName: formData.firstName,
          lastName: formData.lastName,
          organization: formData.organization,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          postalCode: formData.postalCode
        })
        navigate('/dashboard/contacts')
      } catch (err) {
        console.error('Error creating contact:', err)
        alert('Failed to create contact')
      } finally {
        setLoading(false)
      }
    }
  }
  return (
    <div className='min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-10 py-6 lg:py-8'>

      <div className='pb-6 lg:pb-10 pt-8 lg:pt-15 flex flex-wrap items-center gap-2'>
        <p className='text-lg lg:text-xl text-[#191E38]'>Contacts/</p>
        <p className='text-lg lg:text-xl font-semibold'>Create</p>
      </div>

       
      <div className='w-full lg:w-2/3 xl:w-3/5 rounded-md shadow-md mx-auto'>
        <div className=''>
            <form onSubmit={handleSubmit}>
                <div className='p-4 lg:p-5 bg-white'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5 mb-5 lg:mb-6'>
                <div className='flex flex-col '>
                    <label htmlFor="name" className="text-sm lg:text-base font-medium text-gray-700 mb-1">First Name:</label>
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

                <div className='flex flex-col'>
                    <label htmlFor="name" className="text-sm lg:text-base font-medium text-gray-700 mb-1">Last Name:</label>
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
                    <label htmlFor="organization" className="text-sm lg:text-base font-medium text-gray-700 mb-1">Organization:</label>
                    <select 
                      name="organization"
                      value={formData.organization}
                      onChange={handleInputChange}
                      className={`rounded-md w-full outline-none border border-gray-300 h-10 lg:h-12 ${errors.organization ? 'border-red-500' : ''}`}
                    >
                      <option value="">Select Organization</option>
                      {organizations.map((org) => (
                        <option key={org.id} value={org.id}>
                          {org.name}
                        </option>
                      ))}
                    </select>
                    {errors.organization && <p className="text-red-500 text-sm mt-1">{errors.organization}</p>}
                </div>

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
                      className={`border border-gray-300 rounded-md p-2 lg:p-3 w-full ${errors.phone ? 'border-red-500' : ''}`}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="text" className="text-sm lg:text-base font-medium text-gray-700 mb-1">City:</label>
                    <input 
                      type="text" 
                      id="city" 
                      name="city" 
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`border border-gray-300 rounded-md p-2 lg:p-3 w-full ${errors.city ? 'border-red-500' : ''}`}
                    />
                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                </div>
                </div>

<div className='grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5 mb-5 lg:mb-6'>
                <div className='flex flex-col'>
                    <label htmlFor="text" className="text-sm lg:text-base font-medium text-gray-700 mb-1">Province/State:</label>
                    <input 
                      type="text" 
                      id="state" 
                      name="state" 
                      value={formData.state}
                      onChange={handleInputChange}
                      className={`border border-gray-300 rounded-md p-2 lg:p-3 w-full ${errors.state ? 'border-red-500' : ''}`}
                    />
                    {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="address" className="text-sm lg:text-base font-medium text-gray-700 mb-1">Address:</label>
                    <input 
                      type="text" 
                      id="address" 
                      name="address" 
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`border border-gray-300 rounded-md p-2 lg:p-3 w-full ${errors.address ? 'border-red-500' : ''}`}
                    />
                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                </div>
                </div>

<div className='grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5 mb-5 lg:mb-6'>
                <div className='flex flex-col'>
                    <label htmlFor="text" className="text-sm lg:text-base font-medium text-gray-700 mb-1">Country:</label>
                    <select 
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className={`rounded-md w-full outline-none border border-gray-300 h-10 lg:h-12 ${errors.country ? 'border-red-500' : ''}`}
                    >
                      <option value="">Select Country</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="AU">Australia</option>
                    </select>
                    {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="text" className="text-sm lg:text-base font-medium text-gray-700 mb-1">Postal code:</label>
                    <input 
                      type="text" 
                      id="postalCode" 
                      name="postalCode" 
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className={`border border-gray-300 rounded-md p-2 lg:p-3 w-full ${errors.postalCode ? 'border-red-500' : ''}`}
                    />
                    {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
                </div>
                </div>
                </div>
            

            <div className='flex justify-end bg-gray-100 p-4 lg:p-5'>
             <div className='border rounded-md flex justify-center items-center px-4 lg:px-5 py-2 lg:py-3 text-white bg-[#2F365F] hover:bg-[#24294A] transition-colors'>
        <button type="submit">
          {loading ? 'Creating...' : 'Create Contact'}
        </button>
        
      </div>
                    </div>
          
            
          </form>
        </div>
        
        </div>
        
    </div>
  )
}

export default CreateContacts