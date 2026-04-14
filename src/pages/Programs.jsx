import React from 'react';
import { Button } from '../components/ui/button';
import { CheckCircle2, ArrowRight, Shield, Clock, Zap } from 'lucide-react';

const ProgramCard = ({ title, price, period, features, color, popular }) => (
    <div className={`relative bg-white rounded-[2.5rem] p-10 border transition-all duration-500 overflow-hidden group hover:shadow-2xl hover:-translate-y-2 ${popular ? 'border-wellpro-green shadow-xl ring-1 ring-wellpro-green/20' : 'border-gray-100 shadow-lg'}`}>
        {popular && (
            <div className="absolute top-6 right-6 bg-wellpro-green text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest shadow-lg">
                Most Popular
            </div>
        )}
        
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-10 group-hover:scale-110 transition-transform shadow-lg`}>
            <Zap className="h-8 w-8 text-white" />
        </div>

        <h3 className="text-3xl font-display font-black text-wellpro-navy mb-4 uppercase tracking-tight">{title}</h3>
        
        <div className="flex items-baseline gap-2 mb-8">
            <span className="text-5xl font-display font-black text-wellpro-navy">₹{price}</span>
            <span className="text-gray-500 font-sans font-medium uppercase tracking-widest text-sm">{period}</span>
        </div>

        <ul className="space-y-4 mb-10">
            {features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-wellpro-green shrink-0" />
                    <span className="text-gray-600 font-sans leading-relaxed">{feature}</span>
                </li>
            ))}
        </ul>

        <Button className={`w-full py-8 rounded-full text-lg font-bold transition-all ${popular ? 'bg-wellpro-green hover:bg-emerald-600 text-white shadow-lg' : 'bg-gray-50 hover:bg-gray-100 text-wellpro-navy border border-gray-200'}`}>
            Buy Program
        </Button>
    </div>
);

export const Programs = () => {
    const programs = [
        {
            title: "PCOD Control",
            price: "1,999",
            period: "/ Program",
            color: "from-wellpro-orange to-orange-600",
            features: [
                "Tailored Diet & Exercise Protocol",
                "Metabolic Root Cause Analysis",
                "Hormonal Balance Optimization",
                "Weekly Expert Progress Check",
                "Direct Access to Dietitians"
            ]
        },
        {
            title: "Diabetes Assist",
            price: "15,000",
            period: "/ Full Kit",
            popular: true,
            color: "from-wellpro-green to-emerald-600",
            features: [
                "Smart CGM Monitoring Unit",
                "Soleus Activation Training Kit",
                "Physician-led reversal roadmap",
                "HBA1c Predictive Analytics",
                "24/7 WhatsApp Medical Support",
                "Precision Nutraceutical Bundle"
            ]
        },
        {
            title: "Vitality Max",
            price: "8,500",
            period: "/ Month",
            color: "from-wellpro-blue to-sky-600",
            features: [
                "Biological Age Assessment",
                "Personalized Longevity Stack",
                "Wearable Device Integration",
                "Cellular Rejuvenation Protocol",
                "Quarterly Biomarker Testing"
            ]
        }
    ];

    return (
        <div className="min-h-screen pt-32 pb-24 bg-stone-50">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Header */}
                <div className="text-center mb-20">
                    <span className="text-wellpro-green font-bold text-sm uppercase tracking-[0.3em] bg-wellpro-green/10 px-6 py-2 rounded-full border border-wellpro-green/20">The Ecosystem</span>
                    <h1 className="text-6xl md:text-7xl font-display font-black text-wellpro-navy mt-10 mb-8 uppercase tracking-tight">
                        Our Reversal <span className="text-wellpro-green">Programs</span>
                    </h1>
                    <p className="text-2xl text-gray-500 max-w-3xl mx-auto font-sans font-light leading-relaxed">
                        Surgical-precision wellness protocols designed for rapid metabolic recovery 
                        and long-term lifestyle disorder reversal.
                    </p>
                </div>

                {/* Programs Grid */}
                <div className="grid lg:grid-cols-3 gap-8 items-start">
                    {programs.map((prog, idx) => (
                        <ProgramCard key={idx} {...prog} />
                    ))}
                </div>

                {/* Trust Footer */}
                <div className="mt-24 bg-wellpro-navy rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-wellpro-green/10 rounded-full blur-[100px] animate-pulse"></div>
                    
                    <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-display font-black mb-6 uppercase tracking-tight">Expert Consultation <br/>Included</h2>
                            <p className="text-xl text-gray-400 font-sans font-light leading-relaxed mb-8">
                                Not sure which program fits your markers? Talk to our medical assessment 
                                team for a free precision screening.
                            </p>
                            <Button className="bg-wellpro-green text-white px-10 py-7 text-lg rounded-full font-bold hover:bg-emerald-600 transition-all shadow-xl">
                                Book Free Screening
                            </Button>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-6">
                            {[
                                { icon: Shield, text: "Clinical Grade" },
                                { icon: Clock, text: "Rapid Results" },
                                { icon: CheckCircle2, text: "Certified Labs" },
                                { icon: Zap, text: "Natural Process" }
                            ].map((item, idx) => (
                                <div key={idx} className="bg-white/5 border border-white/10 p-6 rounded-3xl flex flex-col items-center text-center">
                                    <item.icon className="h-8 w-8 text-wellpro-green mb-4" />
                                    <span className="font-bold tracking-wide uppercase text-sm">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
