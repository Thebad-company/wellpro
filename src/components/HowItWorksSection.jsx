import React from 'react';
import { ClipboardCheck, Target, Sparkles } from 'lucide-react';

export const HowItWorksSection = () => {
    const steps = [
        {
            icon: ClipboardCheck,
            title: "Medical Research",
            description: "Intense review of medical literature to identify biological pathways for lifestyle disorder reversal."
        },
        {
            icon: Target,
            title: "Specialized Protocols",
            description: "Implementation of evidenced-backed tools like PIFD and Soleus Activation targeting metabolic root causes."
        },
        {
            icon: Sparkles,
            title: "Surgical Precision",
            description: "Continuous monitoring and expert guidance to achieve rejuvenation, vitality, and longevity."
        }
    ];

    return (
        <section id="how-it-works" className="py-24 bg-white relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="text-wellpro-green font-bold text-sm uppercase tracking-[0.2em]">The Process</span>
                    <h2 className="text-5xl font-display font-black text-gray-900 mt-4 mb-6 uppercase tracking-tight">
                        Your Journey to{ ' ' }
                        <span className="text-wellpro-green">Holistic</span> Health
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-12 relative">
                    <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-emerald-100 via-emerald-200 to-emerald-100 -translate-y-1/2 z-0"></div>
                    
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <div key={index} className="relative z-10 flex flex-col items-center text-center group">
                                <div className="w-20 h-20 bg-white rounded-full shadow-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border-4 border-emerald-50">
                                    <Icon className="h-10 w-10 text-emerald-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                                <p className="text-gray-600 leading-relaxed max-w-xs">{step.description}</p>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-20 bg-emerald-50 rounded-3xl p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="space-y-4 text-center md:text-left">
                        <h4 className="text-2xl font-serif font-bold text-gray-900 italic">"The best time to start was yesterday. The second best time is now."</h4>
                        <p className="text-gray-600">Start your assessment today and discover what's possible.</p>
                    </div>
                    <button className="whitespace-nowrap bg-wellpro-green hover:bg-emerald-700 text-white px-10 py-5 rounded-full font-bold shadow-xl transition-all transform hover:scale-105 uppercase tracking-wide">
                        Begin Consultation
                    </button>
                </div>
            </div>
        </section>
    );
};
