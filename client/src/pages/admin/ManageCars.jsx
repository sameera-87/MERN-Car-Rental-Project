import React, { useEffect, useState } from 'react'
import AdminTitle from '../../components/admin/AdminTitle'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { assets } from '../../assets/assets'

const ManageCars = () => {
  const { axios, currency } = useAppContext()
  const [cars, setCars] = useState([])

  const fetchCars = async () => {
    try {
      const { data } = await axios.get('/api/admin/cars')
      data.success ? setCars(data.cars) : toast.error(data.message)
    } catch (error) {
      toast.error('Failed to fetch cars')
    }
  }

  const deleteCar = async (id) => {
    if (!window.confirm('Delete this car?')) return
    try {
      await axios.delete(`/api/admin/cars/${id}`)
      toast.success('Car deleted')
      fetchCars()
    } catch (error) {
      toast.error('Failed to delete car')
    }
  }

  useEffect(() => {
    fetchCars()
  }, [])

  return (
    <div className="px-4 pt-10 md:px-10 w-full">
      <AdminTitle
        title="Manage Cars"
        subTitle="View, monitor and remove cars across the platform"
      />

      {/* Card Container */}
      <div className="mt-6 w-250 overflow-hidden rounded-xl border border-borderColor bg-white shadow-sm">
        <table className="w-full text-sm">

          {/* Table Head */}
          <thead className="bg-primary/10 border-b border-borderColor text-[#334155]">
            <tr>
              <th className="py-3 px-3 text-left font-semibold">Car</th>
              <th className="py-3 px-3 text-left font-semibold">Category</th>
              <th className="py-3 px-3 text-left font-semibold">Location</th>
              <th className="py-3 px-3 text-left font-semibold">Price</th>
              <th className="py-3 px-3 text-left font-semibold">Status</th>
              <th className="py-3 px-3 text-center font-semibold">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-borderColor">
            {cars.map(car => (
              <tr
                key={car._id}
                className="hover:bg-light transition-colors"
              >

                {/* Car Info */}
                <td className="py-2.5 px-3 flex items-center gap-3">
                  <img
                    src={car.image}
                    alt={car.model}
                    className="h-12 w-16 rounded-md object-cover border"
                  />
                  <div>
                    <p className="font-medium text-[#2D3436]">
                      {car.brand} {car.model}
                    </p>
                    <p className="text-xs text-gray-500">
                      {car.year} • {car.transmission}
                    </p>
                  </div>
                </td>

                {/* Category */}
                <td className="py-2.5 px-3 text-gray-600">
                  {car.category}
                </td>

                {/* Location */}
                <td className="py-2.5 px-3 text-gray-600">
                  {car.location}
                </td>

                {/* Price */}
                <td className="py-2.5 px-3 font-medium">
                  {currency}{car.pricePerDay}
                  <span className="text-xs text-gray-500"> / day</span>
                </td>

                {/* Status */}
                <td className="py-2.5 px-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium
                    ${car.isAvailable
                        ? 'bg-green-100 text-green-600'
                        : 'bg-red-100 text-red-600'
                      }`}
                  >
                    {car.isAvailable ? 'Available' : 'Unavailable'}
                  </span>
                </td>

                {/* Action */}
                <td className="py-2.5 px-3 text-center">
                  <img
                    src={assets.delete_icon}
                    alt="Delete"
                    className="mx-auto h-8 w-8 cursor-pointer opacity-70
                               hover:opacity-100 hover:scale-110 transition"
                    onClick={() => deleteCar(car._id)}
                  />
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  )
}

export default ManageCars
