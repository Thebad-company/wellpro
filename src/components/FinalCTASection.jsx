import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { ArrowRight, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

export const FinalCTASection = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success('Thank you! We will contact you soon to start your wellness journey.');
        setFormData({ name: '', email: '', phone: '', message: '' });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <section className="py-24 bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="text-white space-y-6">
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                            <Sparkles className="h-5 w-5" />
                            <span className="text-sm font-medium">Your transformation starts here</span>
                        </div>

                        <h2 className="text-5xl md:text-6xl font-serif font-bold leading-tight">
                            Start Your Transformation{' '}
                            <span className="italic">Today</span>
                        </h2>

                        <p className="text-xl text-emerald-50 leading-relaxed">
                            Join thousands who have reversed lifestyle disorders and reclaimed their vitality.
                            Your body has incredible healing power—we'll show you how to unlock it.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                    <span className="text-2xl">✓</span>
                                </div>
                                <div>
                                    <div className="font-semibold">14-Day Guarantee</div>
                                    <div className="text-sm text-emerald-100">Risk-free trial</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                    <span className="text-2xl">✓</span>
                                </div>
                                <div>
                                    <div className="font-semibold">Expert Support</div>
                                    <div className="text-sm text-emerald-100">Guided every step</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-8 shadow-2xl">
                        <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">Begin Your Journey</h3>
                        <p className="text-gray-600 mb-6">Fill in your details and we'll reach out to create your personalized plan</p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                                />
                            </div>

                            <div>
                                <Input
                                    type="email"
                                    name="email"
                                    placeholder="Your Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                                />
                            </div>

                            <div>
                                <Input
                                    type="tel"
                                    name="phone"
                                    placeholder="Your Phone Number"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                                />
                            </div>

                            <div>
                                <Textarea
                                    name="message"
                                    placeholder="Tell us about your health goals (optional)"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={3}
                                    className="w-full px-4 py-3 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-6 text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
                            >
                                Start Your Transformation
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </form>

                        <p className="text-xs text-gray-500 text-center mt-4">
                            By submitting, you agree to receive communications from WellPro.
                            You can unsubscribe anytime.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};