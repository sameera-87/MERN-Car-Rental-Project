import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { assets } from '../../assets/assets'

const adminLinks = [
  { name: 'Dashboard', path: '/admin', icon: assets.listIcon, coloredIcon: assets.listIconColored },
  { name: 'Users', path: '/admin/users', icon: assets.userIcon, coloredIcon: assets.userIconColored },
  { name: 'Cars', path: '/admin/cars', icon: assets.carIcon, coloredIcon: assets.carIconColored },
  { name: 'Bookings', path: '/admin/bookings', icon: assets.listIcon, coloredIcon: assets.listIconColored },
]

const SidebarAdmin = () => {
  const location = useLocation()

  return (
    <div className="min-h-screen w-full md:w-60 border-r border-borderColor pt-6">
      {adminLinks.map((link, i) => (
        <NavLink
          key={i}
          to={link.path}
          className={`flex items-center gap-3 px-4 py-3 text-sm
          ${location.pathname === link.path
            ? 'bg-primary/10 text-primary'
            : 'text-gray-600'}`}
        >
          <img
            src={location.pathname === link.path ? link.coloredIcon : link.icon}
            alt=""
          />
          <span className="hidden md:block">{link.name}</span>
        </NavLink>
      ))}
    </div>
  )
}

export default SidebarAdmin
