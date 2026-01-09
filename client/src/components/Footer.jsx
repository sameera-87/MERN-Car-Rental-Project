import { assets } from '../assets/assets'
import { motion } from 'motion/react'

const Footer = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gray-100 px-6 md:px-16 lg:px-24 xl:px-32 mt-60 pt-20 text-sm text-gray-600"
    >
      {/* Top section */}
      <div className="flex flex-wrap justify-between items-start gap-10 pb-8 border-b border-gray-300">
        
        {/* Brand */}
        <div>
          <img src={assets.logo} alt="logo" className="h-8 md:h-9" />
          <p className="max-w-80 mt-3 leading-relaxed">
            Ceylon Drive is a trusted Sri Lankan car rental service offering
            comfortable, reliable, and affordable vehicles for city travel,
            airport transfers, and long-distance journeys.
          </p>

          <div className="flex items-center gap-4 mt-6">
            <a href="#"><img src={assets.facebook_logo} className="w-5 h-5" alt="Facebook" /></a>
            <a href="#"><img src={assets.instagram_logo} className="w-5 h-5" alt="Instagram" /></a>
            <a href="#"><img src={assets.twitter_logo} className="w-5 h-5" alt="Twitter" /></a>
            <a href="#"><img src={assets.gmail_logo} className="w-5 h-5" alt="Email" /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-base font-medium text-gray-800 uppercase">
            Quick Links
          </h2>
          <ul className="mt-3 flex flex-col gap-2">
            <li><a className="hover:text-primary transition" href="#">Home</a></li>
            <li><a className="hover:text-primary transition" href="#">Browse Cars</a></li>
            <li><a className="hover:text-primary transition" href="#">List Your Car</a></li>
            <li><a className="hover:text-primary transition" href="#">About Us</a></li>
          </ul>
        </div>

        {/* Locations */}
        <div>
          <h2 className="text-base font-medium text-gray-800 uppercase">
            Locations
          </h2>
          <ul className="mt-3 flex flex-col gap-2">
            <li>Colombo</li>
            <li>Kandy</li>
            <li>Galle</li>
            <li>Dambulla</li>
            <li>Jaffna</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-base font-medium text-gray-800 uppercase">
            Contact
          </h2>
          <ul className="mt-3 flex flex-col gap-2">
            <li>No. 25, Galle Road</li>
            <li>Colombo 03, Sri Lanka</li>
            <li>+94 77 123 4567</li>
            <li>support@ceylondrive.lk</li>
          </ul>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between py-5 text-gray-500">
        <p>
          © {new Date().getFullYear()} Ceylon Drive. All rights reserved.
        </p>

        <ul className="flex items-center gap-4">
          <li><a className="hover:text-primary transition" href="#">Privacy Policy</a></li>
          <li>|</li>
          <li><a className="hover:text-primary transition" href="#">Terms & Conditions</a></li>
          <li>|</li>
          <li><a className="hover:text-primary transition" href="#">Cookies</a></li>
        </ul>
      </div>
    </motion.div>
  )
}

export default Footer
