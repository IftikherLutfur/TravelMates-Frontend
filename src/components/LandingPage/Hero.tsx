"use client"
import React, { Children, memo } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../ui/button'
import { Globe, Users, CheckCircle, ArrowRight } from 'lucide-react'
export function Hero() {
    const containerVariants = {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    }
    const itemVariants = {
        hidden: {
            opacity: 0,
            y: 20,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: 'easeOut',
            },
        },
    }
    return (
        <section className="relative w-full overflow-hidden bg-white pt-20 pb-24 lg:pt-32 lg:pb-40">
            {/* Background decoration */}
            <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-blue-100 blur-3xl" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-50 blur-3xl" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-4xl mx-auto text-center"
                >
                    <motion.div
                        className="mb-6 flex justify-center"
                    >
                        <span className="inline-flex items-center rounded-full bg-blue-50 px-4 py-1.5 text-sm font-medium text-[#0066CC] ring-1 ring-inset ring-blue-200">
                            <span className="mr-2 h-2 w-2 rounded-full bg-[#0066CC]" />
                            Trusted by 50,000+ Travelers
                        </span>
                    </motion.div>

                    <motion.h1
                        className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-7xl mb-6"
                    >
                        Find Your Perfect <br />
                        <span className="text-[#0066CC]">Travel Companion</span>
                    </motion.h1>

                    <motion.p
                        className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 mb-10"
                    >
                        Connect with verified travelers, plan adventures together, and
                        explore the world with confidence. Safety, compatibility, and
                        unforgettable memories guaranteed.
                    </motion.p>

                    <motion.div
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
                    >
                        <Button size="lg" >
                            Start Planning
                        </Button>
                        <Button variant="outline" size="lg">
                            Learn More
                        </Button>
                    </motion.div>

                    {/* Trust Indicators */}
                    <motion.div
                        className="grid grid-cols-1 gap-8 sm:grid-cols-3 border-t border-slate-200 pt-10"
                    >
                        <div className="flex flex-col items-center">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 text-[#0066CC] mb-4">
                                <Users className="w-6 h-6" />
                            </div>
                            <dt className="text-2xl font-bold text-slate-900">50,000+</dt>
                            <dd className="text-sm text-slate-500 font-medium uppercase tracking-wide mt-1">
                                Active Travelers
                            </dd>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 text-[#0066CC] mb-4">
                                <CheckCircle className="w-6 h-6" />
                            </div>
                            <dt className="text-2xl font-bold text-slate-900">10,000+</dt>
                            <dd className="text-sm text-slate-500 font-medium uppercase tracking-wide mt-1">
                                Successful Matches
                            </dd>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 text-[#0066CC] mb-4">
                                <Globe className="w-6 h-6" />
                            </div>
                            <dt className="text-2xl font-bold text-slate-900">150+</dt>
                            <dd className="text-sm text-slate-500 font-medium uppercase tracking-wide mt-1">
                                Countries Covered
                            </dd>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
