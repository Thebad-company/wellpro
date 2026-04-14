import React from 'react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

export const CTASection = ({
  title,
  description,
  buttonText = 'Get Started',
  buttonLink = '/programs',
  secondaryButtonText = null,
  secondaryButtonLink = null,
}) => {
  return (
    <section className="py-24 bg-gradient-to-r from-wellpro-green to-emerald-600">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-5xl font-display font-black text-white mb-6 uppercase tracking-tight">
          {title}
        </h2>

        <p className="text-xl text-white/90 font-sans font-light leading-relaxed mb-12 max-w-2xl mx-auto">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link to={buttonLink}>
            <Button className="bg-white text-wellpro-green hover:bg-gray-100 px-10 py-7 text-lg rounded-full font-bold shadow-xl transition-all transform hover:scale-105">
              {buttonText}
            </Button>
          </Link>

          {secondaryButtonText && secondaryButtonLink && (
            <Link to={secondaryButtonLink}>
              <Button
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 px-10 py-7 text-lg rounded-full font-bold transition-all"
              >
                {secondaryButtonText}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};
