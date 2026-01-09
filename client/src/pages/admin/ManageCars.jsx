import React, { useEffect, useState } from 'react'
import Title from '../../components/admin/Title'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { assets } from '../../assets/assets'

const ManageCars = () => {
  const { axios, currency } = useAppContext()
  const [cars, setCars] = useState([])

  const fetchCars = async () => {
    const { data } = await axios.get('/api/admin/cars')
    data.success ? setCars(data.cars) : toast.error(data.message)
  }

  const deleteCar = async (id) => {
    if (!window.confirm('Delete car?')) return
    await axios.delete(`/api/admin/cars/${id}`)
    toast.success('Car deleted')
    fetchCars()
  }

  useEffect(() => { fetchCars() }, [])

  return (
    <div className="px-4 pt-10 md:px-10 w-full">
      <Title title="Manage Cars" subTitle="All cars across platform" />

      <table className="w-full mt-6 border border-borderColor text-sm">
        <thead className="bg-gray-50 text-gray-500">
          <tr>
            <th className="p-3">Car</th>
            <th>Owner</th>
            <th>Price</th>
            <th>Status</th>
            <th />
          </tr>
        </thead>

        <tbody>
          {cars.map(car => (
            <tr key={car._id} className="border-t">
              <td className="p-3 flex gap-3">
                <img src={car.image} className="h-12 w-12 rounded-md" />
                {car.brand} {car.model}
              </td>
              <td>{car.owner?.name}</td>
              <td>{currency}{car.pricePerDay}/day</td>
              <td>
                <span className={`px-3 py-1 rounded-full text-xs
                ${car.isAvailable ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                  {car.isAvailable ? 'Available' : 'Unavailable'}
                </span>
              </td>
              <td>
                <img src={assets.delete_icon} onClick={() => deleteCar(car._id)} className="cursor-pointer" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ManageCars
