import { useState, useEffect } from 'react';
import { ContentStore } from '../services/content/ContentStore';
import { VerticalsGridSection } from '../components/VerticalsGridSection';
import { CTASection } from '../components/CTASection';

const contentStore = new ContentStore();

export const WellnessVerticalsPage = () => {
  const [verticals, setVerticals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVerticals = async () => {
      try {
        setLoading(true);
        const data = await contentStore.getVerticals();
        setVerticals(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching verticals:', err);
        setError('Failed to load wellness verticals');
      } finally {
        setLoading(false);
      }
    };

    fetchVerticals();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-24 bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-wellpro-green"></div>
          <p className="mt-4 text-gray-600 font-sans">Loading wellness verticals...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-32 pb-24 bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-display font-black text-wellpro-navy mb-4">
            {error}
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
            Comprehensive Wellness
          </span>
          <h1 className="text-6xl md:text-7xl font-display font-black text-wellpro-navy mt-8 mb-6 uppercase tracking-tight">
            12 Wellness Verticals
          </h1>
          <p className="text-xl text-gray-600 font-sans font-light leading-relaxed max-w-3xl mx-auto">
            Explore our comprehensive approach to wellness across 12 key areas of health and vitality
          </p>
        </div>
      </div>

      {/* Verticals Grid Section */}
      {verticals.length > 0 && (
        <VerticalsGridSection
          title="Our Wellness Verticals"
          verticals={verticals}
        />
      )}

      {/* CTA Section */}
      <CTASection
        title="Discover Your Wellness Path"
        description="Explore each vertical to understand how WellPro's comprehensive approach can transform your health."
        buttonText="Get Started"
        buttonLink="/programs"
        secondaryButtonText="Schedule Assessment"
        secondaryButtonLink="#"
      />
    </div>
  );
};
