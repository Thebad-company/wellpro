import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { TrustSection } from '../components/TrustSection';
import { ProblemSection } from '../components/ProblemSection';
import { HowItWorksSection } from '../components/HowItWorksSection';
import { SolutionSection } from '../components/SolutionSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { LifestyleSection } from '../components/LifeStyleSection';
import { AuthoritySection } from '../components/AuthoritySection';
import { PricingSection } from '../components/PricingSection';
import { FinalCTASection } from '../components/FinalCTASection';

export const Home = () => {
    return (
        <>
            <HeroSection />
            <TrustSection />
            <ProblemSection />
            <HowItWorksSection />
            <SolutionSection />
            <TestimonialsSection />
            <LifestyleSection />
            <AuthoritySection />
            <PricingSection />
            <FinalCTASection />
        </>
    );
};
