import React from 'react';
import { Star } from 'lucide-react';

export const TrustSection = () => {
    return (
        <section className="py-16 bg-white border-y border-gray-100">
            <div className="max-w-7xl mx-auto px-6">

                {/* Rating */}
                <div className="text-center mb-12">

                    <div className="flex items-center justify-center gap-2 mb-4">

                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className="h-5 w-5 fill-amber-400 text-amber-400"
                                />
                            ))}
                        </div>

                        <span className="text-gray-600 font-medium">
                            4.9/5 from 2,500+ reviews
                        </span>

                    </div>

                    <p className="text-gray-500 text-lg italic">
                        "Trusted by thousands on their journey to natural wellness"
                    </p>
                </div>

                {/* Trust Categories */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-80">

                    <div className="text-center group">
                        <div className="text-xl font-display font-black text-gray-800 group-hover:text-wellpro-green transition-colors uppercase tracking-tight">
                            Surgical Precision
                        </div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-1 font-bold">Health Monitoring</div>
                    </div>

                    <div className="text-center group">
                        <div className="text-xl font-display font-black text-gray-800 group-hover:text-wellpro-green transition-colors uppercase tracking-tight">
                            Evidence-Based
                        </div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-1 font-bold">Medical Research</div>
                    </div>

                    <div className="text-center group">
                        <div className="text-xl font-display font-black text-gray-800 group-hover:text-wellpro-green transition-colors uppercase tracking-tight">
                            Literature Review
                        </div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-1 font-bold">Intense Protocols</div>
                    </div>

                    <div className="text-center group">
                        <div className="text-xl font-display font-black text-gray-800 group-hover:text-wellpro-green transition-colors uppercase tracking-tight">
                            Global Standards
                        </div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-1 font-bold">Wellness Ecosystem</div>
                    </div>

                </div>

            </div>
        </section>
    );
};