import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { dummyCarData } from '../assets/assets'
import { assets } from '../assets/assets'
import Loader from '../components/Loader'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { motion } from 'motion/react'

const CarDetails = () => {

  const {id} = useParams()
  const {cars, axios, pickupAt, setPickupAt, returnAt, setReturnAt} = useAppContext()

  const [pickupDate, setPickupDate] = useState("");
  const [pickupHour, setPickupHour] = useState('9 AM');
  const [returnDate, setReturnDate] = useState("");
  const [returnHour, setReturnHour] = useState('9 AM');

  // calculate the price of the trip
  const [calculatedPrice, setCalculatedPrice] = useState(0)

  const navigate = useNavigate()
  const [car, setCar] = useState(null)
  const currency = import.meta.env.VITE_CURRENCY

  // function to convert 24h Date and time
  const toISODateTime = (date, time) => {
    let [hour, meridiem] = time.split(" ")
    hour = parseInt(hour)

    if (meridiem === "PM" && hour !== 12) hour += 12
    if (meridiem === "AM" && hour === 12) hour = 0

    return new Date(`${date}T${hour.toString().padStart(2, "0")}:00:00`)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const pickupAtValue = toISODateTime(pickupDate, pickupHour)
    const returnAtValue = toISODateTime(returnDate, returnHour)

    if (pickupAtValue >= returnAtValue) {
      toast.error("Return time must be after pickup time")
      return
    }

    setPickupAt(pickupAtValue)
    setReturnAt(returnAtValue)

    try {
      const { data } = await axios.post('/api/bookings/create', {
        car: id,
        pickupAt: pickupAtValue.toISOString(),
        returnAt: returnAtValue.toISOString()
      })

      if (data.success) {
        toast.success(data.message)
        navigate('/my-bookings')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  
  // function to get the calculated price
  const calculatePrice = async (pricePerDay, pickupAt, returnAt) => {
    try {
      const { data } = await axios.get('/api/bookings/price', {
        params: {
          pricePerDay,
          pickupAt: pickupAt.toISOString(),
          returnAt: returnAt.toISOString()
        }
      })

      if (data.success) {
        setCalculatedPrice(data.calculatedPrice)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    setCar(cars.find(car => car._id === id))
  }, [cars, id])


  useEffect(() => {
    if (!pickupDate || !pickupHour || !returnDate || !returnHour) return

    const pickupAt = toISODateTime(pickupDate, pickupHour)
    const returnAt = toISODateTime(returnDate, returnHour)
    
      if (returnAt <= pickupAt) {
        setCalculatedPrice(0)
        return
      }

      calculatePrice(car.pricePerDay, pickupAt, returnAt)

      // console.log(`pricePerDay: ${car.pricePerDay},pickupAt: ${pickupAt},returnAt: ${returnAt}`)

  }, [pickupDate, pickupHour, returnDate, returnHour, car])

  return car ?(
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-16'>
      <button onClick={()=> navigate(-1)} className='flex items-center gap-2 mb-6
      text-gray-500 cursor-pointer'>
        <img src={assets.arrow_icon} alt='' className='rotate-180 opacity-65'/>
        Back to all cars
      </button>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12'>
        {/* Left: Car Image & Details */}
        <motion.div 
        initial={{ opacity: 0, y: 30}}
        animate={{ opacity: 1, y: 0}}
        transition={{ duration: 0.6}}
        className='lg:col-span-2'>
          <motion.img 
          initial={{ scale: 0.98, opacity: 0}}
          animate={{ scale: 1, opacity: 1}}
          transition={{ duration: 0.5}}
          src={car.image} alt="" className='w-full h-auto md:mask-x-to-fuchsia-100
          object-cover rounded-xl mb-6 shadow-md'/>

          <motion.div 
          initial={{ opacity: 0}}
          animate={{ opacity: 1}}
          transition={{ delay: 0.2, duration: 0.5}}
          
          className='space-y-6'>
            <div>
              <h1 className='text-3xl font-bold'>{car.brand} {car.model}</h1>
              <p className='text-gray-500 text-lg'>{car.category} • {car.year}</p>
            </div>

            <hr className='border-borderColor my-6'/>

            <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
              {[
                {icon: assets.users_icon, text: `${car.seating_capacity} Seats`},
                {icon: assets.fuel_icon, text: car.fuel_type},
                {icon: assets.car_icon, text: car.transmission},
                {icon: assets.location_icon, text: car.location},
              ].map(({icon, text})=>(
                <motion.div 
                initial={{ opacity: 0, y: 10}}
                animate={{ opacity: 1, y: 0}}
                transition={{ duration: 0.4}}

                key={text} className='flex flex-col items-center bg-light
                p-4 rounded-lg'>
                  <img src={icon} alt="" className='h-5 mb-2'/>
                  {text}
                </motion.div>
              ))}
            </div>
            
            {/* Description */}
            <div>
              <h1 className='text-xl font-medium mb-3'>Description</h1>
              <p className='text-gray-500'>{car.description}</p>
            </div>

            {/* Features */}
            <div>
              <h1 className='text-xl font-medium mb-3'>Features</h1>
              <ul className='grid grid-cols-2 sm-grid-cols-2 gap-2'>
                {
                  ["360 Camera", "Bluetooth", "GPS", "Heated Seats", "Reat View Mirror"]
                  .map((item) => (
                    <li key={item} className='flex items-center text-gray-500'>
                      <img src={assets.check_icon} className='h-4 mr-2' alt=""/>
                      {item}
                    </li>
                  ))
                }
              </ul>
            </div>
          </motion.div>
        </motion.div>

        {/* Right; Booking Form */}
        <motion.form 
        initial={{ opacity: 0, y: 30}}
        animate={{ opacity: 1, y: 0}}
        transition={{ delay: 0.3, duration: 0.6}}

        onSubmit={handleSubmit} className='shadow-lg h-max sticky top-18 rounded-xl p-6 space-y-6 text-gray-500'>
          
          <p className='flex items-center justify-between text-2xl
          text-gray-800 font-semibold'>{currency}{car.pricePerDay}<span className='text-base 
          text-gray-400 font-normal'> per day</span></p>

          <hr className='border-borderColor my-6'/>
          
          {/* Pickup */}
          <div className="flex flex-col gap-2">
            <label>Pickup Date</label>
            <input
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="border border-borderColor px-3 py-2 rounded-lg"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>Pickup Time</label>
            <select
              value={pickupHour}
              onChange={(e) => setPickupHour(e.target.value)}
              className="border border-borderColor px-3 py-2 rounded-lg"
              required
            >
              {["12 AM","1 AM","2 AM","3 AM","4 AM","5 AM","6 AM","7 AM","8 AM","9 AM","10 AM","11 AM",
                "12 PM","1 PM","2 PM","3 PM","4 PM","5 PM","6 PM","7 PM","8 PM","9 PM","10 PM","11 PM"
              ].map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>

          {/* Return */}
          <div className="flex flex-col gap-2">
            <label>Return Date</label>
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              min={pickupDate || new Date().toISOString().split("T")[0]}
              className="border border-borderColor px-3 py-2 rounded-lg"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>Return Time</label>
            <select
              value={returnHour}
              onChange={(e) => setReturnHour(e.target.value)}
              className="border border-borderColor px-3 py-2 rounded-lg"
              required
            >
              {["12 AM","1 AM","2 AM","3 AM","4 AM","5 AM","6 AM","7 AM","8 AM","9 AM","10 AM","11 AM",
                "12 PM","1 PM","2 PM","3 PM","4 PM","5 PM","6 PM","7 PM","8 PM","9 PM","10 PM","11 PM"
              ].map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>


          {/* show the calculated price when the 4 fields are filled     */}
          {
            pickupDate && pickupHour && returnDate && returnHour &&
            <div className='flex flex-col gap-2'>
              {`Price: ${currency}${calculatedPrice}`}
            </div>
          }

          <button className='w-full bg-primary hover:bg-primary-dull 
          transition-all py-3 font-medium text-white rounded-xl cursor-pointer'>
            Book Now
          </button>

          <p className='text-center text-sm'>No credit card required to reserve</p>          
        </motion.form>
      </div>
    </div>
  ) : <Loader/>
}

export default CarDetails