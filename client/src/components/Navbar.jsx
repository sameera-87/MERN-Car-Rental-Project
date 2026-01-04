import React, { useState } from 'react'
import { assets, menuLinks } from '../assets/assets'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { motion } from 'motion/react'

export const Navbar = () => {

  const { setShowLogin, user, logout, isOwner, axios, setIsOwner } = useAppContext()

  const location = useLocation()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const changeRole = async () => {
    try {
      const { data } = await axios.post('/api/owner/change-role')
      if (data.success) {
        setIsOwner(true)
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <>
      {/* Fixed Navbar */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="
          fixed top-0 left-0 w-full z-50
          bg-white/90 backdrop-blur-md
          border-b border-borderColor
          px-6 md:px-16 lg:px-24 xl:px-32
          py-5
        "
      >
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link to="/">
            <motion.img
              whileHover={{ scale: 1.05 }}
              src={assets.logo}
              alt="logo"
              className="h-11"
            />
          </Link>

          {/* Menu */}
          <div
            className={`
              max-sm:fixed max-sm:top-[84px] max-sm:right-0 max-sm:h-screen max-sm:w-full
              max-sm:bg-light max-sm:border-t border-borderColor
              flex flex-col sm:flex-row
              items-start sm:items-center
              gap-6 sm:gap-10
              max-sm:p-6
              transition-transform duration-300
              ${open ? "max-sm:translate-x-0" : "max-sm:translate-x-full"}
            `}
          >
            {menuLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className="
                  text-lg font-medium text-[#2D3436]
                  hover:text-primary transition-colors
                "
              >
                {link.name}
              </Link>
            ))}

            <div className="hidden lg:flex items-center gap-2 px-4 py-2
              border border-borderColor rounded-full bg-white shadow-sm">
              <input
                type="text"
                className="w-44 bg-transparent outline-none text-sm placeholder-gray-400"
                placeholder="Search cars"
              />
              <img src={assets.search_icon} alt="search" className="w-4 h-4" />
            </div>

            <div className="flex max-sm:flex-col items-start sm:items-center gap-4">
              <button
                onClick={() => isOwner ? navigate('/owner') : changeRole()}
                className="text-lg font-medium text-primary hover:text-primary-dull transition-colors"
              >
                {isOwner ? 'Dashboard' : 'List cars'}
              </button>

              <button
                onClick={() => { user ? logout() : setShowLogin(true) }}
                className="
                  px-6 py-2.5 rounded-lg
                  bg-primary text-white text-lg font-medium
                  hover:bg-primary-dull transition-all
                  shadow-sm hover:shadow-md
                "
              >
                {user ? 'Logout' : 'Login'}
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="sm:hidden"
            aria-label="Menu"
            onClick={() => setOpen(!open)}
          >
            <img
              src={open ? assets.close_icon : assets.menu_icon}
              alt="menu"
              className="w-6 h-6"
            />
          </button>

        </div>
      </motion.nav>

      {/* Spacer to prevent overlap */}
      <div className="h-[84px]" />
    </>
  )
}
