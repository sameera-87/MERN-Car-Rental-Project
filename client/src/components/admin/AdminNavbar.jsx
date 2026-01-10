import React from 'react'
import { useAppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const NavbarAdmin = () => {
  const { user } = useAppContext()

  return (
    <div className="flex items-center justify-between px-6 md:px-10 py-4
    border-b border-borderColor text-gray-500">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="h-7" />
      </Link>
      <p>Admin Panel — {user?.name}</p>
    </div>
  )
}

export default NavbarAdmin
