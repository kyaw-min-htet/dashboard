import React from 'react'

const CommonTable = () => {
  return (
    <div className='w-full table-auto '>
      <table className='border'>
        <thead>
          <tr>
            <th>Name</th>
            <th>City</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Data 1</td>
            <td>Data 2</td>
            <td>Data 3</td>
            <td>Action</td>
          </tr>
          <tr>
            <td>Data 4</td>
            <td>Data 5</td>
            <td>Data 6</td>
            <td>Action</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default CommonTable
