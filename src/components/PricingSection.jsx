import React, { useState } from 'react';
import { Button } from './ui/button';
import { Check } from 'lucide-react';

export const PricingSection = () => {
    const [billingCycle, setBillingCycle] = useState('monthly');

    const plans = [
        {
            name: "Foundation",
            monthlyPrice: 2999,
            yearlyPrice: 29999,
            description: "Perfect for getting started with guided protocols",
            features: [
                "Personalized health assessment",
                "Customized nutrition plan",
                "Fasting protocol design",
                "Basic breathwork guide",
                "Email support",
                "Resource library access"
            ],
            highlighted: false
        },
        {
            name: "Transformation",
            monthlyPrice: 5999,
            yearlyPrice: 59999,
            description: "Complete support for serious health transformation",
            features: [
                "Everything in Foundation",
                "Weekly progress tracking",
                "1-on-1 health coach sessions",
                "Advanced breathwork training",
                "Private community access",
                "Priority support",
                "Recipe & meal planning",
                "Supplement recommendations"
            ],
            highlighted: true,
            badge: "Most Popular"
        },
        {
            name: "Elite",
            monthlyPrice: 9999,
            yearlyPrice: 99999,
            description: "Premium personalized wellness experience",
            features: [
                "Everything in Transformation",
                "Bi-weekly 1-on-1 coaching",
                "Lab work analysis",
                "Personalized supplement plan",
                "24/7 priority support",
                "Custom protocol adjustments",
                "Lifetime community access",
                "Annual health retreat"
            ],
            highlighted: false
        }
    ];

    const formatPrice = (price) => {
        return `₹${price.toLocaleString('en-IN')}`;
    };

    return (
        <section id="pricing" className="py-24 bg-gradient-to-br from-gray-50 to-stone-100">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="text-emerald-700 font-semibold text-sm uppercase tracking-wider">Pricing</span>
                    <h2 className="text-5xl font-serif font-bold text-gray-900 mt-4 mb-6">
                        Invest in Your{' '}
                        <span className="italic text-emerald-700">Health</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                        Choose the plan that fits your wellness journey
                    </p>

                    <div className="inline-flex items-center bg-white rounded-full p-1 shadow-md">
                        <button
                            onClick={() => setBillingCycle('monthly')}
                            className={`px-6 py-2 rounded-full font-medium transition-all ${billingCycle === 'monthly'
                                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
                                    : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setBillingCycle('yearly')}
                            className={`px-6 py-2 rounded-full font-medium transition-all ${billingCycle === 'yearly'
                                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
                                    : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Yearly
                            <span className="ml-2 text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">Save 17%</span>
                        </button>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 ${plan.highlighted ? 'ring-2 ring-emerald-500 scale-105' : ''
                                }`}
                        >
                            {plan.badge && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <span className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                                        {plan.badge}
                                    </span>
                                </div>
                            )}

                            <div className="text-center mb-6">
                                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">{plan.name}</h3>
                                <p className="text-gray-600 text-sm mb-4">{plan.description}</p>

                                <div className="mb-2">
                                    <span className="text-5xl font-bold text-gray-900">
                                        {formatPrice(billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice)}
                                    </span>
                                </div>
                                <span className="text-gray-500 text-sm">
                                    per {billingCycle === 'monthly' ? 'month' : 'year'}
                                </span>
                            </div>
                            
                            <Button 
                                className={`w-full py-6 mb-6 ${
                                    plan.highlighted
                                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-xl'
                                        : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                                }`}
                            >
                                Get Started
                            </Button>
                            
                            <div className="space-y-3">
                                {plan.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                        <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <Check className="h-3 w-3 text-emerald-600" />
                                        </div>
                                        <span className="text-gray-600 text-sm">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center text-gray-500 text-sm">
                    <p>All plans include a 14-day money-back guarantee • Cancel anytime</p>
                </div>
            </div>
        </section>
    );
};