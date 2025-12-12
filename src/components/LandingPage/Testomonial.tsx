"use client"
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
const testimonials = [
    {
        id: 1,
        name: 'Sarah Jenkins',
        location: 'London, UK',
        image:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        rating: 5,
        quote:
            'I was nervous about traveling solo to Japan, but I found the perfect travel buddy through this platform. We had an amazing time and are planning our next trip to Korea!',
    },
    {
        id: 2,
        name: 'Michael Chen',
        location: 'San Francisco, USA',
        image:
            'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        rating: 5,
        quote:
            "The verification process gave me peace of mind. I've met three different travel companions for various legs of my South American backpacking trip. Highly recommend.",
    },
    {
        id: 3,
        name: 'Elena Rodriguez',
        location: 'Madrid, Spain',
        image:
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        rating: 4,
        quote:
            'Great interface and easy to use. Found a hiking partner for the Swiss Alps in less than a week. The premium features are definitely worth it for the unlimited messaging.',
    },
]
export function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0)
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [])
    return (
        <section className="py-24 bg-[#F8FBFF] overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
                        Trusted by Travelers Worldwide
                    </h2>
                    <p className="text-lg text-slate-600">
                        Do not just take our word for it. Read what our community has to say.
                    </p>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    <div className="absolute top-0 left-0 -translate-x-4 -translate-y-4 text-blue-100">
                        <Quote className="w-24 h-24 opacity-50" />
                    </div>

                    <div className="relative z-10 min-h-[300px] flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{
                                    opacity: 0,
                                    x: 20,
                                }}
                                animate={{
                                    opacity: 1,
                                    x: 0,
                                }}
                                exit={{
                                    opacity: 0,
                                    x: -20,
                                }}
                                transition={{
                                    duration: 0.5,
                                }}
                                className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center w-full"
                            >
                                <div className="flex justify-center mb-6">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-5 h-5 ${i < testimonials[currentIndex].rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                        />
                                    ))}
                                </div>

                                <blockquote className="text-xl md:text-2xl font-medium text-slate-900 mb-8 leading-relaxed">
                                    {testimonials[currentIndex].quote}
                                </blockquote>

                                <div className="flex items-center justify-center">
                                    <img
                                        src={testimonials[currentIndex].image}
                                        alt={testimonials[currentIndex].name}
                                        className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md mr-4"
                                    />
                                    <div className="text-left">
                                        <div className="font-bold text-slate-900">
                                            {testimonials[currentIndex].name}
                                        </div>
                                        <div className="text-sm text-slate-500">
                                            {testimonials[currentIndex].location}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="flex justify-center mt-8 space-x-2">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-[#0066CC] w-8' : 'bg-slate-300 hover:bg-slate-400'}`}
                                aria-label={`Go to testimonial ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
