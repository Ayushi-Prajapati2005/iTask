import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center p-4 bg-fuchsia-900 text-white'>
        <div className="logo">
            <span className='font-bold text-lg mx-7'>iTask</span>
        </div>
        <ul className="flex gap-8 mx-8">
            <li  className='cursor-pointer hover:text-gray-400 transition-all '>Home</li>
            <li className='cursor-pointer hover:text-gray-400  transition-all'>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
