import React from 'react'

const CreateOrganization = () => {
  return (
   <div className='h-screen bg-gray-100 px-10'>

      <div className='pb-10 pt-15 flex'>
        <p className='text-xl text-[#191E38]'>Organizations/</p>
        <p className='text-xl font-semibold'>Create</p>
      </div>

       
      <div className=' w-2/3 rounded-md shadow-md'>
        <div className=''>
            <form >
                <div className='p-5 bg-white'>
                    <div className='flex gap-5 mb-5 '>
                <div className='flex flex-col '>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" className='border border-gray-300 rounded-md p-2 w-80'/>
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="email">Email:</label>
                    <input type="text" id="email" name="email" className='border border-gray-300 rounded-md p-2 w-80'/>
                </div>
                </div>

                 <div className='flex gap-5 mb-5'>
                <div className='flex flex-col'>
                    <label htmlFor="phone">Phone:</label>
                    <input type="text" id="phone" name="phone" className='border border-gray-300 rounded-md p-2 w-80'/>
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
                    <label htmlFor="text">Country:</label>
                    <input type="text" id="text" name="text" className='border border-gray-300 rounded-md p-2 w-80'/>
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
          Create Organization
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
