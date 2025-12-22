import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { contactsAPI, organizationsAPI } from '../api/services'

interface Contact {
  id: string
  first_name: string
  last_name: string
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
  first_name?: string
  last_name?: string
  organization?: string
  email?: string
  phone?: string
  address?: string
  city?: string
  state?: string
  country?: string
  postalCode?: string
}

interface FormErrors {
  // firstName?: string
  // lastName?: string
  first_name?: string
  last_name?: string
  organization?: string
  email?: string
  phone?: string
  address?: string
  city?: string
  state?: string
  country?: string
  postalCode?: string
}

const EditContact: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [contact, setContact] = useState<Contact | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [organizations, setOrganizations] = useState<any[]>([])
  const [errors, setErrors] = useState<FormErrors>({})

  useEffect(() => {
    if (id) {
      fetchContact()
      fetchOrganizations()
    }
  }, [id])

  const fetchContact = async () => {
    try {
      const response = await contactsAPI.getById(id!)
      setContact(response.data)
    } catch (err) {
      console.error('Error fetching contact:', err)
      alert('Failed to fetch contact')
      navigate('/contacts')
    } finally {
      setLoading(false)
    }
  }

  const fetchOrganizations = async () => {
    try {
      const response = await organizationsAPI.getAll()
      setOrganizations(response.data)
    } catch (err) {
      console.error('Error fetching organizations:', err)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    if (contact) {
      setContact({ ...contact, [name]: value })
    }
    
    if (errors[name as keyof FormErrors]) {
      setErrors({ ...errors, [name]: undefined })
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    
    if (!contact?.first_name?.trim()) {
      newErrors.first_name = 'First name is required'
    }
    
    if (!contact?.last_name?.trim()) {
      newErrors.last_name = 'Last name is required'
    }
    
    if (!contact?.email?.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!contact?.phone?.trim()) {
      newErrors.phone = 'Phone number is required'
    }
    
    if (!contact?.address?.trim()) {
      newErrors.address = 'Address is required'
    }
    
    if (!contact?.city?.trim()) {
      newErrors.city = 'City is required'
    }
    
    if (!contact?.state?.trim()) {
      newErrors.state = 'State/Province is required'
    }
    
    if (!contact?.country?.trim()) {
      newErrors.country = 'Country is required'
    }
    
    if (!contact?.postalCode?.trim()) {
      newErrors.postalCode = 'Postal code is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!contact || !validateForm()) return

    // Transform snake_case to camelCase for API consistency
    const payload = {
      firstName: contact.first_name,
      lastName: contact.last_name,
      organization: contact.organization,
      email: contact.email,
      phone: contact.phone,
      address: contact.address,
      city: contact.city,
      state: contact.state,
      country: contact.country,
      postalCode: contact.postalCode
    }

    try {
      setSaving(true)
      await contactsAPI.update(contact.id, payload)
      alert('Contact updated successfully')
    } catch (err) {
      console.error('Error updating contact:', err)
      alert('Failed to update contact')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!contact) return
    
    if (confirm('Are you sure you want to delete this contact? This action cannot be undone.')) {
      try {
        await contactsAPI.delete(contact.id)
        navigate('/contacts')
      } catch (err) {
        console.error('Error deleting contact:', err)
        alert('Failed to delete contact')
      }
    }
  }

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-10 flex items-center justify-center'>
        <p className='text-gray-500'>Loading contact...</p>
      </div>
    )
  }

  if (!contact) {
    return (
      <div className='min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-10 flex items-center justify-center'>
        <p className='text-gray-500'>Contact not found</p>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-10 py-6 lg:py-8'>
      <div className='pb-6 lg:pb-10 pt-8 lg:pt-15 flex flex-wrap items-center gap-2'>
        <p className='text-lg lg:text-xl text-[#191E38]'>Contacts/</p>
        <p className='text-lg lg:text-xl font-semibold'>{contact.first_name} {contact.last_name}</p>
      </div>

      <div className='w-full lg:w-2/3 xl:w-3/5 rounded-md shadow-md mx-auto'>
        <form onSubmit={handleSubmit}>
          <div className='p-4 lg:p-5 bg-white'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5 mb-5 lg:mb-6'>
              <div className='flex flex-col'>
                <label htmlFor="firstName" className="text-sm lg:text-base font-medium text-gray-700 mb-1">First Name:</label>
                <input 
                  type="text" 
                  id="firstName" 
                  name="first_name" 
                  value={contact.first_name}
                  onChange={handleInputChange}
                  className={`border border-gray-300 rounded-md p-2 lg:p-3 w-full ${errors.first_name ? 'border-red-500' : ''}`}
                />
                {errors.first_name && <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>}
              </div>

              <div className='flex flex-col'>
                <label htmlFor="lastName" className="text-sm lg:text-base font-medium text-gray-700 mb-1">Last Name:</label>
                <input 
                  type="text" 
                  id="lastName" 
                  name="last_name" 
                  value={contact.last_name}
                  onChange={handleInputChange}
                  className={`border border-gray-300 rounded-md p-2 lg:p-3 w-full ${errors.last_name ? 'border-red-500' : ''}`}
                />
                {errors.last_name && <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>}
              </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5 mb-5 lg:mb-6'>
              <div className='flex flex-col'>
                <label htmlFor="organization" className="text-sm lg:text-base font-medium text-gray-700 mb-1">Organization:</label>
                <select 
                  name="organization"
                  value={contact.organization}
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
                  value={contact.email}
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
                  value={contact.phone}
                  onChange={handleInputChange}
                  className={`border border-gray-300 rounded-md p-2 lg:p-3 w-full ${errors.phone ? 'border-red-500' : ''}`}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div className='flex flex-col'>
                <label htmlFor="address" className="text-sm lg:text-base font-medium text-gray-700 mb-1">Address:</label>
                <input 
                  type="text" 
                  id="address" 
                  name="address" 
                  value={contact.address}
                  onChange={handleInputChange}
                  className={`border border-gray-300 rounded-md p-2 lg:p-3 w-full ${errors.address ? 'border-red-500' : ''}`}
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5 mb-5 lg:mb-6'>
              <div className='flex flex-col'>
                <label htmlFor="city" className="text-sm lg:text-base font-medium text-gray-700 mb-1">City:</label>
                <input 
                  type="text" 
                  id="city" 
                  name="city" 
                  value={contact.city}
                  onChange={handleInputChange}
                  className={`border border-gray-300 rounded-md p-2 lg:p-3 w-full ${errors.city ? 'border-red-500' : ''}`}
                />
                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
              </div>

              <div className='flex flex-col'>
                <label htmlFor="state" className="text-sm lg:text-base font-medium text-gray-700 mb-1">Province/State:</label>
                <input 
                  type="text" 
                  id="state" 
                  name="state" 
                  value={contact.state}
                  onChange={handleInputChange}
                  className={`border border-gray-300 rounded-md p-2 lg:p-3 w-full ${errors.state ? 'border-red-500' : ''}`}
                />
                {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
              </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5 mb-5 lg:mb-6'>
              <div className='flex flex-col'>
                <label htmlFor="country" className="text-sm lg:text-base font-medium text-gray-700 mb-1">Country:</label>
                <select 
                  name="country"
                  value={contact.country}
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
                <label htmlFor="postalCode" className="text-sm lg:text-base font-medium text-gray-700 mb-1">Postal code:</label>
                <input 
                  type="text" 
                  id="postalCode" 
                  name="postalCode" 
                  value={contact.postalCode}
                  onChange={handleInputChange}
                  className={`border border-gray-300 rounded-md p-2 lg:p-3 w-full ${errors.postalCode ? 'border-red-500' : ''}`}
                />
                {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
              </div>
            </div>
          </div>

          <div className='flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 bg-gray-100 p-4 lg:p-5 items-center'>
            <button type="button" onClick={handleDelete} className="text-sm lg:text-base">
              <span className='text-red-500 hover:text-red-700 transition-colors'>Delete Contact</span>
            </button>
            
            <div className='flex gap-3'>
              <button 
                type="button" 
                onClick={() => navigate('/dashboard/contacts')}
                className="text-sm lg:text-base text-gray-500 hover:text-gray-700 transition-colors"
              >
                Cancel
              </button>
              
              <div className='border rounded-md flex justify-center items-center px-4 lg:px-5 py-2 lg:py-3 text-white bg-[#2F365F] hover:bg-[#24294A] transition-colors'>
                <button type="submit" disabled={saving} className="text-sm lg:text-base">
                  {saving ? 'Updating...' : 'Update Contact'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditContact