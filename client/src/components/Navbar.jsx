import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className='bg-gray-800  text-white shadow-lg fixed top-0 left-0 right-0 z-10'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='flex justify-between h-16'>
          <div className='flex'>
            <Link to='/dashboard' className='flex items-center text-lg font-semibold px-2'>
              FitTrack
            </Link>
          </div>
          <div className='flex items-center'>
            <ul className='flex space-x-4'>
              <li>
                <Link to='/signup' className='px-3 py-2 rounded-md hover:bg-gray-600 
                transition duration-200'>Sign Up</Link>
              </li>
              <li>
                <Link to='/signin' className='px-3 py-2 rounded-md hover:bg-gray-600 
                transition duration-200'>Sign In</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
