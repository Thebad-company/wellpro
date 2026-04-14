import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ContentStore } from '../services/content/ContentStore';
import { OverviewSection } from '../components/OverviewSection';
import { BenefitsSection } from '../components/BenefitsSection';
import { StepsSection } from '../components/StepsSection';
import { CTASection } from '../components/CTASection';

const contentStore = new ContentStore();

export const ProtocolPage = () => {
  const { protocolId } = useParams();
  const [protocol, setProtocol] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProtocol = async () => {
      try {
        setLoading(true);
        const data = await contentStore.getProtocol(protocolId);
        setProtocol(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching protocol:', err);
        setError('Failed to load protocol information');
      } finally {
        setLoading(false);
      }
    };

    if (protocolId) {
      fetchProtocol();
    }
  }, [protocolId]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-24 bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-wellpro-green"></div>
          <p className="mt-4 text-gray-600 font-sans">Loading protocol information...</p>
        </div>
      </div>
    );
  }

  if (error || !protocol) {
    return (
      <div className="min-h-screen pt-32 pb-24 bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-display font-black text-wellpro-navy mb-4">
            {error || 'Protocol not found'}
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
              Wellness Protocol
            </span>
            <h1 className="text-6xl md:text-7xl font-display font-black text-wellpro-navy mt-8 mb-6 uppercase tracking-tight">
              {protocol.name}
            </h1>
            <p className="text-xl text-gray-600 font-sans font-light leading-relaxed mb-10">
              {protocol.description}
            </p>
            {protocol.difficulty && (
              <p className="text-lg text-gray-700 font-sans mb-10">
                <span className="font-semibold text-wellpro-green">Difficulty Level:</span> {protocol.difficulty}
              </p>
            )}
          </div>
          {protocol.image && (
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl">
              <img
                src={protocol.image}
                alt={protocol.name}
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-wellpro-navy/30 to-transparent"></div>
            </div>
          )}
        </div>
      </div>

      {/* Overview Section */}
      {protocol.overview && (
        <OverviewSection
          title="Protocol Overview"
          description={protocol.overview}
          highlights={protocol.highlights || []}
        />
      )}

      {/* Scientific Basis Section */}
      {protocol.scientificBasis && (
        <div className="py-24 bg-gradient-to-br from-gray-50 to-stone-100">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-display font-black text-wellpro-navy mb-6 uppercase tracking-tight">
                Scientific Basis
              </h2>
            </div>
            <div className="bg-white p-12 rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-lg text-gray-700 font-sans font-light leading-relaxed">
                {protocol.scientificBasis}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Benefits Section */}
      {protocol.benefits && protocol.benefits.length > 0 && (
        <BenefitsSection
          title="Key Benefits"
          benefits={protocol.benefits}
        />
      )}

      {/* Implementation Steps Section */}
      {protocol.implementationSteps && protocol.implementationSteps.length > 0 && (
        <StepsSection
          title="Implementation Steps"
          steps={protocol.implementationSteps}
        />
      )}

      {/* Expected Results Section */}
      {protocol.expectedResults && (
        <div className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-display font-black text-wellpro-navy mb-6 uppercase tracking-tight">
                Expected Results
              </h2>
            </div>
            <div className="bg-gradient-to-br from-wellpro-green/5 to-emerald-50 p-12 rounded-2xl border border-wellpro-green/10">
              <p className="text-lg text-gray-700 font-sans font-light leading-relaxed">
                {protocol.expectedResults}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <CTASection
        title="Ready to Transform Your Health?"
        description="Start implementing this protocol with expert guidance and personalized support."
        buttonText="Get Started"
        buttonLink="/programs"
        secondaryButtonText="Learn More"
        secondaryButtonLink="#"
      />
    </div>
  );
};
