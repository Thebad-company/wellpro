import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, Play } from 'lucide-react';

export const HeroSection = () => {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-white text-wellpro-navy">

            {/* Background Glows */}
            <div className="absolute top-20 right-10 w-96 h-96 bg-wellpro-purple/5 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-20 left-10 w-80 h-80 bg-wellpro-blue/5 rounded-full blur-[100px] animate-pulse"></div>

            <div className="max-w-7xl mx-auto px-6 py-32 grid md:grid-cols-2 gap-12 items-center relative z-10">

                {/* Left Content */}
                <div className="space-y-8">

                    <div className="inline-block px-4 py-2 bg-wellpro-green/10 rounded-full text-wellpro-green text-sm font-semibold border border-wellpro-green/10 mb-2">
                        ✨ REJUVENATION • VITALITY • LONGEVITY
                    </div>

                    <h1 className="text-6xl md:text-7xl font-display font-black leading-tight uppercase tracking-tight text-wellpro-navy">
                        The First Ecosystem on{' '}
                        <span className="text-wellpro-green drop-shadow-sm">Health Solutions.</span>
                    </h1>

                    <p className="text-xl text-gray-600 font-sans leading-relaxed max-w-xl font-light">
                        Reversing lifestyle disorders naturally through evidence-based tools, 
                        expert protocols, and surgical-precision health monitoring.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-5 pt-4">

                        <Button
                            size="lg"
                            className="bg-wellpro-green hover:bg-emerald-600 text-white px-10 py-7 text-lg rounded-full shadow-[0_0_20px_rgba(122,193,67,0.3)] hover:shadow-[0_0_30px_rgba(122,193,67,0.5)] transition-all font-bold tracking-wide"
                        >
                            Start Your Journey
                        </Button>

                        <Button
                            size="lg"
                            variant="outline"
                            className="border-2 border-wellpro-navy/20 hover:border-wellpro-orange bg-transparent text-wellpro-navy px-10 py-7 text-lg rounded-full group transition-all font-bold"
                        >
                            <Play className="mr-2 h-5 w-5 text-wellpro-orange group-hover:scale-125 transition-transform" />
                            How It Works
                        </Button>

                    </div>

                    {/* Stats */}
                    <div className="flex gap-12 pt-10 border-t border-gray-100">

                        <div>
                            <div className="text-4xl font-display font-black text-wellpro-navy">5,000+</div>
                            <div className="text-xs text-gray-500 uppercase tracking-widest mt-1 font-bold">Lives Transformed</div>
                        </div>

                        <div>
                            <div className="text-4xl font-display font-black text-wellpro-green">87%</div>
                            <div className="text-xs text-gray-500 uppercase tracking-widest mt-1 font-bold">Success Rate</div>
                        </div>

                        <div>
                            <div className="text-4xl font-display font-black text-wellpro-orange">100%</div>
                            <div className="text-xs text-gray-500 uppercase tracking-widest mt-1 font-bold">Natural Methods</div>
                        </div>

                    </div>

                </div>

                {/* Right Image */}
                <div className="relative">

                    <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                        <img
                            src="https://images.unsplash.com/photo-1695795910772-6336b0beba36?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwzfHx3ZWxsbmVzcyUyMG1lZGl0YXRpb258ZW58MHx8fHwxNzc2MDc0MjQwfDA&ixlib=rb-4.1.0&q=85"
                            alt="Wellness meditation by river"
                            className="w-full h-[600px] object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/10 to-transparent"></div>
                    </div>

                    {/* Floating Card */}
                    <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl backdrop-blur-sm">

                        <div className="flex items-center gap-4">

                            <div className="w-12 h-12 bg-wellpro-green rounded-full flex items-center justify-center text-white text-xl font-bold">
                                ✓
                            </div>

                            <div>
                                <div className="font-semibold text-gray-900">Natural Healing</div>
                                <div className="text-sm text-gray-600">Science-backed protocols</div>
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
};