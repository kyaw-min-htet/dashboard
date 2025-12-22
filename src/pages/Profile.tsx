import React, { useState, useEffect } from 'react'
import { adminUsersAPI } from '../api/services'
import { useAuth } from '../contexts/AuthContext'

interface UserProfile {
  firstName: string
  lastName: string
  email: string
  owner: string
  photo: string
}

const Profile = () => {
  const { user } = useAuth()
  const [profile, setProfile] = useState<UserProfile>({
    firstName: '',
    lastName: '',
    email: '',
    owner: '',
    photo: ''
  })
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    if (user) {
      setProfile({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        owner: user.owner ? 'Yes' : 'No',
        photo: ''
      })
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    if (user) {
      fetchProfile()
    }
  }, [user])

  const fetchProfile = async () => {
    try {
      const response = await adminUsersAPI.getProfile()
      const apiData = response.data
      setProfile({
        firstName: apiData.firstName || user?.first_name || '',
        lastName: apiData.lastName || user?.last_name || '',
        email: apiData.email || user?.email || '',
        owner: apiData.owner !== undefined ? (apiData.owner ? 'Yes' : 'No') : (user?.owner ? 'Yes' : 'No'),
        photo: apiData.photo || ''
      })
      console.log('Profile data from API:', apiData.first_name)
    } catch (err) {
      console.error('Error fetching profile:', err)
      // Use local storage data as fallback
      if (user) {
        setProfile({
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          email: user.email || '',
          owner: user.owner ? 'Yes' : 'No',
          photo: ''
        })
      }
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfile(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setUpdating(true)
      await adminUsersAPI.updateProfile(profile)
      alert('Profile updated successfully')
    } catch (err) {
      console.error('Error updating profile:', err)
      alert('Failed to update profile')
    } finally {
      setUpdating(false)
    }
  }

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: This would need a delete endpoint or you'd need to get user ID
        // await adminUsersAPI.deleteUser(userId)
        alert('Account deletion would require additional implementation')
      } catch (err) {
        console.error('Error deleting account:', err)
        alert('Failed to delete account')
      }
    }
  }

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-10 flex items-center justify-center'>
        <p className='text-gray-500'>Loading profile...</p>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-10 py-6 lg:py-8'>

      <div className='pb-6 lg:pb-10 pt-8 lg:pt-15 flex flex-wrap items-center gap-2'>
        <p className='text-lg lg:text-xl text-[#191E38]'>Users/</p>
        <p className='text-lg lg:text-xl font-semibold'>{loading ? 'Loading...' : `${profile.firstName} ${profile.lastName}`}</p>
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
                      value={profile.firstName}
                      onChange={handleInputChange}
                      className='border border-gray-300 rounded-md p-2 lg:p-3 w-full'
                    />
                </div>
                  <div className='flex flex-col '>
                    <label htmlFor="name" className="text-sm lg:text-base font-medium text-gray-700 mb-1">Last Name:</label>
                    <input 
                      type="text" 
                      id="lastName" 
                      name="lastName" 
                      value={profile.lastName}
                      onChange={handleInputChange}
                      className='border border-gray-300 rounded-md p-2 lg:p-3 w-full'
                    />
                </div>

                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5 mb-5 lg:mb-6'>

                <div className='flex flex-col'>
                    <label htmlFor="email" className="text-sm lg:text-base font-medium text-gray-700 mb-1">Email:</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={profile.email}
                      onChange={handleInputChange}
                      className='border border-gray-300 rounded-md p-2 lg:p-3 w-full'
                    />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="password" className="text-sm lg:text-base font-medium text-gray-700 mb-1">Password:</label>
                    <input type="password" id="password" name="password" className='border border-gray-300 rounded-md p-2 lg:p-3 w-full'/>
                </div>
                </div>

                 <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5 mb-5 lg:mb-6'>
                <div className='flex flex-col'>
                    <label htmlFor="owner" className="text-sm lg:text-base font-medium text-gray-700 mb-1">Owner:</label>
                    <input 
                      type="text" 
                      id="owner" 
                      name="owner" 
                      value={profile.owner}
                      onChange={handleInputChange}
                      className='border border-gray-300 rounded-md p-2 lg:p-3 w-full bg-gray-50'
                      readOnly
                    />
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="address" className="text-sm lg:text-base font-medium text-gray-700 mb-1">Photo:</label>
                    <input 
                      type="text" 
                      id="photo" 
                      name="photo" 
                      value={profile.photo}
                      onChange={handleInputChange}
                      className='border border-gray-300 rounded-md p-2 lg:p-3 w-full'
                    />
                </div>
                </div>

    
                </div>
            

<div className='flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 bg-gray-100 p-4 lg:p-5 items-center'>
                 
                     <button type="button" onClick={handleDelete} className="text-sm lg:text-base">
                    <span className='text-red-500 hover:text-red-700 transition-colors'>Delete User</span>
                </button>
                 
               
              <div className='border rounded-md flex justify-center items-center px-4 lg:px-5 py-2 lg:py-3 text-white bg-[#2F365F] hover:bg-[#24294A] transition-colors'>
        <button type="submit" disabled={updating} className="text-sm lg:text-base">
          {updating ? 'Updating...' : 'Update User'}
        </button>
        
      </div>
                    </div>
          
            
          </form>
        </div>
        
        </div>
        
    </div>
  )
}

export default Profile
