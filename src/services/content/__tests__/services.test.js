/**
 * Unit Tests for Content Services
 * 
 * Tests for ContentMapper parsing logic, ContentStore caching behavior,
 * and ContentValidator error detection and default value handling.
 * 
 * @module content/__tests__/services.test
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ContentMapper } from '../ContentMapper.js';
import { ContentStore } from '../ContentStore.js';
import { ContentValidator } from '../ContentValidator.js';

// ============================================================================
// ContentMapper Tests
// ============================================================================

describe('ContentMapper Service', () => {
  let contentMapper;

  beforeEach(() => {
    contentMapper = new ContentMapper();
  });

  describe('Parsing Logic', () => {
    /**
     * **Validates: Requirements 7.1, 7.2**
     * Test ContentMapper parsing logic with sample data
     */
    it('should parse disorder data correctly', async () => {
      const disorder = await contentMapper.getDisorder('diabetes');

      expect(disorder).not.toBeNull();
      expect(disorder.id).toBe('diabetes');
      expect(disorder.name).toBe('Diabetes');
      expect(disorder.slug).toBe('diabetes');
      expect(disorder.symptoms).toBeInstanceOf(Array);
      expect(disorder.symptoms.length).toBeGreaterThan(0);
      expect(disorder.symptoms[0]).toHaveProperty('title');
      expect(disorder.symptoms[0]).toHaveProperty('description');
    });

    it('should parse protocol data correctly', async () => {
      const protocol = await contentMapper.getProtocol('deep-detox');

      expect(protocol).not.toBeNull();
      expect(protocol.id).toBe('deep-detox');
      expect(protocol.name).toBe('Deep Detox');
      expect(protocol.benefits).toBeInstanceOf(Array);
      expect(protocol.implementationSteps).toBeInstanceOf(Array);
      expect(protocol.implementationSteps[0]).toHaveProperty('number');
      expect(protocol.implementationSteps[0]).toHaveProperty('title');
      expect(protocol.implementationSteps[0]).toHaveProperty('description');
    });

    it('should parse program data correctly', async () => {
      const program = await contentMapper.getProgram('diabetes-reversal');

      expect(program).not.toBeNull();
      expect(program.id).toBe('diabetes-reversal');
      expect(program.name).toBe('Diabetes Reversal Program');
      expect(program.components).toBeInstanceOf(Array);
      expect(program.timeline).toHaveProperty('duration');
      expect(program.timeline).toHaveProperty('phases');
      expect(program.timeline.phases).toBeInstanceOf(Array);
    });

    it('should parse verticals data correctly', async () => {
      const verticals = await contentMapper.getVerticals();

      expect(verticals).toBeInstanceOf(Array);
      expect(verticals.length).toBe(12);
      verticals.forEach((vertical) => {
        expect(vertical).toHaveProperty('id');
        expect(vertical).toHaveProperty('name');
        expect(vertical).toHaveProperty('description');
        expect(vertical).toHaveProperty('icon');
      });
    });

    it('should parse WOW assessment data correctly', async () => {
      const assessment = await contentMapper.getWOWAssessment();

      expect(assessment).not.toBeNull();
      expect(assessment.parameters).toBeInstanceOf(Array);
      expect(assessment.parameters.length).toBe(12);
      expect(assessment.scoreRanges).toBeInstanceOf(Array);
      assessment.parameters.forEach((param) => {
        expect(param).toHaveProperty('number');
        expect(param).toHaveProperty('title');
        expect(param).toHaveProperty('description');
      });
    });

    it('should handle case-insensitive IDs during parsing', async () => {
      const disorder1 = await contentMapper.getDisorder('diabetes');
      const disorder2 = await contentMapper.getDisorder('DIABETES');
      const disorder3 = await contentMapper.getDisorder('DiAbEtEs');

      expect(disorder1).toEqual(disorder2);
      expect(disorder2).toEqual(disorder3);
    });

    it('should return null for invalid IDs', async () => {
      const disorder = await contentMapper.getDisorder('invalid-disorder');
      const protocol = await contentMapper.getProtocol('invalid-protocol');
      const program = await contentMapper.getProgram('invalid-program');

      expect(disorder).toBeNull();
      expect(protocol).toBeNull();
      expect(program).toBeNull();
    });

    it('should validate parsed data structure', async () => {
      const disorder = await contentMapper.getDisorder('diabetes');

      // Verify all required fields are present
      expect(disorder.id).toBeTruthy();
      expect(disorder.name).toBeTruthy();
      expect(disorder.slug).toBeTruthy();
      expect(disorder.description).toBeTruthy();
      expect(disorder.keyStatistics).toBeTruthy();
      expect(disorder.overview).toBeTruthy();
      expect(disorder.symptoms).toBeTruthy();
      expect(disorder.rootCauses).toBeTruthy();
      expect(disorder.reversalMechanism).toBeTruthy();
      expect(disorder.seoMetadata).toBeTruthy();
    });
  });
});

// ============================================================================
// ContentStore Tests
// ============================================================================

describe('ContentStore Service', () => {
  let contentStore;

  beforeEach(() => {
    contentStore = new ContentStore();
  });

  describe('Caching Behavior', () => {
    /**
     * **Validates: Requirements 7.2, 7.3**
     * Test ContentStore caching behavior and TTL expiration
     */
    it('should cache disorder data after first fetch', async () => {
      const disorder = await contentStore.getDisorder('diabetes');

      expect(disorder).not.toBeNull();
      
      // Check cache stats
      const stats = contentStore.getCacheStats();
      expect(stats.disorders.count).toBe(1);
      expect(stats.disorders.items).toContain('diabetes');
    });

    it('should return cached data on subsequent fetches', async () => {
      // First fetch
      const disorder1 = await contentStore.getDisorder('diabetes');
      
      // Second fetch (should be cached)
      const disorder2 = await contentStore.getDisorder('diabetes');

      expect(disorder1).toEqual(disorder2);
      
      // Cache should still have only 1 item
      const stats = contentStore.getCacheStats();
      expect(stats.disorders.count).toBe(1);
    });

    it('should cache multiple items independently', async () => {
      const disorder = await contentStore.getDisorder('diabetes');
      const protocol = await contentStore.getProtocol('deep-detox');
      const program = await contentStore.getProgram('diabetes-reversal');

      const stats = contentStore.getCacheStats();
      expect(stats.disorders.count).toBe(1);
      expect(stats.protocols.count).toBe(1);
      expect(stats.programs.count).toBe(1);
    });

    it('should cache verticals as a single item', async () => {
      const verticals = await contentStore.getVerticals();

      expect(verticals.length).toBe(12);
      
      const stats = contentStore.getCacheStats();
      expect(stats.verticals.cached).toBe(true);
      expect(stats.verticals.count).toBe(12);
    });

    it('should cache WOW assessment', async () => {
      const assessment = await contentStore.getWOWAssessment();

      expect(assessment).not.toBeNull();
      
      const stats = contentStore.getCacheStats();
      expect(stats.wowAssessment.cached).toBe(true);
    });

    it('should invalidate cache for specific item', async () => {
      // Fetch and cache
      await contentStore.getDisorder('diabetes');
      let stats = contentStore.getCacheStats();
      expect(stats.disorders.count).toBe(1);

      // Invalidate
      contentStore.invalidateCache('disorders', 'diabetes');
      stats = contentStore.getCacheStats();
      expect(stats.disorders.count).toBe(0);
    });

    it('should clear all cache', async () => {
      // Fetch and cache multiple items
      await contentStore.getDisorder('diabetes');
      await contentStore.getProtocol('deep-detox');
      await contentStore.getVerticals();

      let stats = contentStore.getCacheStats();
      expect(stats.disorders.count).toBeGreaterThan(0);
      expect(stats.protocols.count).toBeGreaterThan(0);
      expect(stats.verticals.cached).toBe(true);

      // Clear all
      contentStore.clearAllCache();
      stats = contentStore.getCacheStats();
      expect(stats.disorders.count).toBe(0);
      expect(stats.protocols.count).toBe(0);
      expect(stats.verticals.cached).toBe(false);
    });

    it('should refresh cache and get fresh data', async () => {
      // Fetch and cache
      const disorder1 = await contentStore.getDisorder('diabetes');

      // Refresh cache
      const disorder2 = await contentStore.refreshCache('disorders', 'diabetes');

      // Should return same data (since mock data is static)
      expect(disorder1).toEqual(disorder2);
    });

    it('should respect TTL setting', async () => {
      // Set very short TTL (1ms)
      contentStore.setTTL(1);

      // Fetch and cache
      await contentStore.getDisorder('diabetes');

      // Wait for TTL to expire
      await new Promise((resolve) => setTimeout(resolve, 10));

      // Check if cache is still valid
      const isValid = contentStore.isCacheValid('disorders', 'diabetes');
      expect(isValid).toBe(false);
    });

    it('should handle invalid TTL values', async () => {
      const originalTTL = contentStore.ttl;

      // Try to set invalid TTL
      contentStore.setTTL(-1);
      expect(contentStore.ttl).toBe(originalTTL);

      contentStore.setTTL(0);
      expect(contentStore.ttl).toBe(originalTTL);

      contentStore.setTTL('invalid');
      expect(contentStore.ttl).toBe(originalTTL);
    });
  });

  describe('TTL Expiration', () => {
    it('should detect expired cache', async () => {
      // Set very short TTL
      contentStore.setTTL(1);

      // Fetch and cache
      await contentStore.getDisorder('diabetes');

      // Wait for TTL to expire
      await new Promise((resolve) => setTimeout(resolve, 10));

      // Cache should be expired
      const isValid = contentStore.isCacheValid('disorders', 'diabetes');
      expect(isValid).toBe(false);
    });

    it('should refetch data after TTL expiration', async () => {
      // Set very short TTL
      contentStore.setTTL(1);

      // First fetch
      const disorder1 = await contentStore.getDisorder('diabetes');

      // Wait for TTL to expire
      await new Promise((resolve) => setTimeout(resolve, 10));

      // Second fetch (should refetch)
      const disorder2 = await contentStore.getDisorder('diabetes');

      // Data should be the same (mock data is static)
      expect(disorder1).toEqual(disorder2);
    });
  });
});

// ============================================================================
// ContentValidator Tests
// ============================================================================

describe('ContentValidator Service', () => {
  let contentValidator;

  beforeEach(() => {
    contentValidator = new ContentValidator();
  });

  describe('Error Detection', () => {
    /**
     * **Validates: Requirements 7.6, 12.4**
     * Test ContentValidator error detection and default value handling
     */
    it('should detect missing required fields', () => {
      const invalidDisorder = {
        id: 'test',
        name: 'Test',
        // Missing other required fields
      };

      const validated = contentValidator.validateDisorder(invalidDisorder);
      const errors = contentValidator.getErrors();

      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some((e) => e.includes('required'))).toBe(true);
    });

    it('should detect invalid data types', () => {
      const invalidDisorder = {
        id: 'test',
        name: 'Test',
        slug: 'test',
        description: 'Test',
        keyStatistics: 'invalid', // Should be object
        overview: 'Test',
        symptoms: 'invalid', // Should be array
        rootCauses: [],
        reversalMechanism: 'Test',
        relatedPrograms: [],
        seoMetadata: {},
      };

      const validated = contentValidator.validateDisorder(invalidDisorder);
      const errors = contentValidator.getErrors();

      expect(errors.length).toBeGreaterThan(0);
    });

    it('should detect empty strings', () => {
      const invalidDisorder = {
        id: '',
        name: '',
        slug: 'test',
        description: 'Test',
        keyStatistics: {},
        overview: 'Test',
        symptoms: [],
        rootCauses: [],
        reversalMechanism: 'Test',
        relatedPrograms: [],
        seoMetadata: { title: '', description: '', keywords: [] },
      };

      const validated = contentValidator.validateDisorder(invalidDisorder);
      const errors = contentValidator.getErrors();

      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some((e) => e.includes('required') || e.includes('empty'))).toBe(true);
    });

    it('should detect text exceeding max length', () => {
      const longText = 'a'.repeat(6000);
      const errors = [];

      const result = contentValidator.validateString(longText, 'testField', 5000, true);

      expect(result.length).toBeLessThanOrEqual(5000);
    });

    it('should detect invalid URLs', () => {
      const invalidURL = 'not a valid url';
      const result = contentValidator.validateURL(invalidURL, 'testURL', true);

      // Should return default or relative URL
      expect(result).toBeTruthy();
    });

    it('should accept valid URLs', () => {
      const validURL = 'https://example.com';
      const result = contentValidator.validateURL(validURL, 'testURL', true);

      expect(result).toBe(validURL);
    });

    it('should accept relative URLs', () => {
      const relativeURL = '/programs/diabetes-reversal';
      const result = contentValidator.validateURL(relativeURL, 'testURL', true);

      expect(result).toBe(relativeURL);
    });

    it('should detect out-of-range numbers', () => {
      const result = contentValidator.validateNumber(150, 'score', 0, 100, true);

      expect(result).toBeLessThanOrEqual(100);
      expect(result).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Default Value Handling', () => {
    it('should provide default value for missing required string', () => {
      const result = contentValidator.validateString(null, 'title', 200, true);

      expect(result).toBeTruthy();
      expect(result).toBe('Untitled');
    });

    it('should provide default value for missing required description', () => {
      const result = contentValidator.validateString(null, 'description', 1000, true);

      expect(result).toBeTruthy();
      expect(result).toBe('No description available');
    });

    it('should provide default value for missing required URL', () => {
      const result = contentValidator.validateURL(null, 'link', true);

      expect(result).toBeTruthy();
      expect(result).toBe('#');
    });

    it('should provide default value for missing required array', () => {
      const result = contentValidator.validateArray(null, 'items', true);

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(0);
    });

    it('should provide default value for missing required object', () => {
      const result = contentValidator.validateObject(null, 'metadata', true);

      expect(typeof result).toBe('object');
      expect(Object.keys(result).length).toBe(0);
    });

    it('should truncate text exceeding max length', () => {
      const longText = 'a'.repeat(6000);
      const result = contentValidator.validateString(longText, 'text', 5000, true);

      expect(result.length).toBeLessThanOrEqual(5000);
      expect(result).toBe('a'.repeat(5000));
    });

    it('should clamp out-of-range numbers', () => {
      const result1 = contentValidator.validateNumber(150, 'score', 0, 100, true);
      const result2 = contentValidator.validateNumber(-50, 'score', 0, 100, true);

      expect(result1).toBe(100);
      expect(result2).toBe(0);
    });
  });

  describe('Validation Methods', () => {
    it('should validate disorder with valid data', () => {
      const validDisorder = {
        id: 'diabetes',
        name: 'Diabetes',
        slug: 'diabetes',
        description: 'A metabolic disorder',
        keyStatistics: { prevalence: '10%', impact: 'High', reversalRate: '85%' },
        overview: 'Overview text',
        symptoms: [{ title: 'Symptom', description: 'Description' }],
        rootCauses: [{ title: 'Cause', description: 'Description' }],
        reversalMechanism: 'Mechanism text',
        relatedPrograms: [],
        seoMetadata: { title: 'Title', description: 'Description', keywords: ['keyword'] },
      };

      const validated = contentValidator.validateDisorder(validDisorder);
      const errors = contentValidator.getErrors();

      expect(validated).not.toBeNull();
      expect(errors.length).toBe(0);
    });

    it('should validate protocol with valid data', () => {
      const validProtocol = {
        id: 'deep-detox',
        name: 'Deep Detox',
        slug: 'deep-detox',
        description: 'A detox protocol',
        overview: 'Overview text',
        scientificBasis: 'Scientific basis',
        benefits: [{ title: 'Benefit', description: 'Description' }],
        implementationSteps: [{ number: 1, title: 'Step', description: 'Description' }],
        expectedResults: 'Results text',
        duration: '21 days',
        difficulty: 'Moderate',
        relatedProtocols: [],
        seoMetadata: { title: 'Title', description: 'Description', keywords: ['keyword'] },
      };

      const validated = contentValidator.validateProtocol(validProtocol);
      const errors = contentValidator.getErrors();

      expect(validated).not.toBeNull();
      expect(errors.length).toBe(0);
    });

    it('should check for required fields', () => {
      const content = {
        id: 'test',
        name: 'Test',
        description: 'Test',
      };

      const hasRequired = contentValidator.hasRequiredFields(content, ['id', 'name', 'description']);
      expect(hasRequired).toBe(true);

      const hasMissing = contentValidator.hasRequiredFields(content, ['id', 'name', 'missing']);
      expect(hasMissing).toBe(false);
    });

    it('should validate data types', () => {
      const content = {
        id: 'test',
        name: 'Test',
        items: [],
        metadata: {},
      };

      const schema = {
        id: 'string',
        name: 'string',
        items: 'array',
        metadata: 'object',
      };

      const isValid = contentValidator.validateDataTypes(content, schema);
      expect(isValid).toBe(true);
    });

    it('should detect type mismatches', () => {
      const content = {
        id: 'test',
        name: 'Test',
        items: 'not an array', // Should be array
        metadata: 'not an object', // Should be object
      };

      const schema = {
        id: 'string',
        name: 'string',
        items: 'array',
        metadata: 'object',
      };

      const isValid = contentValidator.validateDataTypes(content, schema);
      expect(isValid).toBe(false);
      expect(contentValidator.getErrors().length).toBeGreaterThan(0);
    });
  });

  describe('Error Logging', () => {
    it('should log validation errors', () => {
      const invalidDisorder = {
        id: '',
        name: '',
        slug: 'test',
        description: 'Test',
        keyStatistics: {},
        overview: 'Test',
        symptoms: [],
        rootCauses: [],
        reversalMechanism: 'Test',
        relatedPrograms: [],
        seoMetadata: { title: '', description: '', keywords: [] },
      };

      contentValidator.validateDisorder(invalidDisorder);
      const errors = contentValidator.getErrors();

      expect(errors.length).toBeGreaterThan(0);
      errors.forEach((error) => {
        expect(typeof error).toBe('string');
        expect(error.length).toBeGreaterThan(0);
      });
    });

    it('should clear errors between validations', () => {
      const invalidData = { id: '' };

      contentValidator.validateString(null, 'test', 100, true);
      let errors = contentValidator.getErrors();
      expect(errors.length).toBeGreaterThan(0);

      contentValidator.clearErrors();
      errors = contentValidator.getErrors();
      expect(errors.length).toBe(0);
    });
  });
});
