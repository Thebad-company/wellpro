import React from 'react';
import { Star, Quote } from 'lucide-react';

export const TestimonialsSection = () => {
    const testimonials = [
        {
            name: "Sarah Mitchell",
            role: "Marketing Executive",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
            rating: 5,
            text: "After years of fatigue and brain fog, WellPro's protocol transformed my life. I lost 15 kg, my energy is incredible, and I feel 10 years younger. The science-backed approach made all the difference.",
            results: "Lost 15kg • Reversed PCOS"
        },
        {
            name: "Rajesh Kumar",
            role: "IT Consultant",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
            rating: 5,
            text: "I was pre-diabetic with high blood pressure. Within 12 weeks on WellPro, my blood sugar normalized and I'm off medication. The breathwork alone changed how I handle stress.",
            results: "Normalized blood sugar • Off medication"
        },
        {
            name: "Priya Sharma",
            role: "Yoga Instructor",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
            rating: 5,
            text: "Even as a health professional, I struggled with hormonal imbalances. WellPro's personalized nutrition and fasting protocol restored my cycle and energy. I recommend it to all my students.",
            results: "Hormonal balance restored • Better sleep"
        }
    ];

    return (
        <section id="testimonials" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="text-emerald-700 font-semibold text-sm uppercase tracking-wider">Real Stories</span>
                    <h2 className="text-5xl font-serif font-bold text-gray-900 mt-4 mb-6">
                        Lives{' '}
                        <span className="italic text-emerald-700">Transformed</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Hear from people who reversed their health conditions naturally
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-gradient-to-br from-stone-50 to-amber-50 p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                        >
                            <Quote className="h-10 w-10 text-emerald-500/30 mb-4" />

                            <div className="flex mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                                ))}
                            </div>

                            <p className="text-gray-700 leading-relaxed mb-6 italic">
                                "{testimonial.text}"
                            </p>

                            <div className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-lg text-sm font-medium mb-6">
                                {testimonial.results}
                            </div>

                            <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                                <img 
                                    src={testimonial.image} 
                                    alt={testimonial.name}
                                    className="w-14 h-14 rounded-full object-cover ring-2 ring-emerald-200"
                                />
                                <div>
                                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
