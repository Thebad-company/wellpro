/**
 * Property-Based Tests for Content Data Models
 * 
 * These tests verify universal correctness properties that should hold
 * across all valid content data structures.
 * 
 * @module content/__tests__/properties.test
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { ContentMapper } from '../ContentMapper.js';
import { ContentStore } from '../ContentStore.js';
import { ContentValidator } from '../ContentValidator.js';

// ============================================================================
// Property 1: Content Mapper Extracts All Required Fields
// ============================================================================

describe('Property 1: Content Mapper Extracts All Required Fields', () => {
  let contentMapper;

  beforeEach(() => {
    contentMapper = new ContentMapper();
  });

  /**
   * **Validates: Requirements 7.2, 7.5**
   * 
   * For any valid disorder data structure from wellpro.one, the ContentMapper
   * SHALL extract all required fields (title, description, sections, metadata)
   * and map them to the internal data model without loss or corruption.
   */
  it('should extract all required fields from disorder data', async () => {
    const disorder = await contentMapper.getDisorder('diabetes');

    expect(disorder).not.toBeNull();
    
    // Verify all required fields are present
    expect(disorder).toHaveProperty('id');
    expect(disorder).toHaveProperty('name');
    expect(disorder).toHaveProperty('slug');
    expect(disorder).toHaveProperty('description');
    expect(disorder).toHaveProperty('keyStatistics');
    expect(disorder).toHaveProperty('overview');
    expect(disorder).toHaveProperty('symptoms');
    expect(disorder).toHaveProperty('rootCauses');
    expect(disorder).toHaveProperty('reversalMechanism');
    expect(disorder).toHaveProperty('relatedPrograms');
    expect(disorder).toHaveProperty('seoMetadata');

    // Verify fields are not empty
    expect(disorder.id).toBeTruthy();
    expect(disorder.name).toBeTruthy();
    expect(disorder.description).toBeTruthy();
    expect(disorder.overview).toBeTruthy();
    expect(disorder.seoMetadata).toBeTruthy();
  });

  it('should extract all required fields from protocol data', async () => {
    const protocol = await contentMapper.getProtocol('deep-detox');

    expect(protocol).not.toBeNull();

    // Verify all required fields are present
    expect(protocol).toHaveProperty('id');
    expect(protocol).toHaveProperty('name');
    expect(protocol).toHaveProperty('slug');
    expect(protocol).toHaveProperty('description');
    expect(protocol).toHaveProperty('overview');
    expect(protocol).toHaveProperty('scientificBasis');
    expect(protocol).toHaveProperty('benefits');
    expect(protocol).toHaveProperty('implementationSteps');
    expect(protocol).toHaveProperty('expectedResults');
    expect(protocol).toHaveProperty('duration');
    expect(protocol).toHaveProperty('difficulty');
    expect(protocol).toHaveProperty('seoMetadata');

    // Verify fields are not empty
    expect(protocol.id).toBeTruthy();
    expect(protocol.name).toBeTruthy();
    expect(protocol.description).toBeTruthy();
    expect(protocol.seoMetadata).toBeTruthy();
  });

  it('should extract all required fields from program data', async () => {
    const program = await contentMapper.getProgram('diabetes-reversal');

    expect(program).not.toBeNull();

    // Verify all required fields are present
    expect(program).toHaveProperty('id');
    expect(program).toHaveProperty('name');
    expect(program).toHaveProperty('slug');
    expect(program).toHaveProperty('description');
    expect(program).toHaveProperty('targetAudience');
    expect(program).toHaveProperty('overview');
    expect(program).toHaveProperty('components');
    expect(program).toHaveProperty('timeline');
    expect(program).toHaveProperty('expectedOutcomes');
    expect(program).toHaveProperty('enrollmentCTA');
    expect(program).toHaveProperty('seoMetadata');

    // Verify fields are not empty
    expect(program.id).toBeTruthy();
    expect(program.name).toBeTruthy();
    expect(program.description).toBeTruthy();
    expect(program.seoMetadata).toBeTruthy();
  });

  it('should extract all required fields from vertical data', async () => {
    const verticals = await contentMapper.getVerticals();

    expect(verticals.length).toBeGreaterThan(0);

    // Check first vertical
    const vertical = verticals[0];
    expect(vertical).toHaveProperty('id');
    expect(vertical).toHaveProperty('name');
    expect(vertical).toHaveProperty('description');
    expect(vertical).toHaveProperty('icon');
    expect(vertical).toHaveProperty('link');
    expect(vertical).toHaveProperty('relatedProtocols');
    expect(vertical).toHaveProperty('relatedPrograms');

    // Verify fields are not empty
    expect(vertical.id).toBeTruthy();
    expect(vertical.name).toBeTruthy();
    expect(vertical.description).toBeTruthy();
  });

  it('should extract all required fields from WOW assessment data', async () => {
    const assessment = await contentMapper.getWOWAssessment();

    expect(assessment).not.toBeNull();

    // Verify all required fields are present
    expect(assessment).toHaveProperty('name');
    expect(assessment).toHaveProperty('description');
    expect(assessment).toHaveProperty('overview');
    expect(assessment).toHaveProperty('parameters');
    expect(assessment).toHaveProperty('scoringMethodology');
    expect(assessment).toHaveProperty('scoreRanges');
    expect(assessment).toHaveProperty('scheduleCTA');

    // Verify fields are not empty
    expect(assessment.name).toBeTruthy();
    expect(assessment.description).toBeTruthy();
    expect(assessment.parameters).toBeInstanceOf(Array);
    expect(assessment.parameters.length).toBeGreaterThan(0);
  });

  it('should preserve data integrity when extracting fields', async () => {
    const disorder = await contentMapper.getDisorder('diabetes');

    // Verify data is not corrupted
    expect(disorder.id).toBe('diabetes');
    expect(disorder.name).toBe('Diabetes');
    expect(disorder.symptoms).toBeInstanceOf(Array);
    expect(disorder.symptoms.length).toBeGreaterThan(0);
    
    // Verify nested objects are intact
    expect(disorder.keyStatistics).toHaveProperty('prevalence');
    expect(disorder.keyStatistics).toHaveProperty('impact');
    expect(disorder.keyStatistics).toHaveProperty('reversalRate');
  });
});

// ============================================================================
// Property 5: Content Store Returns Consistent Data Structure
// ============================================================================

describe('Property 5: Content Store Returns Consistent Data Structure', () => {
  let contentStore;

  beforeEach(() => {
    contentStore = new ContentStore();
  });

  /**
   * **Validates: Requirements 7.2, 7.5**
   * 
   * For any content request to the ContentStore, the returned data SHALL have
   * a consistent JSON structure with all required fields present and properly
   * formatted, regardless of whether data is cached or freshly fetched.
   */
  it('should return consistent structure for disorder on first fetch', async () => {
    const disorder = await contentStore.getDisorder('diabetes');

    expect(disorder).not.toBeNull();
    expect(typeof disorder).toBe('object');
    expect(disorder.id).toBe('diabetes');
    expect(disorder.name).toBe('Diabetes');
    expect(Array.isArray(disorder.symptoms)).toBe(true);
    expect(typeof disorder.seoMetadata).toBe('object');
  });

  it('should return consistent structure for disorder on cached fetch', async () => {
    // First fetch
    const disorder1 = await contentStore.getDisorder('diabetes');
    
    // Second fetch (should be cached)
    const disorder2 = await contentStore.getDisorder('diabetes');

    // Both should have identical structure
    expect(disorder1).toEqual(disorder2);
    expect(disorder1.id).toBe(disorder2.id);
    expect(disorder1.name).toBe(disorder2.name);
    expect(disorder1.symptoms.length).toBe(disorder2.symptoms.length);
  });

  it('should return consistent structure for protocol on first fetch', async () => {
    const protocol = await contentStore.getProtocol('deep-detox');

    expect(protocol).not.toBeNull();
    expect(typeof protocol).toBe('object');
    expect(protocol.id).toBe('deep-detox');
    expect(Array.isArray(protocol.benefits)).toBe(true);
    expect(Array.isArray(protocol.implementationSteps)).toBe(true);
    expect(typeof protocol.seoMetadata).toBe('object');
  });

  it('should return consistent structure for protocol on cached fetch', async () => {
    // First fetch
    const protocol1 = await contentStore.getProtocol('deep-detox');
    
    // Second fetch (should be cached)
    const protocol2 = await contentStore.getProtocol('deep-detox');

    // Both should have identical structure
    expect(protocol1).toEqual(protocol2);
    expect(protocol1.benefits.length).toBe(protocol2.benefits.length);
    expect(protocol1.implementationSteps.length).toBe(protocol2.implementationSteps.length);
  });

  it('should return consistent structure for program on first fetch', async () => {
    const program = await contentStore.getProgram('diabetes-reversal');

    expect(program).not.toBeNull();
    expect(typeof program).toBe('object');
    expect(program.id).toBe('diabetes-reversal');
    expect(Array.isArray(program.components)).toBe(true);
    expect(typeof program.timeline).toBe('object');
    expect(Array.isArray(program.expectedOutcomes)).toBe(true);
  });

  it('should return consistent structure for program on cached fetch', async () => {
    // First fetch
    const program1 = await contentStore.getProgram('diabetes-reversal');
    
    // Second fetch (should be cached)
    const program2 = await contentStore.getProgram('diabetes-reversal');

    // Both should have identical structure
    expect(program1).toEqual(program2);
    expect(program1.components.length).toBe(program2.components.length);
    expect(program1.timeline.phases.length).toBe(program2.timeline.phases.length);
  });

  it('should return consistent structure for verticals on first fetch', async () => {
    const verticals = await contentStore.getVerticals();

    expect(Array.isArray(verticals)).toBe(true);
    expect(verticals.length).toBe(12);
    
    // Check structure of each vertical
    verticals.forEach((vertical) => {
      expect(vertical).toHaveProperty('id');
      expect(vertical).toHaveProperty('name');
      expect(vertical).toHaveProperty('description');
      expect(vertical).toHaveProperty('icon');
      expect(vertical).toHaveProperty('link');
      expect(Array.isArray(vertical.relatedProtocols)).toBe(true);
      expect(Array.isArray(vertical.relatedPrograms)).toBe(true);
    });
  });

  it('should return consistent structure for verticals on cached fetch', async () => {
    // First fetch
    const verticals1 = await contentStore.getVerticals();
    
    // Second fetch (should be cached)
    const verticals2 = await contentStore.getVerticals();

    // Both should have identical structure
    expect(verticals1).toEqual(verticals2);
    expect(verticals1.length).toBe(verticals2.length);
  });

  it('should return consistent structure for WOW assessment on first fetch', async () => {
    const assessment = await contentStore.getWOWAssessment();

    expect(assessment).not.toBeNull();
    expect(typeof assessment).toBe('object');
    expect(Array.isArray(assessment.parameters)).toBe(true);
    expect(assessment.parameters.length).toBe(12);
    expect(Array.isArray(assessment.scoreRanges)).toBe(true);
    expect(typeof assessment.scheduleCTA).toBe('object');
  });

  it('should return consistent structure for WOW assessment on cached fetch', async () => {
    // First fetch
    const assessment1 = await contentStore.getWOWAssessment();
    
    // Second fetch (should be cached)
    const assessment2 = await contentStore.getWOWAssessment();

    // Both should have identical structure
    expect(assessment1).toEqual(assessment2);
    expect(assessment1.parameters.length).toBe(assessment2.parameters.length);
    expect(assessment1.scoreRanges.length).toBe(assessment2.scoreRanges.length);
  });

  it('should maintain consistent structure across multiple content types', async () => {
    const disorder = await contentStore.getDisorder('diabetes');
    const protocol = await contentStore.getProtocol('deep-detox');
    const program = await contentStore.getProgram('diabetes-reversal');
    const verticals = await contentStore.getVerticals();
    const assessment = await contentStore.getWOWAssessment();

    // All should be objects or arrays
    expect(typeof disorder).toBe('object');
    expect(typeof protocol).toBe('object');
    expect(typeof program).toBe('object');
    expect(Array.isArray(verticals)).toBe(true);
    expect(typeof assessment).toBe('object');

    // All should have required fields
    expect(disorder.id).toBeTruthy();
    expect(protocol.id).toBeTruthy();
    expect(program.id).toBeTruthy();
    expect(verticals.length).toBeGreaterThan(0);
    expect(assessment.name).toBeTruthy();
  });

  it('should return consistent structure when cache is cleared', async () => {
    // First fetch
    const disorder1 = await contentStore.getDisorder('diabetes');
    
    // Clear cache
    contentStore.clearAllCache();
    
    // Second fetch (should be fresh)
    const disorder2 = await contentStore.getDisorder('diabetes');

    // Both should have identical structure
    expect(disorder1).toEqual(disorder2);
  });

  it('should return consistent structure when cache is invalidated', async () => {
    // First fetch
    const disorder1 = await contentStore.getDisorder('diabetes');
    
    // Invalidate cache
    contentStore.invalidateCache('disorders', 'diabetes');
    
    // Second fetch (should be fresh)
    const disorder2 = await contentStore.getDisorder('diabetes');

    // Both should have identical structure
    expect(disorder1).toEqual(disorder2);
  });
});
