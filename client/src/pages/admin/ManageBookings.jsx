import React, { useEffect, useState } from 'react'
import AdminTitle from '../../components/admin/AdminTitle'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const ManageBookings = () => {
  const { axios, currency } = useAppContext()

  const [sections, setSections] = useState({
    active: [],
    starting: [],
    ending: [],
    unpaid: []
  })

  const fetchAll = async () => {
    try {
      const endpoints = {
        active: '/api/admin/bookings/active',
        starting: '/api/admin/bookings/starting-today',
        ending: '/api/admin/bookings/ending-today',
        unpaid: '/api/admin/bookings/confirmed-unpaid'
      }

      const results = {}

      for (const key in endpoints) {
        const { data } = await axios.get(endpoints[key])
        if (data.success) results[key] = data.bookings
      }

      setSections(results)
    } catch (err) {
      toast.error('Failed to load bookings')
    }
  }

  useEffect(() => {
    fetchAll()
  }, [])

  const formatDate = (date) =>
    new Date(date).toLocaleString()

  const renderStatusBadge = (status, map) => (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${map[status]}`}
    >
      {status}
    </span>
  )

  const renderTable = (title, bookings) => (
    <div className="mt-8 overflow-hidden rounded-xl border border-borderColor bg-white shadow-sm">

      {/* Section Header */}
      <div className="px-4 py-3 border-b border-borderColor bg-primary/10">
        <h2 className="font-semibold text-[#334155]">{title}</h2>
      </div>

      {/* Empty State */}
      {(!bookings || bookings.length === 0) && (
        <p className="p-4 text-sm text-gray-500">
          No bookings found.
        </p>
      )}

      {bookings?.length > 0 && (
        <table className="w-full text-sm">

          {/* Table Head */}
          <thead className="bg-gray-50 border-b border-borderColor text-[#334155]">
            <tr>
              <th className="py-3 px-3 text-left font-semibold">Car</th>
              <th className="py-3 px-3 text-left font-semibold">User</th>
              <th className="py-3 px-3 text-left font-semibold">Schedule</th>
              <th className="py-3 px-3 text-center font-semibold">Duration</th>
              <th className="py-3 px-3 text-center font-semibold">Price</th>
              <th className="py-3 px-3 text-center font-semibold">Status</th>
              <th className="py-3 px-3 text-center font-semibold">Payment</th>
              <th className="py-3 px-3 text-left font-semibold">Created</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-borderColor">
            {bookings.map(b => (
              <tr
                key={b._id}
                className="hover:bg-light transition-colors"
              >
                {/* Car */}
                <td className="py-2.5 px-3 font-medium">
                  {b.car?.brand}
                </td>

                {/* User */}
                <td className="py-2.5 px-3">
                  <div className="flex flex-col">
                    <span className="font-medium text-[#2D3436]">
                      {b.user?.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {b.user?.email}
                    </span>
                  </div>
                </td>

                {/* Schedule */}
                <td className="py-2.5 px-3 text-gray-600">
                  <div className="flex flex-col text-xs">
                    <span>📍 {formatDate(b.pickupAt)}</span>
                    <span>↩ {formatDate(b.returnAt)}</span>
                  </div>
                </td>

                {/* Duration */}
                <td className="py-2.5 px-3 text-center">
                  {b.durationInHours}h
                </td>

                {/* Price */}
                <td className="py-2.5 px-3 text-center font-medium">
                  {currency}{b.price}
                </td>

                {/* Booking Status */}
                <td className="py-2.5 px-3 text-center">
                  {renderStatusBadge(b.status, {
                    pending: 'bg-yellow-100 text-yellow-700',
                    confirmed: 'bg-green-100 text-green-700',
                    cancelled: 'bg-red-100 text-red-600'
                  })}
                </td>

                {/* Payment Status */}
                <td className="py-2.5 px-3 text-center">
                  {renderStatusBadge(b.paymentStatus, {
                    paid: 'bg-green-100 text-green-700',
                    unpaid: 'bg-orange-100 text-orange-700',
                    failed: 'bg-red-100 text-red-600'
                  })}
                </td>

                {/* Created */}
                <td className="py-2.5 px-3 text-xs text-gray-500">
                  {formatDate(b.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      )}
    </div>
  )

  return (
    <div className="px-4 pt-10 md:px-10 w-full">
      <AdminTitle
        title="Bookings Overview"
        subTitle="Monitor all platform bookings and payments"
      />

      {renderTable('Active Confirmed Bookings', sections.active)}
      {renderTable('Starting Today', sections.starting)}
      {renderTable('Ending Today', sections.ending)}
      {renderTable('Confirmed but Unpaid', sections.unpaid)}
    </div>
  )
}

export default ManageBookings
