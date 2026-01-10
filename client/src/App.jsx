import React, { useState } from 'react'
import { Navbar } from './components/Navbar'
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import CarDetails from './pages/CarDetails';
import Cars from './pages/Cars';
import MyBookings from './pages/MyBookings';
import Blog from './pages/Blog';
import Footer from './components/Footer';
import Layout from './pages/owner/Layout';
import AddCar from './pages/owner/AddCar';
import ManageCars from './pages/owner/ManageCars';
import ManageBookings from './pages/owner/ManageBookings';
import Dashboard from './pages/owner/Dashboard';
import Login from './components/Login';
import PaymentModal from './components/paymentModal';
import { Toaster } from 'react-hot-toast'
import { useAppContext } from './context/AppContext';

import AdminLayout from './pages/admin/AdminLayout';
import AdminManageUsers from './pages/admin/ManageUsers';
import AdminManageCars from './pages/admin/ManageCars';
import AdminManageBookings  from './pages/admin/ManageBookings';
import AdminDashboard  from './pages/admin/AdminDashboard';


const App = () => {

  const {showLogin, showPayment} = useAppContext()
  const isOwnerPath = useLocation().pathname.startsWith('/owner');
  const isAdminPath = useLocation().pathname.startsWith('/admin');
  

  return (
    <>
    <Toaster />
      {showLogin && <Login/>}

      {/* show the payment portal */}
      {showPayment && <PaymentModal />}    

      {!isOwnerPath && !isAdminPath && <Navbar />}

      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/car-details/:id' element={<CarDetails/>} />
        <Route path='/cars' element={<Cars/>} />
        <Route path='/my-bookings' element={<MyBookings/>}/>
        <Route path='/blogs' element={<Blog/>}/>
        <Route path='/owner' element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-car" element={<AddCar />} />
          <Route path="manage-cars" element={<ManageCars />} />
          <Route path="manage-bookings" element={<ManageBookings />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminManageUsers />} />
          <Route path="cars" element={<AdminManageCars />} />
          <Route path="bookings" element={<AdminManageBookings />} />
        </Route>


      </Routes>

      {!isOwnerPath && !isAdminPath && <Footer/>}
    </>
  )
}


export default App

