import React, { useState, useEffect } from 'react';
import { ContentStore } from '../services/content/ContentStore';
import { ParametersSection } from '../components/ParametersSection';
import { CTASection } from '../components/CTASection';

const contentStore = new ContentStore();

export const WOWAssessmentPage = () => {
  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        setLoading(true);
        const data = await contentStore.getWOWAssessment();
        setAssessment(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching WOW assessment:', err);
        setError('Failed to load assessment information');
      } finally {
        setLoading(false);
      }
    };

    fetchAssessment();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-24 bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-wellpro-green"></div>
          <p className="mt-4 text-gray-600 font-sans">Loading assessment information...</p>
        </div>
      </div>
    );
  }

  if (error || !assessment) {
    return (
      <div className="min-h-screen pt-32 pb-24 bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-display font-black text-wellpro-navy mb-4">
            {error || 'Assessment not found'}
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
        <div className="text-center">
          <span className="text-wellpro-green font-bold text-sm uppercase tracking-[0.3em] bg-wellpro-green/10 px-6 py-2 rounded-full">
            Wellness Assessment
          </span>
          <h1 className="text-6xl md:text-7xl font-display font-black text-wellpro-navy mt-8 mb-6 uppercase tracking-tight">
            {assessment.name || 'World of Wellness Assessment'}
          </h1>
          <p className="text-xl text-gray-600 font-sans font-light leading-relaxed max-w-3xl mx-auto">
            {assessment.description}
          </p>
        </div>
      </div>

      {/* Overview Section */}
      {assessment.overview && (
        <div className="py-24 bg-gradient-to-br from-gray-50 to-stone-100">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-display font-black text-wellpro-navy mb-6 uppercase tracking-tight">
                Assessment Overview
              </h2>
            </div>
            <div className="bg-white p-12 rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-lg text-gray-700 font-sans font-light leading-relaxed">
                {assessment.overview}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Parameters Section */}
      {assessment.parameters && assessment.parameters.length > 0 && (
        <ParametersSection
          title="The 12 Wellness Parameters"
          parameters={assessment.parameters}
        />
      )}

      {/* Scoring Methodology Section */}
      {assessment.scoringMethodology && (
        <div className="py-24 bg-gradient-to-br from-gray-50 to-stone-100">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-display font-black text-wellpro-navy mb-6 uppercase tracking-tight">
                How Scoring Works
              </h2>
            </div>
            <div className="bg-white p-12 rounded-2xl border border-gray-100 shadow-sm mb-12">
              <p className="text-lg text-gray-700 font-sans font-light leading-relaxed mb-8">
                {assessment.scoringMethodology}
              </p>
            </div>

            {/* Score Ranges */}
            {assessment.scoreRanges && assessment.scoreRanges.length > 0 && (
              <div className="grid md:grid-cols-2 gap-6">
                {assessment.scoreRanges.map((range, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-wellpro-green/5 to-emerald-50 p-8 rounded-2xl border border-wellpro-green/10"
                  >
                    <div className="mb-4">
                      <span className="text-sm font-bold text-wellpro-green uppercase tracking-widest">
                        Score Range
                      </span>
                      <p className="text-2xl font-display font-black text-wellpro-navy mt-2">
                        {range.min} - {range.max}
                      </p>
                    </div>
                    <p className="text-gray-700 font-sans font-light leading-relaxed">
                      {range.interpretation}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* CTA Section */}
      <CTASection
        title="Ready to Assess Your Wellness?"
        description="Schedule your personalized World of Wellness assessment and get a comprehensive understanding of your health status."
        buttonText="Schedule Assessment"
        buttonLink="#"
        secondaryButtonText="Learn More"
        secondaryButtonLink="#"
      />
    </div>
  );
};
