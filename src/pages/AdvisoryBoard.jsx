import React from 'react';
import { Shield, Award, BookOpen, Heart, Activity } from 'lucide-react';

const ExpertCard = ({ name, title, role, bio, image, specialties, index }) => (
    <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-0 items-stretch`}>
        {/* Image Section */}
        <div className="md:w-1/2 relative overflow-hidden rounded-3xl shadow-xl group">
            <img 
                src={image} 
                alt={name} 
                className="w-full h-full object-cover min-h-[500px] group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-wellpro-navy/40 via-transparent to-transparent"></div>
        </div>

        {/* Content Section */}
        <div className="md:w-1/2 bg-white p-12 md:p-16 flex flex-col justify-center rounded-3xl shadow-lg">
            <div className="space-y-6">
                <div>
                    <span className="text-wellpro-green font-bold text-sm uppercase tracking-widest inline-block mb-3">
                        {role}
                    </span>
                    <h3 className="text-4xl md:text-5xl font-display font-black text-wellpro-navy mb-3 uppercase tracking-tight">
                        {name}
                    </h3>
                    <p className="text-xl font-bold text-wellpro-green uppercase tracking-wider">
                        {title}
                    </p>
                </div>

                <p className="text-lg text-gray-600 font-sans font-light leading-relaxed">
                    {bio}
                </p>

                <div className="pt-6 border-t border-gray-200">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Specialties</p>
                    <div className="grid grid-cols-2 gap-4">
                        {specialties.map((spec, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-wellpro-green rounded-full"></div>
                                <span className="font-semibold text-wellpro-navy text-sm">{spec}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export const AdvisoryBoard = () => {
    const experts = [
        {
            name: "Dr. Alok Chopra",
            role: "Chairman",
            title: "Internal Medicine & Functional Wellness",
            bio: "A pioneer in Functional Medicine with over 40 years of experience, Dr. Chopra focuses on reversing lifestyle disorders through cellular-level intervention and metabolic optimization.",
            image: "/doctors/dr-alok.webp",
            specialties: ["Functional Medicine", "Cardio-Metabolic Health", "Hormonal Balance"]
        },
        {
            name: "Dr. Sanjay Sachdeva",
            role: "Co-Chairman",
            title: "Renowned ENT & Skull Base Surgeon",
            bio: "A globally recognized surgeon with a passion for integrating surgical precision with lifestyle-driven recovery protocols for complex autoimmune and metabolic conditions.",
            image: "/doctors/dr-sanjay.webp",
            specialties: ["Skull Base Surgery", "Clinical Governance", "Ecosystem Strategy"]
        },
        {
            name: "Dr. Raju Hajela",
            role: "Advisory Board Member",
            title: "Expert in Addiction & Lifestyle Behavioral Medicine",
            bio: "Specializing in the behavioral aspects of chronic conditions, Dr. Hajela provides the psychological framework necessary for long-term lifestyle reversal and mental vitality.",
            image: "/doctors/dr-raju.webp",
            specialties: ["Addictive Medicine", "Mental Wellness", "Behavioral Strategy"]
        }
    ];

    return (
        <div className="min-h-screen pt-32 pb-24 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Header */}
                <div className="text-center mb-24">
                    <span className="text-wellpro-green font-bold text-sm uppercase tracking-[0.3em] bg-wellpro-green/10 px-6 py-2 rounded-full inline-block">Medical Governance</span>
                    <h1 className="text-6xl md:text-7xl font-display font-black text-wellpro-navy mt-8 mb-8 uppercase tracking-tight">
                        Our Advisory <span className="text-wellpro-green">Board</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-4xl mx-auto font-sans font-light leading-relaxed">
                        An elite assembly of medical pioneers, clinical experts, and functional medicine 
                        specialists dedicated to engineering the future of healthcare.
                    </p>
                </div>

                {/* Experts List */}
                <div className="space-y-16">
                    {experts.map((expert, idx) => (
                        <ExpertCard key={idx} {...expert} index={idx} />
                    ))}
                </div>

                {/* Board Mission */}
                <div className="mt-32 grid md:grid-cols-3 gap-8">
                    {[
                        { icon: Shield, title: "Clinical Rigour", desc: "Every protocol is vetted through established medical frameworks and evidence-based journals." },
                        { icon: BookOpen, title: "Ongoing Research", desc: "The board oversees longitudinal studies on Soleus Activation and Glucose Clearance." },
                        { icon: Activity, title: "Precision First", desc: "Medical intervention starts at the cellular level, ensuring surgical-precision in recovery." }
                    ].map((item, idx) => (
                        <div key={idx} className="bg-white p-10 rounded-3xl border border-gray-100 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2">
                            <div className="w-14 h-14 bg-wellpro-orange/10 rounded-2xl flex items-center justify-center mb-6">
                                <item.icon className="h-8 w-8 text-wellpro-orange" />
                            </div>
                            <h4 className="text-xl font-display font-black text-wellpro-navy mb-4 uppercase tracking-tight">{item.title}</h4>
                            <p className="text-gray-600 font-sans font-light text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
