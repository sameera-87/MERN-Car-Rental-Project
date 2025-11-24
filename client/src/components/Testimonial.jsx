import React from 'react'
import Title from './Title'
import { assets } from '../assets/assets';

const Testimonial = () => {

        const testimonials = [
        {   name: "Emma Rodriguez", 
            location: "Barcelona, Spain", 
            image: assets.testimonial_image_1, 
            testimonial: "I've rented cars from various companies, but the experience with Go Fleet was exceptional" 
        },

        {   name: "John Smith", 
            location: "New York, USA", 
            image: assets.testimonial_image_2, 
            testimonial: "Go Fleet exceeded my expectations! The car was in perfect condition, pickup was quick, and the pricing was completely transparent. Definitely the best rental experience I've had so far" 
        },

        {   name: "Ava Jhonson", 
            location: "Los Angeles, USA", 
            image: assets.testimonial_image_3, 
            testimonial: "From booking to drop-off, everything with Go Fleet was smooth and professional. The staff were helpful, the car felt brand new, and the whole experience was hassle-free. I’ll definitely choose them again!" 
        },
    ];

  return (
        <div className="py-28 px-6 md:px-16 lg-px-24 xl:px-44">

            <Title title="What Our Customers Say" subTitle="Discover why discerning travellers choose Go Fleet for
            their luxury travels across USA."/>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18">
                {testimonials.map((testimonial, index) => (
                    <div key={testimonial.id} className="bg-white p-6 rounded-xl shadow max-w-xs">
                        <div className="flex items-center gap-3">
                            <img className="w-12 h-12 rounded-full" src={testimonial.image} alt={testimonial.name} />
                            <div>
                                <p className="font-playfair text-xl">{testimonial.name}</p>
                                <p className="text-gray-500">{testimonial.address}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 mt-4">
                            {Array(5).fill(0).map((_, index) => (
                                <Star key={index} filled={testimonial.rating > index} />
                            ))}
                        </div>
                        <p className="text-gray-500 max-w-90 mt-4">"{testimonial.review}"</p>
                    </div>
                ))}
            </div>
        </div>
  )
}

export default Testimonial 
