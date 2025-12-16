import React, { useState } from 'react'
import validator from 'validator'

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      console.log('Form submitted:', formData)
    }
  }
  return (
    <div className='h-screen bg-gray-100 px-10'>

      <div className='pb-10 pt-15 flex'>
        <p className='text-xl text-[#191E38]'>Contacts/</p>
        <p className='text-xl font-semibold'>Create</p>
      </div>

       
      <div className=' w-2/3 rounded-md shadow-md'>
        <div className=''>
            <form onSubmit={handleSubmit}>
                <div className='p-5 bg-white'>
                    <div className='flex gap-5 mb-5 '>
                <div className='flex flex-col '>
                    <label htmlFor="name">First Name:</label>
                    <input 
                      type="text" 
                      id="firstName" 
                      name="firstName" 
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`border border-gray-300 rounded-md p-2 w-80 ${errors.firstName ? 'border-red-500' : ''}`}
                    />
                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="lastName">Last Name:</label>
                    <input 
                      type="text" 
                      id="lastName" 
                      name="lastName" 
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`border border-gray-300 rounded-md p-2 w-80 ${errors.lastName ? 'border-red-500' : ''}`}
                    />
                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>
                </div>

                <div className='flex gap-5 mb-5 '>
                <div className='flex flex-col'>
                    <label htmlFor="name">Organization:</label>
                    <select 
                      name="organization"
                      value={formData.organization}
                      onChange={handleInputChange}
                      className={`rounded-md w-80 outline-none border border-gray-300 h-10 ${errors.organization ? 'border-red-500' : ''}`}
                    >
                      <option value="">Select Organization</option>
                      <option value="org1">Organization 1</option>
                      <option value="org2">Organization 2</option>
                    </select>
                    {errors.organization && <p className="text-red-500 text-sm mt-1">{errors.organization}</p>}
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="email">Email:</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`border border-gray-300 rounded-md p-2 w-80 ${errors.email ? 'border-red-500' : ''}`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                </div>

                 <div className='flex gap-5 mb-5'>
                <div className='flex flex-col'>
                    <label htmlFor="phone">Phone:</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`border border-gray-300 rounded-md p-2 w-80 ${errors.phone ? 'border-red-500' : ''}`}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="address">Address:</label>
                    <input type="text" id="address" name="address" className='border border-gray-300 rounded-md p-2 w-80'/>
                </div>
                </div>

                 <div className='flex gap-5 mb-5'>
                <div className='flex flex-col'>
                    <label htmlFor="text">City:</label>
                    <input type="text" id="text" name="text" className='border border-gray-300 rounded-md p-2 w-80'/>
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="text">Province/State:</label>
                    <input type="text" id="text" name="text" className='border border-gray-300 rounded-md p-2 w-80'/>
                </div>
                </div>

                 <div className='flex gap-5 mb-5'>
                <div className='flex flex-col'>
                    <label htmlFor="name">Country:</label>
                    <select className='rounded-md w-80 outline-none border border-gray-300 h-10 '>
                      <option className='' ></option>
                      <option className=''>Select Organization</option>
                      <option className=''>Select Organization</option>
                    </select>
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="text">Postel code:</label>
                    <input type="text" id="text" name="text" className='border border-gray-300 rounded-md p-2 w-80'/>
                </div>
                </div>
                </div>
            

            <div className='flex justify-end bg-gray-100 p-5'>
             <div className='border rounded-md flex justify-center items-center px-5 py-3 text-white bg-[#2F365F] '>
        <button>
          Create Contact
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
