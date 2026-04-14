/**
 * Tests for Content Data Models and Validation Functions
 * 
 * @module content/models.test
 */

import {
  validateDisorder,
  validateProtocol,
  validateProgram,
  validateVertical,
  validateWOWAssessment,
  validateSEOMetadata,
  validateSymptom,
  validateRootCause,
  validateRelatedItem,
  validateKeyStatistics,
  validateBenefit,
  validateImplementationStep,
  validateProgramComponent,
  validatePhase,
  validateTimeline,
  validateOutcome,
  validateTestimonial,
  validateCTA,
  validateParameter,
  validateScoreRange,
} from './models.js';

describe('Content Models Validation', () => {
  describe('validateSEOMetadata', () => {
    it('should validate correct SEO metadata', () => {
      const metadata = {
        title: 'Test Title',
        description: 'Test Description',
        keywords: ['test', 'keywords'],
      };
      expect(validateSEOMetadata(metadata)).toBe(true);
    });

    it('should reject metadata with missing title', () => {
      const metadata = {
        description: 'Test Description',
        keywords: ['test'],
      };
      expect(validateSEOMetadata(metadata)).toBe(false);
    });

    it('should reject metadata with empty keywords array', () => {
      const metadata = {
        title: 'Test',
        description: 'Test',
        keywords: [],
      };
      expect(validateSEOMetadata(metadata)).toBe(true);
    });

    it('should reject null metadata', () => {
      expect(validateSEOMetadata(null)).toBe(false);
    });
  });

  describe('validateSymptom', () => {
    it('should validate correct symptom', () => {
      const symptom = {
        title: 'Fatigue',
        description: 'Persistent tiredness',
        icon: 'fatigue-icon',
      };
      expect(validateSymptom(symptom)).toBe(true);
    });

    it('should validate symptom without icon', () => {
      const symptom = {
        title: 'Fatigue',
        description: 'Persistent tiredness',
      };
      expect(validateSymptom(symptom)).toBe(true);
    });

    it('should reject symptom with empty title', () => {
      const symptom = {
        title: '',
        description: 'Persistent tiredness',
      };
      expect(validateSymptom(symptom)).toBe(false);
    });
  });

  describe('validateRelatedItem', () => {
    it('should validate correct related item', () => {
      const item = {
        id: 'prog-1',
        name: 'Diabetes Reversal',
        link: '/programs/diabetes-reversal',
      };
      expect(validateRelatedItem(item)).toBe(true);
    });

    it('should reject item with missing link', () => {
      const item = {
        id: 'prog-1',
        name: 'Diabetes Reversal',
      };
      expect(validateRelatedItem(item)).toBe(false);
    });
  });

  describe('validateKeyStatistics', () => {
    it('should validate correct key statistics', () => {
      const stats = {
        prevalence: '10% of population',
        impact: 'Affects quality of life',
        reversalRate: '85%',
      };
      expect(validateKeyStatistics(stats)).toBe(true);
    });

    it('should reject statistics with empty prevalence', () => {
      const stats = {
        prevalence: '',
        impact: 'Affects quality of life',
        reversalRate: '85%',
      };
      expect(validateKeyStatistics(stats)).toBe(false);
    });
  });

  describe('validateDisorder', () => {
    it('should validate complete disorder object', () => {
      const disorder = {
        id: 'diabetes',
        name: 'Diabetes',
        slug: 'diabetes',
        description: 'A metabolic disorder',
        keyStatistics: {
          prevalence: '10%',
          impact: 'High',
          reversalRate: '85%',
        },
        overview: 'Detailed overview',
        symptoms: [
          { title: 'Fatigue', description: 'Tiredness' },
        ],
        rootCauses: [
          { title: 'Poor Diet', description: 'Unhealthy eating' },
        ],
        reversalMechanism: 'Lifestyle changes',
        relatedPrograms: [
          { id: 'prog-1', name: 'Program 1', link: '/programs/1' },
        ],
        seoMetadata: {
          title: 'Diabetes - WellPro',
          description: 'Learn about diabetes',
          keywords: ['diabetes', 'health'],
        },
      };
      expect(validateDisorder(disorder)).toBe(true);
    });

    it('should reject disorder with missing required fields', () => {
      const disorder = {
        id: 'diabetes',
        name: 'Diabetes',
        // missing slug and other fields
      };
      expect(validateDisorder(disorder)).toBe(false);
    });
  });

  describe('validateBenefit', () => {
    it('should validate correct benefit', () => {
      const benefit = {
        title: 'Improved Energy',
        description: 'Feel more energetic',
        icon: 'energy-icon',
      };
      expect(validateBenefit(benefit)).toBe(true);
    });

    it('should reject benefit with empty description', () => {
      const benefit = {
        title: 'Improved Energy',
        description: '',
      };
      expect(validateBenefit(benefit)).toBe(false);
    });
  });

  describe('validateImplementationStep', () => {
    it('should validate correct implementation step', () => {
      const step = {
        number: 1,
        title: 'Start Protocol',
        description: 'Begin the protocol',
        details: 'Additional details',
      };
      expect(validateImplementationStep(step)).toBe(true);
    });

    it('should reject step with invalid number', () => {
      const step = {
        number: 0,
        title: 'Start Protocol',
        description: 'Begin the protocol',
      };
      expect(validateImplementationStep(step)).toBe(false);
    });
  });

  describe('validateProtocol', () => {
    it('should validate complete protocol object', () => {
      const protocol = {
        id: 'deep-detox',
        name: 'Deep Detox',
        slug: 'deep-detox',
        description: 'A detox protocol',
        overview: 'Detailed overview',
        scientificBasis: 'Scientific basis',
        benefits: [
          { title: 'Benefit 1', description: 'Description' },
        ],
        implementationSteps: [
          { number: 1, title: 'Step 1', description: 'Do this' },
        ],
        expectedResults: 'Expected results',
        duration: '30 days',
        difficulty: 'Medium',
        relatedProtocols: [],
        seoMetadata: {
          title: 'Deep Detox - WellPro',
          description: 'Learn about deep detox',
          keywords: ['detox'],
        },
      };
      expect(validateProtocol(protocol)).toBe(true);
    });
  });

  describe('validateProgramComponent', () => {
    it('should validate correct program component', () => {
      const component = {
        title: 'Phase 1',
        description: 'Initial phase',
        protocols: ['protocol-1', 'protocol-2'],
      };
      expect(validateProgramComponent(component)).toBe(true);
    });

    it('should reject component with empty protocols', () => {
      const component = {
        title: 'Phase 1',
        description: 'Initial phase',
        protocols: [],
      };
      expect(validateProgramComponent(component)).toBe(true);
    });
  });

  describe('validatePhase', () => {
    it('should validate correct phase', () => {
      const phase = {
        number: 1,
        title: 'Phase 1',
        duration: '2 weeks',
        objectives: ['Objective 1', 'Objective 2'],
      };
      expect(validatePhase(phase)).toBe(true);
    });

    it('should reject phase with invalid number', () => {
      const phase = {
        number: -1,
        title: 'Phase 1',
        duration: '2 weeks',
        objectives: [],
      };
      expect(validatePhase(phase)).toBe(false);
    });
  });

  describe('validateTimeline', () => {
    it('should validate correct timeline', () => {
      const timeline = {
        duration: '12 weeks',
        phases: [
          { number: 1, title: 'Phase 1', duration: '4 weeks', objectives: [] },
        ],
      };
      expect(validateTimeline(timeline)).toBe(true);
    });

    it('should reject timeline with empty phases', () => {
      const timeline = {
        duration: '12 weeks',
        phases: [],
      };
      expect(validateTimeline(timeline)).toBe(true);
    });
  });

  describe('validateOutcome', () => {
    it('should validate correct outcome', () => {
      const outcome = {
        title: 'Weight Loss',
        description: 'Lose 10 pounds',
      };
      expect(validateOutcome(outcome)).toBe(true);
    });

    it('should reject outcome with empty title', () => {
      const outcome = {
        title: '',
        description: 'Lose 10 pounds',
      };
      expect(validateOutcome(outcome)).toBe(false);
    });
  });

  describe('validateTestimonial', () => {
    it('should validate correct testimonial', () => {
      const testimonial = {
        name: 'John Doe',
        role: 'Patient',
        content: 'Great program!',
        image: 'john.jpg',
      };
      expect(validateTestimonial(testimonial)).toBe(true);
    });

    it('should validate testimonial without image', () => {
      const testimonial = {
        name: 'John Doe',
        role: 'Patient',
        content: 'Great program!',
      };
      expect(validateTestimonial(testimonial)).toBe(true);
    });
  });

  describe('validateCTA', () => {
    it('should validate correct CTA', () => {
      const cta = {
        text: 'Enroll Now',
        link: '/enroll',
      };
      expect(validateCTA(cta)).toBe(true);
    });

    it('should reject CTA with empty link', () => {
      const cta = {
        text: 'Enroll Now',
        link: '',
      };
      expect(validateCTA(cta)).toBe(false);
    });
  });

  describe('validateProgram', () => {
    it('should validate complete program object', () => {
      const program = {
        id: 'diabetes-reversal',
        name: 'Diabetes Reversal',
        slug: 'diabetes-reversal',
        description: 'A program to reverse diabetes',
        targetAudience: 'People with diabetes',
        overview: 'Detailed overview',
        components: [
          { title: 'Component 1', description: 'Description', protocols: [] },
        ],
        timeline: {
          duration: '12 weeks',
          phases: [
            { number: 1, title: 'Phase 1', duration: '4 weeks', objectives: [] },
          ],
        },
        expectedOutcomes: [
          { title: 'Outcome 1', description: 'Description' },
        ],
        testimonials: [
          { name: 'John', role: 'Patient', content: 'Great!' },
        ],
        enrollmentCTA: {
          text: 'Enroll',
          link: '/enroll',
        },
        seoMetadata: {
          title: 'Diabetes Reversal - WellPro',
          description: 'Learn about diabetes reversal',
          keywords: ['diabetes', 'reversal'],
        },
      };
      expect(validateProgram(program)).toBe(true);
    });
  });

  describe('validateVertical', () => {
    it('should validate correct vertical', () => {
      const vertical = {
        id: 'nutrition',
        name: 'Nutrition',
        description: 'Nutrition vertical',
        icon: 'nutrition-icon',
        relatedProtocols: [],
        relatedPrograms: [],
        link: '/verticals/nutrition',
      };
      expect(validateVertical(vertical)).toBe(true);
    });

    it('should reject vertical with missing icon', () => {
      const vertical = {
        id: 'nutrition',
        name: 'Nutrition',
        description: 'Nutrition vertical',
        relatedProtocols: [],
        relatedPrograms: [],
        link: '/verticals/nutrition',
      };
      expect(validateVertical(vertical)).toBe(false);
    });
  });

  describe('validateParameter', () => {
    it('should validate correct parameter', () => {
      const parameter = {
        number: 1,
        title: 'Sleep Quality',
        description: 'How well you sleep',
        relevance: 'Critical for health',
      };
      expect(validateParameter(parameter)).toBe(true);
    });

    it('should reject parameter with invalid number', () => {
      const parameter = {
        number: 0,
        title: 'Sleep Quality',
        description: 'How well you sleep',
        relevance: 'Critical for health',
      };
      expect(validateParameter(parameter)).toBe(false);
    });
  });

  describe('validateScoreRange', () => {
    it('should validate correct score range', () => {
      const range = {
        min: 0,
        max: 25,
        interpretation: 'Poor',
      };
      expect(validateScoreRange(range)).toBe(true);
    });

    it('should reject score range with invalid min/max', () => {
      const range = {
        min: 50,
        max: 25,
        interpretation: 'Poor',
      };
      expect(validateScoreRange(range)).toBe(false);
    });
  });

  describe('validateWOWAssessment', () => {
    it('should validate complete WOW assessment object', () => {
      const assessment = {
        name: 'World of Wellness',
        description: 'WOW Assessment',
        overview: 'Detailed overview',
        parameters: [
          { number: 1, title: 'Sleep', description: 'Sleep quality', relevance: 'Important' },
        ],
        scoringMethodology: 'Scoring method',
        scoreRanges: [
          { min: 0, max: 25, interpretation: 'Poor' },
        ],
        scheduleCTA: {
          text: 'Schedule',
          link: '/schedule',
        },
      };
      expect(validateWOWAssessment(assessment)).toBe(true);
    });

    it('should reject assessment with missing parameters', () => {
      const assessment = {
        name: 'World of Wellness',
        description: 'WOW Assessment',
        overview: 'Detailed overview',
        parameters: [],
        scoringMethodology: 'Scoring method',
        scoreRanges: [],
        scheduleCTA: {
          text: 'Schedule',
          link: '/schedule',
        },
      };
      expect(validateWOWAssessment(assessment)).toBe(true);
    });
  });
});
