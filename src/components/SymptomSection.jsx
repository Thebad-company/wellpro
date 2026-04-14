import React from 'react';
import { AlertCircle } from 'lucide-react';

export const SymptomSection = ({ title = 'Symptoms & Markers', symptoms = [] }) => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-display font-black text-wellpro-navy mb-6 uppercase tracking-tight">
            {title}
          </h2>
          <p className="text-lg text-gray-600 font-sans font-light max-w-2xl mx-auto">
            Recognize the key indicators and symptoms to watch for
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {symptoms.map((symptom, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-red-200 transform hover:-translate-y-2"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-red-100 to-orange-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>

              <h3 className="text-xl font-semibold text-wellpro-navy mb-3 group-hover:text-red-600 transition-colors">
                {symptom.title}
              </h3>

              <p className="text-gray-600 font-sans font-light leading-relaxed">
                {symptom.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
