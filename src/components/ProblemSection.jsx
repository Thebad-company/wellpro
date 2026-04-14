import React from 'react';
import { Zap, Brain, Heart, TrendingDown } from 'lucide-react';

export const ProblemSection = () => {
    const problems = [
        {
            icon: Zap,
            title: "Low Energy",
            description:
                "Constant fatigue despite rest, struggling through daily tasks",
        },
        {
            icon: Brain,
            title: "Mental Fog",
            description:
                "Difficulty focusing, memory issues, and reduced mental clarity",
        },
        {
            icon: Heart,
            title: "Chronic Stress",
            description:
                "Overwhelmed nervous system, anxiety, and burnout",
        },
        {
            icon: TrendingDown,
            title: "Slow Metabolism",
            description:
                "Weight gain, digestive issues, and hormonal imbalance",
        },
    ];

    return (
        <section className="py-24 bg-gradient-to-br from-gray-50 to-stone-100">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-16">
                    <span className="text-wellpro-green font-bold text-sm uppercase tracking-[0.2em]">
                        The Global Epidemic
                    </span>

                    <h2 className="text-5xl font-display font-black text-gray-900 mt-4 mb-6 uppercase tracking-tight">
                        Modern Lifestyle is {' '}
                        <span className="text-wellpro-red">Broken</span>
                    </h2>

                    <p className="text-xl text-gray-500 max-w-3xl mx-auto font-sans font-light">
                        Global surges in Diabetes, PCOD, Obesity, and Hypertension aren't 
                        accidental—they are cellular malfunctions that can be reversed.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {problems.map((problem, index) => {
                        const Icon = problem.icon;

                        return (
                            <div
                                key={index}
                                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                            >
                                <div className="w-14 h-14 bg-gradient-to-br from-red-100 to-orange-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <Icon className="h-7 w-7 text-red-600" />
                                </div>

                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    {problem.title}
                                </h3>

                                <p className="text-gray-600 leading-relaxed">
                                    {problem.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Quote */}
                <div className="mt-16 text-center">
                    <p className="text-2xl font-serif text-gray-700 italic max-w-2xl mx-auto">
                        "Your body has the power to heal—it just needs the right environment."
                    </p>
                </div>

            </div>
        </section>
    );
};