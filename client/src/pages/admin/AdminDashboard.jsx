import React, { useEffect, useState } from 'react'
import AdminTitle from '../../components/admin/AdminTitle'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'

const AdminDashboard = () => {

  const { currency } = useAppContext()

  /* ---------------- DATE & TIME ---------------- */
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  const formattedDate = now.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  const formattedTime = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit'
  })

  /* ---------------- DUMMY DATA ---------------- */
  const stats = {
    totalCars: 42,
    availableCars: 31,
    unavailableCars: 11,
    totalUsers: 128,
    totalOwners: 9,
    totalBookings: 86,
    monthlyRevenue: 12450
  }

  const recentBookings = [
    {
      id: 1,
      car: 'Toyota Sienna',
      user: 'Elena Rodriguez',
      price: 115,
      status: 'confirmed',
      date: '2026-01-07'
    },
    {
      id: 2,
      car: 'BMW X5',
      user: 'James Wilson',
      price: 195,
      status: 'pending',
      date: '2026-01-06'
    }
  ]

  const recentUsers = [
    { id: 1, name: 'Sophia Brown', email: 'sophia@mail.com' },
    { id: 2, name: 'Daniel Carter', email: 'daniel@mail.com' }
  ]

  const cards = [
    { title: 'Total Cars', value: stats.totalCars, icon: assets.carIconColored },
    { title: 'Available Cars', value: stats.availableCars, icon: assets.checkIconColored },
    { title: 'Unavailable Cars', value: stats.unavailableCars, icon: assets.cautionIconColored },
    { title: 'Total Users', value: stats.totalUsers, icon: assets.userIconColored },
    { title: 'Owners', value: stats.totalOwners, icon: assets.userIconColored },
    { title: 'Total Bookings', value: stats.totalBookings, icon: assets.listIconColored }
  ]

  return (
    <div className="px-4 pt-10 md:px-10 flex-1">

      {/* TITLE + DATE */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <AdminTitle
          title="Admin Dashboard"
          subTitle="System-wide overview of cars, users, bookings, and revenue"
        />

        <div className="text-sm text-gray-500">
          <span className="font-medium text-slate-700">{formattedDate}</span>
          <span className="mx-2">•</span>
          <span>{formattedTime}</span>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8">
        {cards.map((card, index) => (
          <div
            key={index}
            className="group flex items-center justify-between p-4 rounded-xl
                       border border-borderColor bg-white shadow-sm
                       transition-all duration-200
                       hover:-translate-y-1 hover:shadow-md
                       hover:border-primary/40 hover:bg-primary/5"
          >
            <div>
              <p className="text-xs text-gray-500 group-hover:text-primary">
                {card.title}
              </p>
              <h2 className="text-xl font-semibold">
                {card.value}
              </h2>
            </div>

            <div className="flex items-center justify-center w-11 h-11 rounded-full
                            bg-primary/10 transition
                            group-hover:bg-primary/20">
              <img src={card.icon} alt="" className="h-5 w-5" />
            </div>
          </div>
        ))}
      </div>

      {/* LOWER SECTION */}
      <div className="flex flex-wrap gap-6 mb-10">

        {/* RECENT BOOKINGS */}
        <div className="flex-1 min-w-[320px] border border-borderColor rounded-xl
                        p-5 bg-white shadow-sm">
          <h2 className="text-lg font-medium">Recent Bookings</h2>
          <p className="text-sm text-gray-500 mb-4">Latest platform bookings</p>

          {recentBookings.map(b => (
            <div
              key={b.id}
              className="flex items-center justify-between py-3 border-b last:border-none
                         transition hover:bg-primary/5 rounded-md px-2"
            >
              <div>
                <p className="font-medium">{b.car}</p>
                <p className="text-xs text-gray-500">
                  {b.user} • {b.date}
                </p>
              </div>

              <div className="text-right">
                <p className="font-medium">{currency}{b.price}</p>
                <span className={`text-xs px-3 py-0.5 rounded-full
                  ${b.status === 'confirmed'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'}`}>
                  {b.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* MONTHLY REVENUE */}
        <div className="w-full md:max-w-xs border border-borderColor rounded-xl
                        p-5 bg-white shadow-sm
                        transition-all hover:-translate-y-1 hover:shadow-md
                        hover:bg-primary/5 hover:border-primary/40">
          <h2 className="text-lg font-medium">Monthly Revenue</h2>
          <p className="text-sm text-gray-500">Current month</p>

          <p className="mt-6 text-3xl font-semibold text-primary">
            {currency}{stats.monthlyRevenue}
          </p>
        </div>

        {/* RECENT USERS */}
        <div className="flex-1 min-w-[320px] border border-borderColor rounded-xl
                        p-5 bg-white shadow-sm">
          <h2 className="text-lg font-medium">New Users</h2>
          <p className="text-sm text-gray-500 mb-4">Recently registered</p>

          {recentUsers.map(u => (
            <div
              key={u.id}
              className="flex items-center justify-between py-2 border-b last:border-none
                         transition hover:bg-primary/5 rounded-md px-2"
            >
              <div>
                <p className="font-medium">{u.name}</p>
                <p className="text-xs text-gray-500">{u.email}</p>
              </div>

              <span className="text-xs px-3 py-1 rounded-full
                               bg-primary/10 text-primary">
                New
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default AdminDashboard
