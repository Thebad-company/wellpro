import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ContentStore } from '../services/content/ContentStore';
import { OverviewSection } from '../components/OverviewSection';
import { BenefitsSection } from '../components/BenefitsSection';
import { TimelineSection } from '../components/TimelineSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { CTASection } from '../components/CTASection';

const contentStore = new ContentStore();

export const ProgramPage = () => {
  const { programId } = useParams();
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        setLoading(true);
        const data = await contentStore.getProgram(programId);
        setProgram(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching program:', err);
        setError('Failed to load program information');
      } finally {
        setLoading(false);
      }
    };

    if (programId) {
      fetchProgram();
    }
  }, [programId]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-24 bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-wellpro-green"></div>
          <p className="mt-4 text-gray-600 font-sans">Loading program information...</p>
        </div>
      </div>
    );
  }

  if (error || !program) {
    return (
      <div className="min-h-screen pt-32 pb-24 bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-display font-black text-wellpro-navy mb-4">
            {error || 'Program not found'}
          </h2>
          <p className="text-gray-600 font-sans">Please try again or contact support.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 bg-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 mb-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-wellpro-green font-bold text-sm uppercase tracking-[0.3em] bg-wellpro-green/10 px-6 py-2 rounded-full">
              Wellness Program
            </span>
            <h1 className="text-6xl md:text-7xl font-display font-black text-wellpro-navy mt-8 mb-6 uppercase tracking-tight">
              {program.name}
            </h1>
            <p className="text-xl text-gray-600 font-sans font-light leading-relaxed mb-10">
              {program.description}
            </p>
            {program.targetAudience && (
              <p className="text-lg text-gray-700 font-sans mb-10">
                <span className="font-semibold text-wellpro-green">Target Audience:</span> {program.targetAudience}
              </p>
            )}
          </div>
          {program.image && (
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl">
              <img
                src={program.image}
                alt={program.name}
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-wellpro-navy/30 to-transparent"></div>
            </div>
          )}
        </div>
      </div>

      {/* Overview Section */}
      {program.overview && (
        <OverviewSection
          title="Program Overview"
          description={program.overview}
          highlights={program.highlights || []}
        />
      )}

      {/* Program Components Section */}
      {program.components && program.components.length > 0 && (
        <div className="py-24 bg-gradient-to-br from-gray-50 to-stone-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-display font-black text-wellpro-navy mb-6 uppercase tracking-tight">
                Program Components
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {program.components.map((component, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100"
                >
                  <h3 className="text-xl font-semibold text-wellpro-navy mb-3">
                    {component.title}
                  </h3>
                  <p className="text-gray-600 font-sans font-light leading-relaxed mb-4">
                    {component.description}
                  </p>
                  {component.protocols && component.protocols.length > 0 && (
                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-sm font-semibold text-wellpro-green mb-2">Protocols:</p>
                      <ul className="space-y-1">
                        {component.protocols.map((protocol, idx) => (
                          <li key={idx} className="text-sm text-gray-600 font-sans">
                            • {protocol}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Timeline Section */}
      {program.timeline && program.timeline.phases && program.timeline.phases.length > 0 && (
        <TimelineSection
          title="Program Timeline"
          phases={program.timeline.phases}
        />
      )}

      {/* Expected Outcomes Section */}
      {program.expectedOutcomes && program.expectedOutcomes.length > 0 && (
        <BenefitsSection
          title="Expected Outcomes"
          benefits={program.expectedOutcomes}
        />
      )}

      {/* Testimonials Section */}
      {program.testimonials && program.testimonials.length > 0 && (
        <TestimonialsSection />
      )}

      {/* CTA Section */}
      <CTASection
        title="Ready to Transform Your Health?"
        description="Join our comprehensive wellness program and start your journey to better health today."
        buttonText="Enroll Now"
        buttonLink="/programs"
        secondaryButtonText="Schedule Consultation"
        secondaryButtonLink="#"
      />
    </div>
  );
};
