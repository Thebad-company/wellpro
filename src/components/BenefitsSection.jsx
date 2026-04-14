import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export const BenefitsSection = ({ title = 'Benefits', benefits = [] }) => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-display font-black text-wellpro-navy mb-6 uppercase tracking-tight">
            {title}
          </h2>
          <p className="text-lg text-gray-600 font-sans font-light max-w-2xl mx-auto">
            Discover the transformative benefits of our comprehensive approach
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group bg-white p-8 rounded-2xl border border-gray-100 hover:border-wellpro-green/30 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle2 className="h-8 w-8 text-wellpro-green group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-wellpro-navy mb-3 group-hover:text-wellpro-green transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 font-sans font-light leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
