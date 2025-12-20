"use client"
import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { Button } from '../../components/ui/button'
import axios from 'axios'
import { useRouter } from 'next/navigation'
const tiers = [
    {
        name: 'Free',
        price: 700,
        period: '/month',
        description: 'Perfect for trying out the platform.',
        features: [
            'Create a basic profile',
            'Browse travelers',
            '3 connection requests/month',
            'Basic support',
        ],
        notIncluded: ['Verified badge', 'Unlimited messaging', 'Priority matching'],
        cta: 'Get Started',
        variant: 'outline' as const,
    },
    {
        name: 'Premium',
        price: 1500,
        period: '/month',
        description: 'The best value for active travelers.',
        features: [
            'Everything in Free',
            'Unlimited connections',
            'Verified Traveler Badge',
            'Advanced search filters',
            'Ad-free experience',
        ],
        notIncluded: ['Dedicated travel concierge'],
        cta: 'Start Free Trial',
        variant: 'default' as const,
        popular: true,
    },
    {
        name: 'Enterprise',
        price: 0.00,
        period: '7 Days',
        description: 'For travel agencies and tour groups.',
        features: [
            'Team management dashboard',
            'Bulk verification',
            'API access',
            'Dedicated account manager',
            'Custom integrations',
            'Priority 24/7 support',
        ],
        notIncluded: [],
        cta: 'Contact Sales',
        variant: 'outline' as const,
    },
]
export function SubscriptionTiers() {
    const router = useRouter()

    const handleSubscriptionPayment = async (plan: string, price: number) => {
        try {
            const { data } = await axios.post("/api/make-payment", {
                plan,
                price,
            })

            if (data?.url) {
                router.push(data.url)
            }
        } catch (error) {
            console.error(error)
            alert("Payment failed. Please try again.")
        }
    }
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="text-lg text-slate-600">
                        Choose the plan that fits your travel needs. No hidden fees, cancel
                        anytime.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {tiers.map((tier, index) => (
                        <motion.div
                            key={tier.name}
                            initial={{
                                opacity: 0,
                                y: 20,
                            }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                            }}
                            whileHover={{
                                y: -8,
                            }}
                            viewport={{
                                once: true,
                            }}
                            transition={{
                                duration: 0.4,
                                delay: index * 0.1,
                            }}
                            className={`relative flex flex-col p-8 rounded-2xl ${tier.popular ? 'bg-white ring-2 ring-[#0066CC] shadow-xl scale-105 z-10' : 'bg-slate-50 border border-slate-200 shadow-sm'}`}
                        >
                            {tier.popular && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                    <span className="inline-flex items-center rounded-full bg-[#0066CC] px-4 py-1 text-sm font-medium text-white shadow-sm">
                                        Most Popular
                                    </span>
                                </div>
                            )}

                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-slate-900">
                                    {tier.name}
                                </h3>
                                <p className="mt-2 text-sm text-slate-500">
                                    {tier.description}
                                </p>
                                <div className="mt-4 flex items-baseline text-slate-900">
                                    <span className="text-4xl font-bold tracking-tight">
                                        {tier.price}
                                    </span>
                                    <span className="ml-1 text-lg font-semibold text-slate-500">
                                        {tier.period}
                                    </span>
                                </div>
                            </div>

                            <ul className="flex-1 space-y-4 mb-8">
                                {tier.features.map((feature) => (
                                    <li key={feature} className="flex items-start">
                                        <Check className="h-5 w-5 text-[#0066CC] shrink-0 mr-3" />
                                        <span className="text-sm text-slate-700">{feature}</span>
                                    </li>
                                ))}
                                {tier.notIncluded.map((feature) => (
                                    <li key={feature} className="flex items-start opacity-50">
                                        <X className="h-5 w-5 text-slate-400 shrink-0 mr-3" />
                                        <span className="text-sm text-slate-500">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <Button
                                variant={tier.variant}
                                className="w-full"
                                size="lg"
                                onClick={() =>
                                    handleSubscriptionPayment(tier.name, tier.price)
                                }
                            >
                                {tier.cta}
                            </Button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
