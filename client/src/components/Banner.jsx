import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'motion/react'

const Banner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="
        flex flex-col md:flex-row md:items-start items-center
        justify-between
        px-8 md:px-14 pt-10
        bg-gradient-to-r from-primary to-accent
        max-w-6xl mx-3 md:mx-auto
        rounded-2xl overflow-hidden
        shadow-lg
      "
    >
      {/* Text Content */}
      <div className="text-white max-w-xl">
        <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
          Own a Car in Sri Lanka?
        </h2>

        <p className="mt-3 text-white/90 text-sm md:text-base">
          Put Your Car to Work with Ceylon Drive.
        </p>

        <p className="mt-2 text-white/80 text-sm leading-relaxed">
            List your car on Ceylon Drive and let us handle bookings, verified drivers,
            insurance coverage, and secure payments — so you can earn with confidence.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="
            inline-flex items-center justify-center
            mt-5 px-6 py-2.5
            bg-white text-primary
            rounded-lg text-sm font-medium
            hover:bg-slate-100 transition-all
            shadow-sm
          "
        >
          List your car
        </motion.button>
      </div>

      {/* Image */}
      <motion.img
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        src={assets.banner_car_image}
        alt="car"
        className="
          max-h-44 md:max-h-52
          mt-10 md:mt-0
          drop-shadow-xl
        "
      />
    </motion.div>
  )
}

export default Banner
