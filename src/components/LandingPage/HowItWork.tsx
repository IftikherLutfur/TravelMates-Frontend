"use client"
import { motion } from 'framer-motion'
import { UserPlus, Search, Map } from 'lucide-react'
const steps = [
  {
    id: 1,
    title: 'Create Your Profile',
    description:
      'Sign up and tell us about your travel style, interests, and destinations. We verify every profile for safety.',
    icon: UserPlus,
  },
  {
    id: 2,
    title: 'Browse & Connect',
    description:
      'Search through thousands of like-minded travelers. Filter by destination, dates, and budget to find your match.',
    icon: Search,
  },
  {
    id: 3,
    title: 'Plan Together',
    description:
      'Chat, plan your itinerary, and embark on your journey with a new friend. Support is available 24/7.',
    icon: Map,
  },
]
export function HowItWorks() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
            How It Works
          </h2>
          <p className="text-lg text-slate-600">
            Finding a travel buddy should not be complicated. We have made it
            simple, safe, and secure in just three steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-slate-200 -z-10" />

          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                margin: '-100px',
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.2,
              }}
              className="flex flex-col items-center text-center bg-white md:bg-transparent p-6 md:p-0 rounded-2xl shadow-sm md:shadow-none"
            >
              <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-white border-4 border-[#E6F2FF] shadow-sm mb-6 z-10">
                <step.icon className="w-10 h-10 text-[#0066CC]" />
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#0066CC] text-white flex items-center justify-center font-bold text-sm border-2 border-white">
                  {step.id}
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {step.title}
              </h3>
              <p className="text-slate-600 leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
