import React from 'react';

export const OverviewSection = ({ title, description, highlights = [] }) => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-display font-black text-wellpro-navy mb-6 uppercase tracking-tight">
            {title}
          </h2>
          <p className="text-xl text-gray-600 font-sans font-light leading-relaxed max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        {highlights.length > 0 && (
          <div className="grid md:grid-cols-3 gap-8">
            {highlights.map((highlight, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-wellpro-green/5 to-wellpro-blue/5 p-8 rounded-2xl border border-wellpro-green/10 hover:shadow-lg transition-all"
              >
                {highlight.icon && (
                  <div className="w-12 h-12 bg-wellpro-green/20 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl">{highlight.icon}</span>
                  </div>
                )}
                <h3 className="text-xl font-semibold text-wellpro-navy mb-3">
                  {highlight.title}
                </h3>
                <p className="text-gray-600 font-sans font-light leading-relaxed">
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
