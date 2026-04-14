import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const ParametersSection = ({ title = 'Assessment Parameters', parameters = [] }) => {
  const [expandedParam, setExpandedParam] = useState(null);

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-display font-black text-wellpro-navy mb-6 uppercase tracking-tight">
            {title}
          </h2>
          <p className="text-lg text-gray-600 font-sans font-light max-w-2xl mx-auto">
            Understanding the 12 key parameters that define your wellness status
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {parameters.map((param, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-100 hover:border-wellpro-green/30 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <button
                onClick={() => setExpandedParam(expandedParam === index ? null : index)}
                className="w-full p-6 flex items-start gap-4 hover:bg-wellpro-green/5 transition-colors text-left"
              >
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-wellpro-green text-white rounded-lg flex items-center justify-center font-display font-bold text-sm">
                    {param.number || index + 1}
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-wellpro-navy mb-1">
                    {param.title}
                  </h3>
                  <p className="text-sm text-gray-600 font-sans font-light">
                    {param.description}
                  </p>
                </div>

                <ChevronDown
                  className={`h-5 w-5 text-wellpro-green shrink-0 transition-transform ${
                    expandedParam === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {param.relevance && expandedParam === index && (
                <div className="px-6 pb-6 border-t border-wellpro-green/10 bg-wellpro-green/5">
                  <p className="text-gray-700 font-sans font-light leading-relaxed">
                    <span className="font-semibold text-wellpro-navy">Relevance: </span>
                    {param.relevance}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
