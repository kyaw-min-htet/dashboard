import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { adminUsersAPI } from '../api/services'

interface User {
  id: string
  first_name: string
  last_name: string
  email: string
  owner: boolean
  photo: string
}

interface FormErrors {
  first_name?: string
  last_name?: string
  email?: string
  owner?: string
  photo?: string
}

const EditUser: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})

  useEffect(() => {
    if (id) {
      fetchUser()
    }
  }, [id, fetchUser])

  const fetchUser = async () => {
    try {
      const response = await adminUsersAPI.getAllUsers()
      const foundUser = response.data.find((u: User) => u.id === id)
      if (foundUser) {
        setUser(foundUser)
      } else {
        alert('User not found')
        navigate('/users')
      }
    } catch (err) {
      console.error('Error fetching user:', err)
      alert('Failed to fetch user')
      navigate('/users')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (user) {
      setUser({
        ...user,
        [name]: type === 'select-one' ? value === 'true' : value
      })
    }
    
    if (errors[name as keyof FormErrors]) {
      setErrors({ ...errors, [name]: undefined })
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    
    if (!user?.first_name?.trim()) {
      newErrors.first_name = 'First name is required'
    }
    
    if (!user?.last_name?.trim()) {
      newErrors.last_name = 'Last name is required'
    }
    
    if (!user?.email?.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !validateForm()) return

    // Transform snake_case to camelCase for API consistency
    const payload = {
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      owner: user.owner,
      photo: user.photo
    }

    try {
      setSaving(true)
      await adminUsersAPI.updateUser(user.id, payload)
      alert('User updated successfully')
    } catch (err) {
      console.error('Error updating user:', err)
      alert('Failed to update user')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!user) return
    
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      try {
        await adminUsersAPI.deleteUser(user.id)
        navigate('/users')
      } catch (err) {
        console.error('Error deleting user:', err)
        alert('Failed to delete user')
      }
    }
  }

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-10 flex items-center justify-center'>
        <p className='text-gray-500'>Loading user...</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className='min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-10 flex items-center justify-center'>
        <p className='text-gray-500'>User not found</p>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-10 py-6 lg:py-8'>
      <div className='pb-6 lg:pb-10 pt-8 lg:pt-15 flex flex-wrap items-center gap-2'>
        <p className='text-lg lg:text-xl text-[#191E38]'>Users/</p>
        <p className='text-lg lg:text-xl font-semibold'>{user.first_name} {user.last_name}</p>
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
                  value={user.first_name}
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
                  value={user.last_name}
                  onChange={handleInputChange}
                  className={`border border-gray-300 rounded-md p-2 lg:p-3 w-full ${errors.last_name ? 'border-red-500' : ''}`}
                />
                {errors.last_name && <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>}
              </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5 mb-5 lg:mb-6'>
              <div className='flex flex-col'>
                <label htmlFor="email" className="text-sm lg:text-base font-medium text-gray-700 mb-1">Email:</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={user.email}
                  onChange={handleInputChange}
                  className={`border border-gray-300 rounded-md p-2 lg:p-3 w-full ${errors.email ? 'border-red-500' : ''}`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div className='flex flex-col'>
                <label htmlFor="owner" className="text-sm lg:text-base font-medium text-gray-700 mb-1">Role:</label>
                <select 
                  id="owner"
                  name="owner" 
                  value={user.owner.toString()}
                  onChange={handleInputChange}
                  className={`border border-gray-300 rounded-md p-2 lg:p-3 w-full ${errors.owner ? 'border-red-500' : ''}`}
                >
                  <option value="false">User</option>
                  <option value="true">Owner</option>
                </select>
                {errors.owner && <p className="text-red-500 text-sm mt-1">{errors.owner}</p>}
              </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5 mb-5 lg:mb-6'>
              <div className='flex flex-col'>
                <label htmlFor="photo" className="text-sm lg:text-base font-medium text-gray-700 mb-1">Photo URL:</label>
                <input 
                  type="text" 
                  id="photo" 
                  name="photo" 
                  value={user.photo}
                  onChange={handleInputChange}
                  className={`border border-gray-300 rounded-md p-2 lg:p-3 w-full ${errors.photo ? 'border-red-500' : ''}`}
                  placeholder="https://example.com/photo.jpg"
                />
                {errors.photo && <p className="text-red-500 text-sm mt-1">{errors.photo}</p>}
              </div>

              <div className='flex flex-col'>
                <label className="text-sm lg:text-base font-medium text-gray-700 mb-1">Password:</label>
                <input 
                  type="password" 
                  className='border border-gray-300 rounded-md p-2 lg:p-3 w-full bg-gray-50'
                  placeholder="Leave blank to keep current password"
                  disabled
                />
                <p className="text-xs text-gray-500 mt-1">Password change not available in edit mode</p>
              </div>
            </div>
          </div>

          <div className='flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 bg-gray-100 p-4 lg:p-5 items-center'>
            <button type="button" onClick={handleDelete} className="text-sm lg:text-base">
              <span className='text-red-500 hover:text-red-700 transition-colors'>Delete User</span>
            </button>
            
            <div className='flex gap-3'>
              <button 
                type="button" 
                onClick={() => navigate('/users')}
                className="text-sm lg:text-base text-gray-500 hover:text-gray-700 transition-colors"
              >
                Cancel
              </button>
              
              <div className='border rounded-md flex justify-center items-center px-4 lg:px-5 py-2 lg:py-3 text-white bg-[#2F365F] hover:bg-[#24294A] transition-colors'>
                <button type="submit" disabled={saving} className="text-sm lg:text-base">
                  {saving ? 'Updating...' : 'Update User'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditUser