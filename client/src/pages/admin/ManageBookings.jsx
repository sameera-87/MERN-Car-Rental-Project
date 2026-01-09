import React, { useEffect, useState } from 'react'
import Title from '../../components/admin/Title'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const ManageBookings = () => {
  const { axios, currency } = useAppContext()
  const [sections, setSections] = useState({})

  const fetchAll = async () => {
    const endpoints = {
      active: '/api/admin/bookings/active',
      starting: '/api/admin/bookings/starting-today',
      ending: '/api/admin/bookings/ending-today',
      unpaid: '/api/admin/bookings/confirmed-unpaid',
    }

    const results = {}
    for (let key in endpoints) {
      const { data } = await axios.get(endpoints[key])
      if (data.success) results[key] = data.bookings
    }
    setSections(results)
  }

  useEffect(() => { fetchAll() }, [])

  const renderTable = (title, bookings) => (
    <div className="border border-borderColor rounded-md p-4 mb-6">
      <h2 className="font-medium mb-3">{title}</h2>
      {bookings?.map(b => (
        <div key={b._id} className="flex justify-between py-2 border-b">
          <p>{b.car.brand} {b.car.model}</p>
          <p>{currency}{b.price}</p>
        </div>
      ))}
    </div>
  )

  return (
    <div className="px-4 pt-10 md:px-10 w-full">
      <Title title="Bookings Overview" subTitle="Critical daily booking insights" />
      {renderTable('Active Confirmed Bookings', sections.active)}
      {renderTable('Starting Today', sections.starting)}
      {renderTable('Ending Today', sections.ending)}
      {renderTable('Confirmed but Unpaid', sections.unpaid)}
    </div>
  )
}

export default ManageBookings
