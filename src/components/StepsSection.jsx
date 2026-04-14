import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const StepsSection = ({ title = 'Implementation Steps', steps = [] }) => {
  const [expandedStep, setExpandedStep] = useState(null);

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-stone-100">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-display font-black text-wellpro-navy mb-6 uppercase tracking-tight">
            {title}
          </h2>
        </div>

        <div className="space-y-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all"
            >
              <button
                onClick={() => setExpandedStep(expandedStep === index ? null : index)}
                className="w-full p-8 flex items-start gap-6 hover:bg-gray-50 transition-colors text-left"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-wellpro-green text-white rounded-full flex items-center justify-center font-display font-black text-lg">
                    {step.number || index + 1}
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-wellpro-navy mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 font-sans font-light">
                    {step.description}
                  </p>
                </div>

                {step.details && (
                  <ChevronDown
                    className={`h-6 w-6 text-wellpro-green shrink-0 transition-transform ${
                      expandedStep === index ? 'rotate-180' : ''
                    }`}
                  />
                )}
              </button>

              {step.details && expandedStep === index && (
                <div className="px-8 pb-8 border-t border-gray-100 bg-gray-50">
                  <p className="text-gray-700 font-sans font-light leading-relaxed">
                    {step.details}
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
