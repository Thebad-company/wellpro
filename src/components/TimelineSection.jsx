import React from 'react';

export const TimelineSection = ({ title = 'Program Timeline', phases = [] }) => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-display font-black text-wellpro-navy mb-6 uppercase tracking-tight">
            {title}
          </h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-wellpro-green to-wellpro-blue"></div>

          <div className="space-y-12">
            {phases.map((phase, index) => (
              <div
                key={index}
                className={`flex gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Content */}
                <div className="flex-1 md:w-1/2">
                  <div className="bg-gradient-to-br from-wellpro-green/5 to-emerald-50 p-8 rounded-2xl border border-wellpro-green/10 hover:shadow-lg transition-all">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-sm font-bold text-wellpro-green uppercase tracking-widest">
                        Phase {phase.number || index + 1}
                      </span>
                      {phase.duration && (
                        <span className="text-sm text-gray-600 font-sans font-light">
                          • {phase.duration}
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl font-semibold text-wellpro-navy mb-4">
                      {phase.title}
                    </h3>

                    {phase.objectives && (
                      <ul className="space-y-3">
                        {phase.objectives.map((objective, idx) => (
                          <li key={idx} className="flex gap-3 items-start">
                            <span className="text-wellpro-green font-bold mt-1">✓</span>
                            <span className="text-gray-700 font-sans font-light">
                              {objective}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* Timeline dot */}
                <div className="hidden md:flex flex-1 md:w-0 justify-center">
                  <div className="w-6 h-6 bg-wellpro-green rounded-full border-4 border-white shadow-lg"></div>
                </div>

                {/* Empty space for alternating layout */}
                <div className="hidden md:block flex-1 md:w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
