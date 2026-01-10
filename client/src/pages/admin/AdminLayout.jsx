import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import AdminNavbar from '../../components/admin/AdminNavbar'
import AdminSidebar from '../../components/admin/AdminSidebar'
import { useAppContext } from '../../context/AppContext'

const Layout = () => {
  const { isAdmin, navigate } = useAppContext()

  useEffect(() => {
    if (!isAdmin) navigate('/')
  }, [isAdmin])

  return (
    <div className='flex flex-col'>
      <AdminNavbar />
      <div className='flex'>
        <AdminSidebar />
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
