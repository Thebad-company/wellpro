import React from 'react';
import { Button } from '../components/ui/button';
import { Shield, Activity, Microscope, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const DisorderPage = ({ title, subtitle, overview, symptoms, protocol, image }) => {
    return (
        <div className="min-h-screen pt-32 pb-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Hero */}
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
                    <div>
                        <span className="text-wellpro-green font-bold text-sm uppercase tracking-[0.3em] bg-wellpro-green/10 px-6 py-2 rounded-full">Disorder Analysis</span>
                        <h1 className="text-6xl md:text-7xl font-display font-black text-wellpro-navy mt-8 mb-6 uppercase tracking-tight">{title}</h1>
                        <h2 className="text-3xl font-display font-medium text-wellpro-green mb-8">{subtitle}</h2>
                        <p className="text-xl text-gray-600 font-sans font-light leading-relaxed mb-10">
                            {overview}
                        </p>
                        <Link to="/programs">
                            <Button className="bg-wellpro-green text-white px-10 py-7 text-lg rounded-full font-bold hover:bg-emerald-600 transition-all shadow-xl">
                                Join Reversal Program
                            </Button>
                        </Link>
                    </div>
                    <div className="relative rounded-[3rem] overflow-hidden shadow-2xl">
                        <img src={image} alt={title} className="w-full h-[500px] object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-wellpro-navy/30 to-transparent"></div>
                    </div>
                </div>

                {/* Symptoms & Approach */}
                <div className="grid md:grid-cols-2 gap-12 mb-24">
                    <div className="bg-stone-50 p-12 rounded-[3rem] border border-gray-100">
                        <h3 className="text-3xl font-display font-black text-wellpro-navy mb-10 uppercase tracking-tight">Symptoms & <span className="text-wellpro-orange">Markers</span></h3>
                        <ul className="space-y-6">
                            {symptoms.map((item, idx) => (
                                <li key={idx} className="flex gap-4 items-start">
                                    <div className="w-2 h-2 rounded-full bg-wellpro-orange mt-3 shrink-0" />
                                    <span className="text-lg text-gray-700 font-sans font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-wellpro-navy p-12 rounded-[3rem] text-white">
                        <h3 className="text-3xl font-display font-black mb-10 uppercase tracking-tight text-wellpro-green">The WellPro <br/>Approach</h3>
                        <div className="space-y-8">
                            {protocol.map((step, idx) => (
                                <div key={idx} className="flex gap-6">
                                    <CheckCircle2 className="h-8 w-8 text-wellpro-green shrink-0" />
                                    <div>
                                        <h4 className="text-xl font-bold uppercase tracking-wide mb-2">{step.title}</h4>
                                        <p className="text-gray-400 font-sans font-light leading-relaxed">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center py-20 bg-wellpro-green/5 rounded-[3rem] border border-wellpro-green/10">
                    <h2 className="text-4xl font-display font-black text-wellpro-navy mb-6 uppercase tracking-tight">Start Your Reversal Journey</h2>
                    <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto">Get a personalized clinical assessment to understand your markers.</p>
                    <div className="flex justify-center gap-6">
                        <Button className="bg-wellpro-navy text-white px-10 py-7 rounded-full font-bold">Free Consultation</Button>
                        <Button variant="outline" className="border-2 border-wellpro-navy/20 px-10 py-7 rounded-full font-bold">Download Guide</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const PCODPage = () => (
    <DisorderPage 
        title="PCOD"
        subtitle="Hormonal Balance Reimagined"
        overview="PCOD isn't just about weight—it's about the biological ecosystem of your body. Our approach addresses insulin resistance and hormonal signaling at the cellular level."
        image="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwyfHxoZWFsdGh5JTIwd29tYW58ZW58MHx8fHwxNzc2MDczOTI0fDA&ixlib=rb-4.1.0&q=85"
        symptoms={[
            "Irregular Menstrual Cycles",
            "Insulin Resistance & Weight Gain",
            "Hair Thinning or Facial Hair",
            "Hormonal Acne & Skin Changes",
            "Fatigue & Mood Fluctuations"
        ]}
        protocol={[
            { title: "Metabolic Correction", desc: "Using Soleus Activation to clear excess glucose and improve insulin sensitivity." },
            { title: "Hormonal Stack", desc: "Customized nutraceuticals to balance androgens and support ovarian health." },
            { title: "Circadian Syncing", desc: "Aligning sleep and meal timings with your natural biological clock." }
        ]}
    />
);

export const DiabetesPage = () => (
    <DisorderPage 
        title="Diabetes"
        subtitle="Precision Metabolic Reversal"
        overview="Advanced Type-2 Diabetes reversal focused on surgical-precision monitoring and non-invasive metabolic tools like Soleus Activation."
        image="https://images.unsplash.com/photo-1579154235602-3c2c299e0831?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwzfHxkaWFiZXRlc3xlbnwwfHx8fDE3NzYwODQyOTB8MA&ixlib=rb-4.1.0&q=85"
        symptoms={[
            "High HbA1c Levels (>6.5%)",
            "Chronic Fatigue & Brain Fog",
            "Frequent Urination & Thirst",
            "Slow Wound Healing",
            "Blurred Vision or Tingling"
        ]}
        protocol={[
            { title: "Smart CGM Tracking", desc: "Real-time glucose monitoring to understand food-specific metabolic responses." },
            { title: "Soleus Activation", desc: "Doubling oxidative metabolism through non-invasive physiological triggers." },
            { title: "Surgical-Precision Diet", desc: "Eliminating spikes through personalized intermittent fasting and nutrient stacking." }
        ]}
    />
);
