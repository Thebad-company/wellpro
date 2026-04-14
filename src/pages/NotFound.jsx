import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Button } from '../components/ui/button';

export const NotFound = () => {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl md:text-[150px] font-display font-black text-wellpro-green/20 leading-none">
            404
          </h1>
          <div className="relative -mt-12">
            <h2 className="text-4xl md:text-5xl font-display font-black text-wellpro-navy">
              Page Not Found
            </h2>
          </div>
        </div>

        {/* Description */}
        <p className="text-lg text-gray-600 font-sans mb-4 leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <p className="text-gray-500 font-sans mb-12">
          Let's get you back on track with your wellness journey.
        </p>

        {/* Quick Links */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          <Link to="/" className="group">
            <div className="bg-white border border-gray-100 hover:border-wellpro-green/30 rounded-xl p-6 transition-all hover:shadow-lg">
              <Home className="h-8 w-8 text-wellpro-green mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <p className="font-semibold text-wellpro-navy">Home</p>
              <p className="text-sm text-gray-600">Back to homepage</p>
            </div>
          </Link>

          <Link to="/programs" className="group">
            <div className="bg-white border border-gray-100 hover:border-wellpro-green/30 rounded-xl p-6 transition-all hover:shadow-lg">
              <Search className="h-8 w-8 text-wellpro-green mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <p className="font-semibold text-wellpro-navy">Programs</p>
              <p className="text-sm text-gray-600">Explore our programs</p>
            </div>
          </Link>

          <Link to="/wellness-verticals" className="group">
            <div className="bg-white border border-gray-100 hover:border-wellpro-green/30 rounded-xl p-6 transition-all hover:shadow-lg">
              <div className="h-8 w-8 text-wellpro-green mx-auto mb-3 group-hover:scale-110 transition-transform">
                ✨
              </div>
              <p className="font-semibold text-wellpro-navy">Wellness</p>
              <p className="text-sm text-gray-600">Wellness verticals</p>
            </div>
          </Link>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button className="bg-wellpro-green hover:bg-emerald-600 text-white px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105 inline-flex items-center gap-2">
              <Home className="h-5 w-5" />
              Go Home
            </Button>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="border-2 border-wellpro-navy hover:border-wellpro-green text-wellpro-navy hover:text-wellpro-green px-8 py-3 rounded-full font-bold transition-all inline-flex items-center gap-2"
          >
            <ArrowLeft className="h-5 w-5" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};
