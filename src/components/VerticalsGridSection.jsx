import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf } from 'lucide-react';

export const VerticalsGridSection = ({ title = 'Wellness Verticals', verticals = [] }) => {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-display font-black text-wellpro-navy mb-6 uppercase tracking-tight">
            {title}
          </h2>
          <p className="text-lg text-gray-600 font-sans font-light max-w-3xl mx-auto">
            Explore our comprehensive approach to wellness across 12 key verticals
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {verticals.map((vertical, index) => (
            <Link
              key={index}
              to={vertical.link || '#'}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-wellpro-green/30 transform hover:-translate-y-2"
            >
              <div className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-wellpro-green/20 to-emerald-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Leaf className="h-8 w-8 text-wellpro-green" />
                </div>

                <h3 className="text-2xl font-semibold text-wellpro-navy mb-3 group-hover:text-wellpro-green transition-colors">
                  {vertical.title}
                </h3>

                <p className="text-gray-600 font-sans font-light leading-relaxed mb-6">
                  {vertical.description}
                </p>

                <div className="flex items-center gap-2 text-wellpro-green font-semibold group-hover:gap-3 transition-all">
                  Learn More
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
