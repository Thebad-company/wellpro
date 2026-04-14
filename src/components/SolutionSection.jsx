import React from 'react';
import { Leaf, Clock, Zap } from 'lucide-react';

export const SolutionSection = () => {
    const pillars = [
        {
            icon: Leaf,
            title: "Herbal Nutraceuticals",
            description: "50+ medical-grade formulations designed for cellular-level recovery and rejuvenation.",
            image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwyfHxoZWFsdGh5JTIwbnV0cml0aW9ufGVufDB8fHx8MTc3NjA3NDI0M3ww&ixlib=rb-4.1.0&q=85",
            color: "from-emerald-500 to-green-600"
        },
        {
            icon: Clock,
            title: "PIFD Protocol",
            description: "Personalized Intermittent Fasting Diet tailored to your biological markers and lifestyle goals.",
            image: "https://images.unsplash.com/photo-1670164747721-d3500ef757a6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwzfHxoZWFsdGh5JTIwbnV0cml0aW9ufGVufDB8fHx8MTc3NjA3NDI0M3ww&ixlib=rb-4.1.0&q=85",
            color: "from-amber-500 to-orange-600"
        },
        {
            icon: Zap,
            title: "Soleus Activation",
            description: "Breakthrough physiological tool for non-invasive blood glucose management and metabolic boosting.",
            image: "https://images.unsplash.com/photo-1716284130499-2c7c04d1dc96?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODh8MHwxfHNlYXJjaHwzfHxicmVhdGh3b3JrJTIwbWVkaXRhdGlvbnxlbnwwfHx8fDE3NzYwNzQyNDZ8MA&ixlib=rb-4.1.0&q=85",
            color: "from-sky-500 to-blue-600"
        }
    ];

    return (
        <section id="solutions" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="text-wellpro-green font-bold text-sm uppercase tracking-[0.2em]">The WellPro Method</span>
                    <h2 className="text-5xl font-display font-black text-gray-900 mt-4 mb-6 uppercase tracking-tight">
                        Three Pillars of{' '}
                        <span className="text-wellpro-green">Transformation</span>
                    </h2>
                    <p className="text-xl text-gray-500 max-w-3xl mx-auto font-sans font-light">
                        Our ecosystem Addresses the root causes of lifestyle disorders 
                        through surgical-precision protocols and medical-grade monitoring.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {pillars.map((pillar, index) => {
                        const Icon = pillar.icon;
                        return (
                            <div
                                key={index}
                                className="group relative overflow-hidden rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-500"
                            >
                                <div className="absolute inset-0">
                                    <img 
                                        src={pillar.image} 
                                        alt={pillar.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-wellpro-navy via-wellpro-navy/80 to-transparent"></div>
                                </div>

                                <div className="relative p-10 min-h-[450px] flex flex-col justify-end">
                                    <div className={`w-16 h-16 bg-gradient-to-br ${pillar.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                                        <Icon className="h-8 w-8 text-white" />
                                    </div>
                                    <h3 className="text-3xl font-display font-black text-white mb-4 uppercase tracking-tight">{pillar.title}</h3>
                                    <p className="text-gray-300 leading-relaxed font-sans font-light">{pillar.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};