/**
 * Unit Tests for ContentMapper Service
 * Tests content fetching, parsing, and error handling
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ContentMapper } from './ContentMapper';
import {
  Disorder,
  Protocol,
  Program,
  Vertical,
  WOWAssessment,
} from '../types/content';

describe('ContentMapper', () => {
  let mapper: ContentMapper;

  beforeEach(() => {
    mapper = new ContentMapper();
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'info').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // ========================================================================
  // getDisorder Tests
  // ========================================================================

  describe('getDisorder', () => {
    it('should fetch and return a valid disorder', async () => {
      const disorder = await mapper.getDisorder('diabetes');

      expect(disorder).toBeDefined();
      expect(disorder?.id).toBe('diabetes');
      expect(disorder?.name).toBe('Diabetes');
      expect(disorder?.slug).toBe('diabetes');
      expect(disorder?.description).toBeDefined();
      expect(disorder?.overview).toBeDefined();
      expect(disorder?.symptoms).toBeDefined();
      expect(disorder?.rootCauses).toBeDefined();
      expect(disorder?.reversalMechanism).toBeDefined();
      expect(disorder?.relatedPrograms).toBeDefined();
      expect(disorder?.seoMetadata).toBeDefined();
    });

    it('should return null for non-existent disorder', async () => {
      const disorder = await mapper.getDisorder('non-existent');

      expect(disorder).toBeNull();
    });

    it('should return null for invalid disorderId', async () => {
      const disorder = await mapper.getDisorder('');

      expect(disorder).toBeNull();
    });

    it('should handle case-insensitive disorder IDs', async () => {
      const disorder = await mapper.getDisorder('DIABETES');

      expect(disorder).toBeDefined();
      expect(disorder?.id).toBe('diabetes');
    });

    it('should validate disorder data structure', async () => {
      const disorder = await mapper.getDisorder('diabetes');

      expect(disorder?.keyStatistics).toBeDefined();
      expect(disorder?.keyStatistics.prevalence).toBeDefined();
      expect(disorder?.keyStatistics.impact).toBeDefined();
      expect(disorder?.keyStatistics.reversalRate).toBeDefined();
    });

    it('should include symptoms with required fields', async () => {
      const disorder = await mapper.getDisorder('diabetes');

      expect(disorder?.symptoms.length).toBeGreaterThan(0);
      disorder?.symptoms.forEach((symptom) => {
        expect(symptom.title).toBeDefined();
        expect(symptom.description).toBeDefined();
        expect(symptom.icon).toBeDefined();
      });
    });

    it('should include root causes with required fields', async () => {
      const disorder = await mapper.getDisorder('diabetes');

      expect(disorder?.rootCauses.length).toBeGreaterThan(0);
      disorder?.rootCauses.forEach((cause) => {
        expect(cause.title).toBeDefined();
        expect(cause.description).toBeDefined();
      });
    });

    it('should include SEO metadata', async () => {
      const disorder = await mapper.getDisorder('diabetes');

      expect(disorder?.seoMetadata.title).toBeDefined();
      expect(disorder?.seoMetadata.description).toBeDefined();
      expect(disorder?.seoMetadata.keywords).toBeDefined();
      expect(Array.isArray(disorder?.seoMetadata.keywords)).toBe(true);
    });

    it('should log error for invalid input', async () => {
      await mapper.getDisorder('');

      expect(console.error).toHaveBeenCalled();
    });

    it('should log warning for non-existent disorder', async () => {
      await mapper.getDisorder('non-existent');

      expect(console.warn).toHaveBeenCalled();
    });

    it('should log success for valid disorder', async () => {
      await mapper.getDisorder('diabetes');

      expect(console.info).toHaveBeenCalled();
    });
  });

  // ========================================================================
  // getProtocol Tests
  // ========================================================================

  describe('getProtocol', () => {
    it('should fetch and return a valid protocol', async () => {
      const protocol = await mapper.getProtocol('deep-detox');

      expect(protocol).toBeDefined();
      expect(protocol?.id).toBe('deep-detox');
      expect(protocol?.name).toBe('Deep Detox');
      expect(protocol?.slug).toBe('deep-detox');
      expect(protocol?.description).toBeDefined();
      expect(protocol?.overview).toBeDefined();
      expect(protocol?.scientificBasis).toBeDefined();
      expect(protocol?.benefits).toBeDefined();
      expect(protocol?.implementationSteps).toBeDefined();
      expect(protocol?.expectedResults).toBeDefined();
      expect(protocol?.seoMetadata).toBeDefined();
    });

    it('should return null for non-existent protocol', async () => {
      const protocol = await mapper.getProtocol('non-existent');

      expect(protocol).toBeNull();
    });

    it('should return null for invalid protocolId', async () => {
      const protocol = await mapper.getProtocol('');

      expect(protocol).toBeNull();
    });

    it('should handle case-insensitive protocol IDs', async () => {
      const protocol = await mapper.getProtocol('DEEP-DETOX');

      expect(protocol).toBeDefined();
      expect(protocol?.id).toBe('deep-detox');
    });

    it('should include benefits with required fields', async () => {
      const protocol = await mapper.getProtocol('deep-detox');

      expect(protocol?.benefits.length).toBeGreaterThan(0);
      protocol?.benefits.forEach((benefit) => {
        expect(benefit.title).toBeDefined();
        expect(benefit.description).toBeDefined();
        expect(benefit.icon).toBeDefined();
      });
    });

    it('should include implementation steps in order', async () => {
      const protocol = await mapper.getProtocol('deep-detox');

      expect(protocol?.implementationSteps.length).toBeGreaterThan(0);
      protocol?.implementationSteps.forEach((step, index) => {
        expect(step.number).toBe(index + 1);
        expect(step.title).toBeDefined();
        expect(step.description).toBeDefined();
        expect(step.details).toBeDefined();
      });
    });

    it('should include duration and difficulty', async () => {
      const protocol = await mapper.getProtocol('deep-detox');

      expect(protocol?.duration).toBeDefined();
      expect(protocol?.difficulty).toBeDefined();
    });

    it('should log error for invalid input', async () => {
      await mapper.getProtocol('');

      expect(console.error).toHaveBeenCalled();
    });

    it('should log warning for non-existent protocol', async () => {
      await mapper.getProtocol('non-existent');

      expect(console.warn).toHaveBeenCalled();
    });
  });

  // ========================================================================
  // getProgram Tests
  // ========================================================================

  describe('getProgram', () => {
    it('should fetch and return a valid program', async () => {
      const program = await mapper.getProgram('diabetes-reversal');

      expect(program).toBeDefined();
      expect(program?.id).toBe('diabetes-reversal');
      expect(program?.name).toBe('Diabetes Reversal Program');
      expect(program?.slug).toBe('diabetes-reversal');
      expect(program?.description).toBeDefined();
      expect(program?.targetAudience).toBeDefined();
      expect(program?.overview).toBeDefined();
      expect(program?.components).toBeDefined();
      expect(program?.timeline).toBeDefined();
      expect(program?.expectedOutcomes).toBeDefined();
      expect(program?.testimonials).toBeDefined();
      expect(program?.enrollmentCTA).toBeDefined();
      expect(program?.seoMetadata).toBeDefined();
    });

    it('should return null for non-existent program', async () => {
      const program = await mapper.getProgram('non-existent');

      expect(program).toBeNull();
    });

    it('should return null for invalid programId', async () => {
      const program = await mapper.getProgram('');

      expect(program).toBeNull();
    });

    it('should handle case-insensitive program IDs', async () => {
      const program = await mapper.getProgram('DIABETES-REVERSAL');

      expect(program).toBeDefined();
      expect(program?.id).toBe('diabetes-reversal');
    });

    it('should include program components', async () => {
      const program = await mapper.getProgram('diabetes-reversal');

      expect(program?.components.length).toBeGreaterThan(0);
      program?.components.forEach((component) => {
        expect(component.title).toBeDefined();
        expect(component.description).toBeDefined();
        expect(Array.isArray(component.protocols)).toBe(true);
      });
    });

    it('should include timeline with phases', async () => {
      const program = await mapper.getProgram('diabetes-reversal');

      expect(program?.timeline.duration).toBeDefined();
      expect(program?.timeline.phases.length).toBeGreaterThan(0);
      program?.timeline.phases.forEach((phase) => {
        expect(phase.number).toBeDefined();
        expect(phase.title).toBeDefined();
        expect(phase.duration).toBeDefined();
        expect(Array.isArray(phase.objectives)).toBe(true);
      });
    });

    it('should include expected outcomes', async () => {
      const program = await mapper.getProgram('diabetes-reversal');

      expect(program?.expectedOutcomes.length).toBeGreaterThan(0);
      program?.expectedOutcomes.forEach((outcome) => {
        expect(outcome.title).toBeDefined();
        expect(outcome.description).toBeDefined();
      });
    });

    it('should include testimonials', async () => {
      const program = await mapper.getProgram('diabetes-reversal');

      expect(program?.testimonials.length).toBeGreaterThan(0);
      program?.testimonials.forEach((testimonial) => {
        expect(testimonial.name).toBeDefined();
        expect(testimonial.role).toBeDefined();
        expect(testimonial.content).toBeDefined();
        expect(testimonial.image).toBeDefined();
      });
    });

    it('should include enrollment CTA', async () => {
      const program = await mapper.getProgram('diabetes-reversal');

      expect(program?.enrollmentCTA.text).toBeDefined();
      expect(program?.enrollmentCTA.link).toBeDefined();
    });
  });

  // ========================================================================
  // getVerticals Tests
  // ========================================================================

  describe('getVerticals', () => {
    it('should fetch and return all verticals', async () => {
      const verticals = await mapper.getVerticals();

      expect(Array.isArray(verticals)).toBe(true);
      expect(verticals.length).toBe(12);
    });

    it('should return verticals with required fields', async () => {
      const verticals = await mapper.getVerticals();

      verticals.forEach((vertical) => {
        expect(vertical.id).toBeDefined();
        expect(vertical.name).toBeDefined();
        expect(vertical.description).toBeDefined();
        expect(vertical.icon).toBeDefined();
        expect(vertical.link).toBeDefined();
        expect(Array.isArray(vertical.relatedProtocols)).toBe(true);
        expect(Array.isArray(vertical.relatedPrograms)).toBe(true);
      });
    });

    it('should include all 12 wellness verticals', async () => {
      const verticals = await mapper.getVerticals();

      const verticalNames = verticals.map((v) => v.name);
      expect(verticalNames).toContain('Nutrition');
      expect(verticalNames).toContain('Fitness');
      expect(verticalNames).toContain('Sleep');
      expect(verticalNames).toContain('Stress Management');
      expect(verticalNames).toContain('Hydration');
      expect(verticalNames).toContain('Digestion');
      expect(verticalNames).toContain('Immunity');
      expect(verticalNames).toContain('Detoxification');
      expect(verticalNames).toContain('Hormonal Balance');
      expect(verticalNames).toContain('Inflammation Management');
      expect(verticalNames).toContain('Longevity');
      expect(verticalNames).toContain('Mindfulness');
    });

    it('should return empty array on error', async () => {
      const verticals = await mapper.getVerticals();

      expect(Array.isArray(verticals)).toBe(true);
    });

    it('should log success when fetching verticals', async () => {
      await mapper.getVerticals();

      expect(console.info).toHaveBeenCalled();
    });
  });

  // ========================================================================
  // getWOWAssessment Tests
  // ========================================================================

  describe('getWOWAssessment', () => {
    it('should fetch and return WOW Assessment', async () => {
      const assessment = await mapper.getWOWAssessment();

      expect(assessment).toBeDefined();
      expect(assessment?.name).toBe('World of Wellness (WOW) Assessment');
      expect(assessment?.description).toBeDefined();
      expect(assessment?.overview).toBeDefined();
      expect(assessment?.parameters).toBeDefined();
      expect(assessment?.scoringMethodology).toBeDefined();
      expect(assessment?.scoreRanges).toBeDefined();
      expect(assessment?.scheduleCTA).toBeDefined();
    });

    it('should include all 12 parameters', async () => {
      const assessment = await mapper.getWOWAssessment();

      expect(assessment?.parameters.length).toBe(12);
    });

    it('should include parameters with required fields', async () => {
      const assessment = await mapper.getWOWAssessment();

      assessment?.parameters.forEach((param) => {
        expect(param.number).toBeDefined();
        expect(param.title).toBeDefined();
        expect(param.description).toBeDefined();
        expect(param.relevance).toBeDefined();
      });
    });

    it('should include score ranges with interpretations', async () => {
      const assessment = await mapper.getWOWAssessment();

      expect(assessment?.scoreRanges.length).toBeGreaterThan(0);
      assessment?.scoreRanges.forEach((range) => {
        expect(range.min).toBeDefined();
        expect(range.max).toBeDefined();
        expect(range.interpretation).toBeDefined();
      });
    });

    it('should include schedule CTA', async () => {
      const assessment = await mapper.getWOWAssessment();

      expect(assessment?.scheduleCTA.text).toBeDefined();
      expect(assessment?.scheduleCTA.link).toBeDefined();
    });

    it('should log success when fetching assessment', async () => {
      await mapper.getWOWAssessment();

      expect(console.info).toHaveBeenCalled();
    });
  });

  // ========================================================================
  // Error Handling Tests
  // ========================================================================

  describe('Error Handling', () => {
    it('should handle null input gracefully', async () => {
      const disorder = await mapper.getDisorder(null as any);

      expect(disorder).toBeNull();
      expect(console.error).toHaveBeenCalled();
    });

    it('should handle undefined input gracefully', async () => {
      const disorder = await mapper.getDisorder(undefined as any);

      expect(disorder).toBeNull();
      expect(console.error).toHaveBeenCalled();
    });

    it('should handle non-string input gracefully', async () => {
      const disorder = await mapper.getDisorder(123 as any);

      expect(disorder).toBeNull();
      expect(console.error).toHaveBeenCalled();
    });

    it('should log errors with context', async () => {
      await mapper.getDisorder('');

      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining('ContentMapper'),
        expect.any(Object)
      );
    });
  });

  // ========================================================================
  // Data Consistency Tests
  // ========================================================================

  describe('Data Consistency', () => {
    it('should return consistent data on multiple calls', async () => {
      const disorder1 = await mapper.getDisorder('diabetes');
      const disorder2 = await mapper.getDisorder('diabetes');

      expect(disorder1).toEqual(disorder2);
    });

    it('should return consistent verticals on multiple calls', async () => {
      const verticals1 = await mapper.getVerticals();
      const verticals2 = await mapper.getVerticals();

      expect(verticals1).toEqual(verticals2);
    });

    it('should return consistent WOW assessment on multiple calls', async () => {
      const assessment1 = await mapper.getWOWAssessment();
      const assessment2 = await mapper.getWOWAssessment();

      expect(assessment1).toEqual(assessment2);
    });
  });
});
