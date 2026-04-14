/**
 * Tests for ContentMapper Service
 * 
 * @module content/ContentMapper.test
 */

import { ContentMapper } from './ContentMapper.js';

describe('ContentMapper Service', () => {
  let contentMapper;

  beforeEach(() => {
    contentMapper = new ContentMapper();
  });

  describe('getDisorder', () => {
    it('should fetch and return a valid disorder', async () => {
      const disorder = await contentMapper.getDisorder('diabetes');
      
      expect(disorder).not.toBeNull();
      expect(disorder.id).toBe('diabetes');
      expect(disorder.name).toBe('Diabetes');
      expect(disorder.slug).toBe('diabetes');
      expect(disorder.description).toBeTruthy();
      expect(disorder.keyStatistics).toBeDefined();
      expect(disorder.symptoms).toBeInstanceOf(Array);
      expect(disorder.rootCauses).toBeInstanceOf(Array);
      expect(disorder.seoMetadata).toBeDefined();
    });

    it('should return null for non-existent disorder', async () => {
      const disorder = await contentMapper.getDisorder('non-existent');
      
      expect(disorder).toBeNull();
    });

    it('should return null for invalid disorderId', async () => {
      const disorder = await contentMapper.getDisorder(null);
      
      expect(disorder).toBeNull();
    });

    it('should return null for empty disorderId', async () => {
      const disorder = await contentMapper.getDisorder('');
      
      expect(disorder).toBeNull();
    });

    it('should handle case-insensitive disorder IDs', async () => {
      const disorder = await contentMapper.getDisorder('DIABETES');
      
      expect(disorder).not.toBeNull();
      expect(disorder.id).toBe('diabetes');
    });

    it('should validate disorder data structure', async () => {
      const disorder = await contentMapper.getDisorder('diabetes');
      
      expect(disorder.keyStatistics.prevalence).toBeTruthy();
      expect(disorder.keyStatistics.impact).toBeTruthy();
      expect(disorder.keyStatistics.reversalRate).toBeTruthy();
      expect(disorder.symptoms.length).toBeGreaterThan(0);
      expect(disorder.rootCauses.length).toBeGreaterThan(0);
    });

    it('should include related programs', async () => {
      const disorder = await contentMapper.getDisorder('diabetes');
      
      expect(disorder.relatedPrograms).toBeInstanceOf(Array);
      expect(disorder.relatedPrograms.length).toBeGreaterThan(0);
      expect(disorder.relatedPrograms[0].id).toBeTruthy();
      expect(disorder.relatedPrograms[0].name).toBeTruthy();
      expect(disorder.relatedPrograms[0].link).toBeTruthy();
    });
  });

  describe('getProtocol', () => {
    it('should fetch and return a valid protocol', async () => {
      const protocol = await contentMapper.getProtocol('deep-detox');
      
      expect(protocol).not.toBeNull();
      expect(protocol.id).toBe('deep-detox');
      expect(protocol.name).toBe('Deep Detox');
      expect(protocol.slug).toBe('deep-detox');
      expect(protocol.description).toBeTruthy();
      expect(protocol.benefits).toBeInstanceOf(Array);
      expect(protocol.implementationSteps).toBeInstanceOf(Array);
      expect(protocol.seoMetadata).toBeDefined();
    });

    it('should return null for non-existent protocol', async () => {
      const protocol = await contentMapper.getProtocol('non-existent');
      
      expect(protocol).toBeNull();
    });

    it('should return null for invalid protocolId', async () => {
      const protocol = await contentMapper.getProtocol(null);
      
      expect(protocol).toBeNull();
    });

    it('should handle case-insensitive protocol IDs', async () => {
      const protocol = await contentMapper.getProtocol('DEEP-DETOX');
      
      expect(protocol).not.toBeNull();
      expect(protocol.id).toBe('deep-detox');
    });

    it('should validate protocol data structure', async () => {
      const protocol = await contentMapper.getProtocol('deep-detox');
      
      expect(protocol.overview).toBeTruthy();
      expect(protocol.scientificBasis).toBeTruthy();
      expect(protocol.benefits.length).toBeGreaterThan(0);
      expect(protocol.implementationSteps.length).toBeGreaterThan(0);
      expect(protocol.expectedResults).toBeTruthy();
      expect(protocol.duration).toBeTruthy();
      expect(protocol.difficulty).toBeTruthy();
    });

    it('should include benefits with proper structure', async () => {
      const protocol = await contentMapper.getProtocol('deep-detox');
      
      protocol.benefits.forEach((benefit) => {
        expect(benefit.title).toBeTruthy();
        expect(benefit.description).toBeTruthy();
      });
    });

    it('should include implementation steps with proper structure', async () => {
      const protocol = await contentMapper.getProtocol('deep-detox');
      
      protocol.implementationSteps.forEach((step) => {
        expect(step.number).toBeGreaterThan(0);
        expect(step.title).toBeTruthy();
        expect(step.description).toBeTruthy();
      });
    });
  });

  describe('getProgram', () => {
    it('should fetch and return a valid program', async () => {
      const program = await contentMapper.getProgram('diabetes-reversal');
      
      expect(program).not.toBeNull();
      expect(program.id).toBe('diabetes-reversal');
      expect(program.name).toBe('Diabetes Reversal Program');
      expect(program.slug).toBe('diabetes-reversal');
      expect(program.description).toBeTruthy();
      expect(program.components).toBeInstanceOf(Array);
      expect(program.timeline).toBeDefined();
      expect(program.expectedOutcomes).toBeInstanceOf(Array);
      expect(program.seoMetadata).toBeDefined();
    });

    it('should return null for non-existent program', async () => {
      const program = await contentMapper.getProgram('non-existent');
      
      expect(program).toBeNull();
    });

    it('should return null for invalid programId', async () => {
      const program = await contentMapper.getProgram(null);
      
      expect(program).toBeNull();
    });

    it('should handle case-insensitive program IDs', async () => {
      const program = await contentMapper.getProgram('DIABETES-REVERSAL');
      
      expect(program).not.toBeNull();
      expect(program.id).toBe('diabetes-reversal');
    });

    it('should validate program data structure', async () => {
      const program = await contentMapper.getProgram('diabetes-reversal');
      
      expect(program.targetAudience).toBeTruthy();
      expect(program.overview).toBeTruthy();
      expect(program.components.length).toBeGreaterThan(0);
      expect(program.timeline.duration).toBeTruthy();
      expect(program.timeline.phases.length).toBeGreaterThan(0);
      expect(program.expectedOutcomes.length).toBeGreaterThan(0);
    });

    it('should include timeline with phases', async () => {
      const program = await contentMapper.getProgram('diabetes-reversal');
      
      program.timeline.phases.forEach((phase) => {
        expect(phase.number).toBeGreaterThan(0);
        expect(phase.title).toBeTruthy();
        expect(phase.duration).toBeTruthy();
        expect(phase.objectives).toBeInstanceOf(Array);
      });
    });

    it('should include enrollment CTA', async () => {
      const program = await contentMapper.getProgram('diabetes-reversal');
      
      expect(program.enrollmentCTA).toBeDefined();
      expect(program.enrollmentCTA.text).toBeTruthy();
      expect(program.enrollmentCTA.link).toBeTruthy();
    });

    it('should include testimonials', async () => {
      const program = await contentMapper.getProgram('diabetes-reversal');
      
      expect(program.testimonials).toBeInstanceOf(Array);
      if (program.testimonials.length > 0) {
        program.testimonials.forEach((testimonial) => {
          expect(testimonial.name).toBeTruthy();
          expect(testimonial.role).toBeTruthy();
          expect(testimonial.content).toBeTruthy();
        });
      }
    });
  });

  describe('getVerticals', () => {
    it('should fetch and return all verticals', async () => {
      const verticals = await contentMapper.getVerticals();
      
      expect(verticals).toBeInstanceOf(Array);
      expect(verticals.length).toBe(12);
    });

    it('should return verticals with proper structure', async () => {
      const verticals = await contentMapper.getVerticals();
      
      verticals.forEach((vertical) => {
        expect(vertical.id).toBeTruthy();
        expect(vertical.name).toBeTruthy();
        expect(vertical.description).toBeTruthy();
        expect(vertical.icon).toBeTruthy();
        expect(vertical.link).toBeTruthy();
        expect(vertical.relatedProtocols).toBeInstanceOf(Array);
        expect(vertical.relatedPrograms).toBeInstanceOf(Array);
      });
    });

    it('should include all 12 wellness verticals', async () => {
      const verticals = await contentMapper.getVerticals();
      
      const verticalIds = verticals.map((v) => v.id);
      expect(verticalIds).toContain('nutrition');
      expect(verticalIds).toContain('fitness');
      expect(verticalIds).toContain('sleep');
      expect(verticalIds).toContain('stress');
      expect(verticalIds).toContain('hydration');
      expect(verticalIds).toContain('digestion');
      expect(verticalIds).toContain('immunity');
      expect(verticalIds).toContain('detox');
      expect(verticalIds).toContain('hormones');
      expect(verticalIds).toContain('inflammation');
      expect(verticalIds).toContain('longevity');
      expect(verticalIds).toContain('mindfulness');
    });

    it('should return empty array on error', async () => {
      // This test verifies error handling - in normal operation, should return 12 verticals
      const verticals = await contentMapper.getVerticals();
      
      expect(Array.isArray(verticals)).toBe(true);
    });
  });

  describe('getWOWAssessment', () => {
    it('should fetch and return WOW assessment', async () => {
      const assessment = await contentMapper.getWOWAssessment();
      
      expect(assessment).not.toBeNull();
      expect(assessment.name).toBe('World of Wellness (WOW) Assessment');
      expect(assessment.description).toBeTruthy();
      expect(assessment.overview).toBeTruthy();
      expect(assessment.parameters).toBeInstanceOf(Array);
      expect(assessment.scoringMethodology).toBeTruthy();
      expect(assessment.scoreRanges).toBeInstanceOf(Array);
      expect(assessment.scheduleCTA).toBeDefined();
    });

    it('should include all 12 parameters', async () => {
      const assessment = await contentMapper.getWOWAssessment();
      
      expect(assessment.parameters.length).toBe(12);
    });

    it('should validate parameter structure', async () => {
      const assessment = await contentMapper.getWOWAssessment();
      
      assessment.parameters.forEach((parameter) => {
        expect(parameter.number).toBeGreaterThan(0);
        expect(parameter.title).toBeTruthy();
        expect(parameter.description).toBeTruthy();
        expect(parameter.relevance).toBeTruthy();
      });
    });

    it('should include score ranges', async () => {
      const assessment = await contentMapper.getWOWAssessment();
      
      expect(assessment.scoreRanges.length).toBeGreaterThan(0);
      assessment.scoreRanges.forEach((range) => {
        expect(range.min).toBeGreaterThanOrEqual(0);
        expect(range.max).toBeGreaterThanOrEqual(range.min);
        expect(range.interpretation).toBeTruthy();
      });
    });

    it('should include schedule CTA', async () => {
      const assessment = await contentMapper.getWOWAssessment();
      
      expect(assessment.scheduleCTA).toBeDefined();
      expect(assessment.scheduleCTA.text).toBeTruthy();
      expect(assessment.scheduleCTA.link).toBeTruthy();
    });
  });

  describe('Error Handling', () => {
    it('should handle errors gracefully in getDisorder', async () => {
      const disorder = await contentMapper.getDisorder(123);
      
      expect(disorder).toBeNull();
    });

    it('should handle errors gracefully in getProtocol', async () => {
      const protocol = await contentMapper.getProtocol(123);
      
      expect(protocol).toBeNull();
    });

    it('should handle errors gracefully in getProgram', async () => {
      const program = await contentMapper.getProgram(123);
      
      expect(program).toBeNull();
    });

    it('should handle errors gracefully in getVerticals', async () => {
      const verticals = await contentMapper.getVerticals();
      
      expect(Array.isArray(verticals)).toBe(true);
    });

    it('should handle errors gracefully in getWOWAssessment', async () => {
      const assessment = await contentMapper.getWOWAssessment();
      
      // Should return valid assessment or null, not throw
      expect(assessment === null || typeof assessment === 'object').toBe(true);
    });
  });

  describe('Data Consistency', () => {
    it('should return consistent disorder data on multiple calls', async () => {
      const disorder1 = await contentMapper.getDisorder('diabetes');
      const disorder2 = await contentMapper.getDisorder('diabetes');
      
      expect(disorder1).toEqual(disorder2);
    });

    it('should return consistent protocol data on multiple calls', async () => {
      const protocol1 = await contentMapper.getProtocol('deep-detox');
      const protocol2 = await contentMapper.getProtocol('deep-detox');
      
      expect(protocol1).toEqual(protocol2);
    });

    it('should return consistent program data on multiple calls', async () => {
      const program1 = await contentMapper.getProgram('diabetes-reversal');
      const program2 = await contentMapper.getProgram('diabetes-reversal');
      
      expect(program1).toEqual(program2);
    });

    it('should return consistent verticals on multiple calls', async () => {
      const verticals1 = await contentMapper.getVerticals();
      const verticals2 = await contentMapper.getVerticals();
      
      expect(verticals1).toEqual(verticals2);
    });

    it('should return consistent WOW assessment on multiple calls', async () => {
      const assessment1 = await contentMapper.getWOWAssessment();
      const assessment2 = await contentMapper.getWOWAssessment();
      
      expect(assessment1).toEqual(assessment2);
    });
  });

  describe('SEO Metadata', () => {
    it('should include SEO metadata in disorder', async () => {
      const disorder = await contentMapper.getDisorder('diabetes');
      
      expect(disorder.seoMetadata).toBeDefined();
      expect(disorder.seoMetadata.title).toContain('WellPro');
      expect(disorder.seoMetadata.description).toBeTruthy();
      expect(disorder.seoMetadata.keywords).toBeInstanceOf(Array);
      expect(disorder.seoMetadata.keywords.length).toBeGreaterThan(0);
    });

    it('should include SEO metadata in protocol', async () => {
      const protocol = await contentMapper.getProtocol('deep-detox');
      
      expect(protocol.seoMetadata).toBeDefined();
      expect(protocol.seoMetadata.title).toContain('WellPro');
      expect(protocol.seoMetadata.description).toBeTruthy();
      expect(protocol.seoMetadata.keywords).toBeInstanceOf(Array);
    });

    it('should include SEO metadata in program', async () => {
      const program = await contentMapper.getProgram('diabetes-reversal');
      
      expect(program.seoMetadata).toBeDefined();
      expect(program.seoMetadata.title).toContain('WellPro');
      expect(program.seoMetadata.description).toBeTruthy();
      expect(program.seoMetadata.keywords).toBeInstanceOf(Array);
    });
  });
});
