import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { ContentStore } from '../services/content/ContentStore';
import { ParametersSection } from '../components/ParametersSection';
import { Zap, TrendingUp, Award, CheckCircle } from 'lucide-react';

const contentStore = new ContentStore();

export const WOWAssessmentPage = () => {
  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({});
  const [scores, setScores] = useState(null);

  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        setLoading(true);
        const data = await contentStore.getWOWAssessment();
        setAssessment(data);
        // Initialize form data with all parameters
        const initialFormData = {};
        if (data.parameters) {
          data.parameters.forEach(param => {
            initialFormData[`param_${param.number}`] = 50;
          });
        }
        setFormData(initialFormData);
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

  const handleInputChange = (paramNumber, value) => {
    setFormData(prev => ({
      ...prev,
      [`param_${paramNumber}`]: parseInt(value)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Calculate scores
    const parameterScores = assessment.parameters.map(param => ({
      number: param.number,
      title: param.title,
      score: formData[`param_${param.number}`] || 50
    }));
    const overallScore = Math.round(
      parameterScores.reduce((sum, p) => sum + p.score, 0) / parameterScores.length
    );
    setScores({
      overall: overallScore,
      parameters: parameterScores
    });
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-24 bg-gradient-to-b from-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-wellpro-green"></div>
          <p className="mt-4 text-gray-600 font-sans">Loading assessment information...</p>
        </div>
      </div>
    );
  }

  if (error || !assessment) {
    return (
      <div className="min-h-screen pt-32 pb-24 bg-gradient-to-b from-white to-gray-50 flex items-center justify-center">
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
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-wellpro-green/5 via-transparent to-wellpro-navy/5"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center">
            <span className="text-wellpro-green font-bold text-sm uppercase tracking-[0.3em] bg-wellpro-green/10 px-6 py-2 rounded-full inline-block mb-6">
              Comprehensive Wellness Assessment
            </span>
            <h1 className="text-6xl md:text-7xl font-display font-black text-wellpro-navy mb-8 uppercase tracking-tight leading-tight">
              {assessment.name || 'World of Wellness Assessment'}
            </h1>
            <p className="text-xl text-gray-600 font-sans font-light leading-relaxed max-w-3xl mx-auto mb-12">
              {assessment.description}
            </p>
            <Button className="bg-wellpro-green hover:bg-emerald-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg transition-all transform hover:scale-105">
              Start Assessment
            </Button>
          </div>
        </div>
      </div>

      {/* Overview Section */}
      {assessment.overview && (
        <div className="py-24 bg-white border-y border-gray-100">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="text-center">
                <div className="w-16 h-16 bg-wellpro-green/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-wellpro-green" />
                </div>
                <h3 className="text-lg font-display font-black text-wellpro-navy mb-2 uppercase">Holistic</h3>
                <p className="text-gray-600 font-sans font-light">12 dimensions of wellness</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-wellpro-green/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-wellpro-green" />
                </div>
                <h3 className="text-lg font-display font-black text-wellpro-navy mb-2 uppercase">Personalized</h3>
                <p className="text-gray-600 font-sans font-light">Tailored recommendations</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-wellpro-green/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-wellpro-green" />
                </div>
                <h3 className="text-lg font-display font-black text-wellpro-navy mb-2 uppercase">Evidence-Based</h3>
                <p className="text-gray-600 font-sans font-light">Scientific approach</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-wellpro-green/5 to-emerald-50 p-12 rounded-3xl border border-wellpro-green/10">
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
        <div className="py-24 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-display font-black text-wellpro-navy mb-6 uppercase tracking-tight">
                How Scoring <span className="text-wellpro-green">Works</span>
              </h2>
              <p className="text-xl text-gray-600 font-sans font-light max-w-2xl mx-auto">
                Understanding your wellness score and what it means for your health journey
              </p>
            </div>
            <div className="bg-white p-12 rounded-3xl border border-gray-100 shadow-lg mb-16">
              <p className="text-lg text-gray-700 font-sans font-light leading-relaxed">
                {assessment.scoringMethodology}
              </p>
            </div>

            {/* Score Ranges */}
            {assessment.scoreRanges && assessment.scoreRanges.length > 0 && (
              <div className="grid md:grid-cols-2 gap-6">
                {assessment.scoreRanges.map((range, index) => (
                  <div
                    key={index}
                    className="group bg-white p-8 rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="mb-6">
                      <div className="inline-block bg-wellpro-green/10 px-4 py-2 rounded-full mb-4">
                        <span className="text-sm font-bold text-wellpro-green uppercase tracking-widest">
                          Score Range
                        </span>
                      </div>
                      <p className="text-3xl font-display font-black text-wellpro-navy">
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

      {/* Assessment Form Section */}
      {!scores && (
        <div className="py-24 bg-white border-y border-gray-100">
          <div className="max-w-4xl mx-auto px-6">
            {!showForm ? (
              <div className="text-center">
                <h2 className="text-5xl font-display font-black text-wellpro-navy mb-6 uppercase tracking-tight">
                  Take Your <span className="text-wellpro-green">Assessment</span>
                </h2>
                <p className="text-xl text-gray-600 font-sans font-light mb-12 max-w-2xl mx-auto">
                  Answer 12 quick questions about your wellness across different dimensions and get your personalized score.
                </p>
                <Button 
                  onClick={() => setShowForm(true)}
                  className="bg-wellpro-green hover:bg-emerald-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg transition-all transform hover:scale-105"
                >
                  Start Assessment
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-display font-black text-wellpro-navy mb-4 uppercase">
                    Wellness Assessment Form
                  </h2>
                  <p className="text-gray-600 font-sans">Rate each dimension from 0 (Poor) to 100 (Excellent)</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {assessment.parameters.map((param) => (
                    <div key={param.number} className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-display font-black text-wellpro-navy uppercase">
                            {param.number}. {param.title}
                          </h3>
                          <p className="text-sm text-gray-600 font-sans mt-2">{param.description}</p>
                        </div>
                        <span className="text-2xl font-display font-black text-wellpro-green">
                          {formData[`param_${param.number}`] || 50}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={formData[`param_${param.number}`] || 50}
                        onChange={(e) => handleInputChange(param.number, e.target.value)}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-wellpro-green"
                      />
                      <div className="flex justify-between text-xs text-gray-500 font-sans mt-2">
                        <span>Poor</span>
                        <span>Good</span>
                        <span>Excellent</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4 justify-center pt-8">
                  <Button 
                    type="submit"
                    className="bg-wellpro-green hover:bg-emerald-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg transition-all transform hover:scale-105"
                  >
                    Calculate Score
                  </Button>
                  <Button 
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="border-2 border-wellpro-navy hover:bg-gray-50 text-wellpro-navy px-10 py-4 rounded-full font-bold text-lg transition-all"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Results Section */}
      {scores && (
        <div className="py-24 bg-gradient-to-br from-wellpro-green/5 to-emerald-50 border-y border-wellpro-green/20">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-display font-black text-wellpro-navy mb-6 uppercase tracking-tight">
                Your Wellness <span className="text-wellpro-green">Score</span>
              </h2>
            </div>

            {/* Overall Score Card */}
            <div className="bg-white p-12 rounded-3xl border-2 border-wellpro-green shadow-xl mb-12">
              <div className="text-center">
                <p className="text-gray-600 font-sans mb-4">Your Overall WOW Score</p>
                <div className="text-7xl font-display font-black text-wellpro-green mb-6">
                  {scores.overall}
                </div>
                <div className="inline-block bg-wellpro-green/10 px-6 py-3 rounded-full">
                  <p className="text-lg font-bold text-wellpro-green uppercase tracking-wide">
                    {scores.overall >= 86 ? 'Excellent' : scores.overall >= 71 ? 'Good' : scores.overall >= 51 ? 'Fair' : scores.overall >= 31 ? 'Poor' : 'Critical'}
                  </p>
                </div>
              </div>
            </div>

            {/* Parameter Scores */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {scores.parameters.map((param) => (
                <div key={param.number} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-black text-wellpro-navy uppercase">{param.title}</h3>
                    <CheckCircle className="h-6 w-6 text-wellpro-green" />
                  </div>
                  <div className="flex items-end gap-4">
                    <div className="text-4xl font-display font-black text-wellpro-green">{param.score}</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-wellpro-green h-2 rounded-full transition-all duration-500"
                        style={{ width: `${param.score}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4 justify-center">
              <Button 
                onClick={() => { setScores(null); setShowForm(false); }}
                className="bg-wellpro-green hover:bg-emerald-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg transition-all transform hover:scale-105"
              >
                Retake Assessment
              </Button>
              <Button 
                className="border-2 border-wellpro-navy hover:bg-gray-50 text-wellpro-navy px-10 py-4 rounded-full font-bold text-lg transition-all"
              >
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className="py-32 bg-gradient-to-br from-wellpro-green to-emerald-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -mr-48 -mt-48"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full -ml-48 -mb-48"></div>
        </div>
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-5xl md:text-6xl font-display font-black text-white mb-8 uppercase tracking-tight">
            Ready to Transform Your Wellness?
          </h2>
          <p className="text-xl text-white/90 font-sans font-light leading-relaxed mb-12 max-w-2xl mx-auto">
            Take the first step towards a healthier, more balanced life. Get your personalized wellness assessment and actionable recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white hover:bg-gray-100 text-wellpro-green px-10 py-4 rounded-full font-bold text-lg shadow-lg transition-all transform hover:scale-105">
              Schedule Assessment
            </Button>
            <Button className="border-2 border-white hover:bg-white/10 text-white px-10 py-4 rounded-full font-bold text-lg transition-all">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
