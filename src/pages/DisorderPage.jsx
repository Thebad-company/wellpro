import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ContentStore } from '../services/content/ContentStore';
import { OverviewSection } from '../components/OverviewSection';
import { SymptomSection } from '../components/SymptomSection';
import { BenefitsSection } from '../components/BenefitsSection';
import { CTASection } from '../components/CTASection';

const contentStore = new ContentStore();

export const DisorderPage = () => {
  const { disorderId } = useParams();
  const [disorder, setDisorder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDisorder = async () => {
      try {
        setLoading(true);
        const data = await contentStore.getDisorder(disorderId);
        setDisorder(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching disorder:', err);
        setError('Failed to load disorder information');
      } finally {
        setLoading(false);
      }
    };

    if (disorderId) {
      fetchDisorder();
    }
  }, [disorderId]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-24 bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-wellpro-green"></div>
          <p className="mt-4 text-gray-600 font-sans">Loading disorder information...</p>
        </div>
      </div>
    );
  }

  if (error || !disorder) {
    return (
      <div className="min-h-screen pt-32 pb-24 bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-display font-black text-wellpro-navy mb-4">
            {error || 'Disorder not found'}
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
              Disorder Analysis
            </span>
            <h1 className="text-6xl md:text-7xl font-display font-black text-wellpro-navy mt-8 mb-6 uppercase tracking-tight">
              {disorder.name}
            </h1>
            {disorder.keyStatistics && (
              <div className="space-y-4 mb-10">
                {disorder.keyStatistics.prevalence && (
                  <p className="text-lg text-gray-700 font-sans">
                    <span className="font-semibold text-wellpro-green">Prevalence:</span> {disorder.keyStatistics.prevalence}
                  </p>
                )}
                {disorder.keyStatistics.impact && (
                  <p className="text-lg text-gray-700 font-sans">
                    <span className="font-semibold text-wellpro-green">Impact:</span> {disorder.keyStatistics.impact}
                  </p>
                )}
              </div>
            )}
            <p className="text-xl text-gray-600 font-sans font-light leading-relaxed mb-10">
              {disorder.overview}
            </p>
          </div>
          {disorder.image && (
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl">
              <img
                src={disorder.image}
                alt={disorder.name}
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-wellpro-navy/30 to-transparent"></div>
            </div>
          )}
        </div>
      </div>

      {/* Overview Section */}
      {disorder.overview && (
        <OverviewSection
          title="Understanding the Condition"
          description={disorder.overview}
          highlights={disorder.highlights || []}
        />
      )}

      {/* Symptoms Section */}
      {disorder.symptoms && disorder.symptoms.length > 0 && (
        <SymptomSection
          title="Symptoms & Markers"
          symptoms={disorder.symptoms}
        />
      )}

      {/* Root Causes Section */}
      {disorder.rootCauses && disorder.rootCauses.length > 0 && (
        <BenefitsSection
          title="Root Causes"
          benefits={disorder.rootCauses}
        />
      )}

      {/* Related Programs Section */}
      {disorder.relatedPrograms && disorder.relatedPrograms.length > 0 && (
        <div className="py-24 bg-gradient-to-br from-gray-50 to-stone-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-display font-black text-wellpro-navy mb-6 uppercase tracking-tight">
                Related Programs
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {disorder.relatedPrograms.map((program, index) => (
                <a
                  key={index}
                  href={program.link}
                  className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 group"
                >
                  <h3 className="text-xl font-semibold text-wellpro-navy mb-3 group-hover:text-wellpro-green transition-colors">
                    {program.name}
                  </h3>
                  <p className="text-gray-600 font-sans font-light">
                    Explore this program to start your reversal journey
                  </p>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <CTASection
        title="Start Your Reversal Journey"
        description="Get a personalized clinical assessment to understand your markers and begin your path to wellness."
        buttonText="Join Reversal Program"
        buttonLink="/programs"
        secondaryButtonText="Download Guide"
        secondaryButtonLink="#"
      />
    </div>
  );
};
