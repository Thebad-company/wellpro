import React from 'react';

export const AuthoritySection = () => {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="bg-wellpro-navy rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl border border-white/5">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-wellpro-purple/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-wellpro-blue/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                    <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <span className="text-wellpro-green font-bold text-sm uppercase tracking-[0.2em]">Expertise & Governance</span>
                            <h2 className="text-4xl md:text-5xl font-display font-black leading-tight uppercase tracking-tight">
                                Guided by an Advisory Board of {' '}
                                <span className="text-wellpro-green">Experts</span>
                            </h2>
                            <p className="text-gray-400 text-lg leading-relaxed font-sans font-light">
                                Our protocols are overseen by leading Functional Medicine Doctors, Yoga Experts, 
                                and Clinical Dietitians to ensure surgical precision in health recovery.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            {[
                                { label: "Success Rate", val: "87%", color: "text-wellpro-green" },
                                { label: "Happy Clients", val: "5,000+", color: "text-white" },
                                { label: "Expert Coaches", val: "15+", color: "text-wellpro-blue" },
                                { label: "Global Reach", val: "10+", color: "text-wellpro-orange" }
                            ].map((stat, idx) => (
                                <div key={idx} className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl text-center group hover:bg-white/10 transition-all">
                                    <div className={`text-3xl font-display font-black mb-1 ${stat.color}`}>{stat.val}</div>
                                    <div className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};