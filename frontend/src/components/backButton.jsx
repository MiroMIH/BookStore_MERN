import React from 'react'
import { BsArrowLeft } from 'react-icons/bs'

const backButton = ({destination ='/'}) => {
  return (
    <div className='flex'>
        <Link to={destination} className='bg-sky-600 text-white px-4 py-1 w-fit'>
            <BsArrowLeft className='text-2xl'/>
        </Link>
    </div>
  )
}

export default backButton