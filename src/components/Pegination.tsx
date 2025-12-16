const Pegination = () => {
  return (
    <div className='flex justify-center mt-6 lg:mt-8'>
      <div className='flex gap-1 lg:gap-2'>
        <button className='border border-gray-300 px-3 py-2 rounded-l-lg hover:bg-gray-50 transition-colors text-sm lg:text-base'>Previous</button>
        <button className='border border-gray-300 px-3 lg:px-4 py-2 bg-[#2F365F] text-white hover:bg-[#2F365F]/90 transition-colors text-sm lg:text-base'>1</button>
        <button className='border border-gray-300 px-3 lg:px-4 py-2 hover:bg-gray-50 transition-colors text-sm lg:text-base'>2</button>
        <button className='border border-gray-300 px-3 lg:px-4 py-2 hover:bg-gray-50 transition-colors text-sm lg:text-base'>3</button>
        <button className='border border-gray-300 px-3 py-2 rounded-r-lg hover:bg-gray-50 transition-colors text-sm lg:text-base'>Next</button>
      </div> 
    </div> 
  ) 
} 

export default Pegination
