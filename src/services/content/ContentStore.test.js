/**
 * ContentStore Tests
 * Tests for caching, retrieval, and cache management functionality
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ContentStore } from './ContentStore.js';
import { contentMapper } from './ContentMapper.js';

// Mock ContentMapper
vi.mock('./ContentMapper.js', () => ({
  contentMapper: {
    getDisorder: vi.fn(),
    getProtocol: vi.fn(),
    getProgram: vi.fn(),
    getVerticals: vi.fn(),
    getWOWAssessment: vi.fn(),
  },
}));

describe('ContentStore', () => {
  let store;

  beforeEach(() => {
    store = new ContentStore(1000); // 1 second TTL for testing
    vi.clearAllMocks();
  });

  describe('getDisorder', () => {
    it('should fetch and cache a disorder', async () => {
      const mockDisorder = {
        id: 'diabetes',
        name: 'Diabetes',
        description: 'Test disorder',
      };

      contentMapper.getDisorder.mockResolvedValue(mockDisorder);

      const result = await store.getDisorder('diabetes');

      expect(result).toEqual(mockDisorder);
      expect(contentMapper.getDisorder).toHaveBeenCalledWith('diabetes');
    });

    it('should return cached disorder on subsequent calls', async () => {
      const mockDisorder = {
        id: 'diabetes',
        name: 'Diabetes',
        description: 'Test disorder',
      };

      contentMapper.getDisorder.mockResolvedValue(mockDisorder);

      // First call
      await store.getDisorder('diabetes');
      // Second call
      const result = await store.getDisorder('diabetes');

      expect(result).toEqual(mockDisorder);
      expect(contentMapper.getDisorder).toHaveBeenCalledTimes(1);
    });

    it('should return null for invalid disorderId', async () => {
      const result = await store.getDisorder(null);
      expect(result).toBeNull();
    });

    it('should return null when ContentMapper returns null', async () => {
      contentMapper.getDisorder.mockResolvedValue(null);

      const result = await store.getDisorder('nonexistent');

      expect(result).toBeNull();
    });

    it('should handle case-insensitive disorder IDs', async () => {
      const mockDisorder = {
        id: 'diabetes',
        name: 'Diabetes',
        description: 'Test disorder',
      };

      contentMapper.getDisorder.mockResolvedValue(mockDisorder);

      const result1 = await store.getDisorder('DIABETES');
      const result2 = await store.getDisorder('diabetes');

      expect(result1).toEqual(mockDisorder);
      expect(result2).toEqual(mockDisorder);
      expect(contentMapper.getDisorder).toHaveBeenCalledTimes(1);
    });

    it('should handle errors gracefully', async () => {
      contentMapper.getDisorder.mockRejectedValue(new Error('Network error'));

      const result = await store.getDisorder('diabetes');

      expect(result).toBeNull();
    });
  });

  describe('getProtocol', () => {
    it('should fetch and cache a protocol', async () => {
      const mockProtocol = {
        id: 'deep-detox',
        name: 'Deep Detox',
        description: 'Test protocol',
      };

      contentMapper.getProtocol.mockResolvedValue(mockProtocol);

      const result = await store.getProtocol('deep-detox');

      expect(result).toEqual(mockProtocol);
      expect(contentMapper.getProtocol).toHaveBeenCalledWith('deep-detox');
    });

    it('should return cached protocol on subsequent calls', async () => {
      const mockProtocol = {
        id: 'deep-detox',
        name: 'Deep Detox',
        description: 'Test protocol',
      };

      contentMapper.getProtocol.mockResolvedValue(mockProtocol);

      await store.getProtocol('deep-detox');
      const result = await store.getProtocol('deep-detox');

      expect(result).toEqual(mockProtocol);
      expect(contentMapper.getProtocol).toHaveBeenCalledTimes(1);
    });

    it('should return null for invalid protocolId', async () => {
      const result = await store.getProtocol(null);
      expect(result).toBeNull();
    });
  });

  describe('getProgram', () => {
    it('should fetch and cache a program', async () => {
      const mockProgram = {
        id: 'diabetes-reversal',
        name: 'Diabetes Reversal Program',
        description: 'Test program',
      };

      contentMapper.getProgram.mockResolvedValue(mockProgram);

      const result = await store.getProgram('diabetes-reversal');

      expect(result).toEqual(mockProgram);
      expect(contentMapper.getProgram).toHaveBeenCalledWith('diabetes-reversal');
    });

    it('should return cached program on subsequent calls', async () => {
      const mockProgram = {
        id: 'diabetes-reversal',
        name: 'Diabetes Reversal Program',
        description: 'Test program',
      };

      contentMapper.getProgram.mockResolvedValue(mockProgram);

      await store.getProgram('diabetes-reversal');
      const result = await store.getProgram('diabetes-reversal');

      expect(result).toEqual(mockProgram);
      expect(contentMapper.getProgram).toHaveBeenCalledTimes(1);
    });

    it('should return null for invalid programId', async () => {
      const result = await store.getProgram(null);
      expect(result).toBeNull();
    });
  });

  describe('getVerticals', () => {
    it('should fetch and cache verticals', async () => {
      const mockVerticals = [
        { id: 'nutrition', name: 'Nutrition' },
        { id: 'fitness', name: 'Fitness' },
      ];

      contentMapper.getVerticals.mockResolvedValue(mockVerticals);

      const result = await store.getVerticals();

      expect(result).toEqual(mockVerticals);
      expect(contentMapper.getVerticals).toHaveBeenCalled();
    });

    it('should return cached verticals on subsequent calls', async () => {
      const mockVerticals = [
        { id: 'nutrition', name: 'Nutrition' },
        { id: 'fitness', name: 'Fitness' },
      ];

      contentMapper.getVerticals.mockResolvedValue(mockVerticals);

      await store.getVerticals();
      const result = await store.getVerticals();

      expect(result).toEqual(mockVerticals);
      expect(contentMapper.getVerticals).toHaveBeenCalledTimes(1);
    });

    it('should return empty array when no verticals found', async () => {
      contentMapper.getVerticals.mockResolvedValue([]);

      const result = await store.getVerticals();

      expect(result).toEqual([]);
    });

    it('should handle errors gracefully', async () => {
      contentMapper.getVerticals.mockRejectedValue(new Error('Network error'));

      const result = await store.getVerticals();

      expect(result).toEqual([]);
    });
  });

  describe('getWOWAssessment', () => {
    it('should fetch and cache WOW Assessment', async () => {
      const mockAssessment = {
        name: 'World of Wellness',
        description: 'Test assessment',
      };

      contentMapper.getWOWAssessment.mockResolvedValue(mockAssessment);

      const result = await store.getWOWAssessment();

      expect(result).toEqual(mockAssessment);
      expect(contentMapper.getWOWAssessment).toHaveBeenCalled();
    });

    it('should return cached WOW Assessment on subsequent calls', async () => {
      const mockAssessment = {
        name: 'World of Wellness',
        description: 'Test assessment',
      };

      contentMapper.getWOWAssessment.mockResolvedValue(mockAssessment);

      await store.getWOWAssessment();
      const result = await store.getWOWAssessment();

      expect(result).toEqual(mockAssessment);
      expect(contentMapper.getWOWAssessment).toHaveBeenCalledTimes(1);
    });

    it('should return null when assessment not found', async () => {
      contentMapper.getWOWAssessment.mockResolvedValue(null);

      const result = await store.getWOWAssessment();

      expect(result).toBeNull();
    });

    it('should handle errors gracefully', async () => {
      contentMapper.getWOWAssessment.mockRejectedValue(new Error('Network error'));

      const result = await store.getWOWAssessment();

      expect(result).toBeNull();
    });
  });

  describe('getAllDisorders', () => {
    it('should return empty array', async () => {
      const result = await store.getAllDisorders();
      expect(result).toEqual([]);
    });
  });

  describe('getAllProtocols', () => {
    it('should return empty array', async () => {
      const result = await store.getAllProtocols();
      expect(result).toEqual([]);
    });
  });

  describe('getAllPrograms', () => {
    it('should return empty array', async () => {
      const result = await store.getAllPrograms();
      expect(result).toEqual([]);
    });
  });

  describe('invalidateCache', () => {
    it('should invalidate specific disorder cache', async () => {
      const mockDisorder = {
        id: 'diabetes',
        name: 'Diabetes',
        description: 'Test disorder',
      };

      contentMapper.getDisorder.mockResolvedValue(mockDisorder);

      // Cache the disorder
      await store.getDisorder('diabetes');

      // Invalidate cache
      store.invalidateCache('disorders', 'diabetes');

      // Fetch again - should call ContentMapper again
      await store.getDisorder('diabetes');

      expect(contentMapper.getDisorder).toHaveBeenCalledTimes(2);
    });

    it('should invalidate entire content type', async () => {
      const mockDisorder = {
        id: 'diabetes',
        name: 'Diabetes',
        description: 'Test disorder',
      };

      contentMapper.getDisorder.mockResolvedValue(mockDisorder);

      // Cache multiple disorders
      await store.getDisorder('diabetes');

      // Invalidate entire disorders cache
      store.invalidateCache('disorders');

      // Fetch again - should call ContentMapper again
      await store.getDisorder('diabetes');

      expect(contentMapper.getDisorder).toHaveBeenCalledTimes(2);
    });

    it('should handle case-insensitive invalidation', async () => {
      const mockDisorder = {
        id: 'diabetes',
        name: 'Diabetes',
        description: 'Test disorder',
      };

      contentMapper.getDisorder.mockResolvedValue(mockDisorder);

      await store.getDisorder('diabetes');
      store.invalidateCache('disorders', 'DIABETES');

      await store.getDisorder('diabetes');

      expect(contentMapper.getDisorder).toHaveBeenCalledTimes(2);
    });
  });

  describe('clearAllCache', () => {
    it('should clear all cached content', async () => {
      const mockDisorder = {
        id: 'diabetes',
        name: 'Diabetes',
        description: 'Test disorder',
      };
      const mockProtocol = {
        id: 'deep-detox',
        name: 'Deep Detox',
        description: 'Test protocol',
      };
      const mockVerticals = [{ id: 'nutrition', name: 'Nutrition' }];

      contentMapper.getDisorder.mockResolvedValue(mockDisorder);
      contentMapper.getProtocol.mockResolvedValue(mockProtocol);
      contentMapper.getVerticals.mockResolvedValue(mockVerticals);

      // Cache multiple items
      await store.getDisorder('diabetes');
      await store.getProtocol('deep-detox');
      await store.getVerticals();

      // Clear all cache
      store.clearAllCache();

      // Fetch again - should call ContentMapper again
      await store.getDisorder('diabetes');
      await store.getProtocol('deep-detox');
      await store.getVerticals();

      expect(contentMapper.getDisorder).toHaveBeenCalledTimes(2);
      expect(contentMapper.getProtocol).toHaveBeenCalledTimes(2);
      expect(contentMapper.getVerticals).toHaveBeenCalledTimes(2);
    });
  });

  describe('refreshCache', () => {
    it('should refresh disorder cache', async () => {
      const mockDisorder = {
        id: 'diabetes',
        name: 'Diabetes',
        description: 'Test disorder',
      };

      contentMapper.getDisorder.mockResolvedValue(mockDisorder);

      // Cache the disorder
      await store.getDisorder('diabetes');

      // Refresh cache
      const result = await store.refreshCache('disorders', 'diabetes');

      expect(result).toEqual(mockDisorder);
      expect(contentMapper.getDisorder).toHaveBeenCalledTimes(2);
    });

    it('should refresh protocol cache', async () => {
      const mockProtocol = {
        id: 'deep-detox',
        name: 'Deep Detox',
        description: 'Test protocol',
      };

      contentMapper.getProtocol.mockResolvedValue(mockProtocol);

      await store.getProtocol('deep-detox');
      const result = await store.refreshCache('protocols', 'deep-detox');

      expect(result).toEqual(mockProtocol);
      expect(contentMapper.getProtocol).toHaveBeenCalledTimes(2);
    });

    it('should refresh program cache', async () => {
      const mockProgram = {
        id: 'diabetes-reversal',
        name: 'Diabetes Reversal Program',
        description: 'Test program',
      };

      contentMapper.getProgram.mockResolvedValue(mockProgram);

      await store.getProgram('diabetes-reversal');
      const result = await store.refreshCache('programs', 'diabetes-reversal');

      expect(result).toEqual(mockProgram);
      expect(contentMapper.getProgram).toHaveBeenCalledTimes(2);
    });

    it('should refresh verticals cache', async () => {
      const mockVerticals = [{ id: 'nutrition', name: 'Nutrition' }];

      contentMapper.getVerticals.mockResolvedValue(mockVerticals);

      await store.getVerticals();
      const result = await store.refreshCache('verticals');

      expect(result).toEqual(mockVerticals);
      expect(contentMapper.getVerticals).toHaveBeenCalledTimes(2);
    });

    it('should refresh WOW Assessment cache', async () => {
      const mockAssessment = {
        name: 'World of Wellness',
        description: 'Test assessment',
      };

      contentMapper.getWOWAssessment.mockResolvedValue(mockAssessment);

      await store.getWOWAssessment();
      const result = await store.refreshCache('wowAssessment');

      expect(result).toEqual(mockAssessment);
      expect(contentMapper.getWOWAssessment).toHaveBeenCalledTimes(2);
    });

    it('should return null for invalid content type', async () => {
      const result = await store.refreshCache('invalid', 'id');
      expect(result).toBeNull();
    });
  });

  describe('setTTL', () => {
    it('should update TTL', () => {
      store.setTTL(5000);
      expect(store.ttl).toBe(5000);
    });

    it('should reject invalid TTL values', () => {
      store.setTTL(-1000);
      expect(store.ttl).not.toBe(-1000);
    });

    it('should reject zero TTL', () => {
      store.setTTL(0);
      expect(store.ttl).not.toBe(0);
    });

    it('should reject non-numeric TTL', () => {
      store.setTTL('invalid');
      expect(store.ttl).not.toBe('invalid');
    });
  });

  describe('getCacheStats', () => {
    it('should return cache statistics', async () => {
      const mockDisorder = {
        id: 'diabetes',
        name: 'Diabetes',
        description: 'Test disorder',
      };

      contentMapper.getDisorder.mockResolvedValue(mockDisorder);

      await store.getDisorder('diabetes');

      const stats = store.getCacheStats();

      expect(stats).toHaveProperty('disorders');
      expect(stats).toHaveProperty('protocols');
      expect(stats).toHaveProperty('programs');
      expect(stats).toHaveProperty('verticals');
      expect(stats).toHaveProperty('wowAssessment');
      expect(stats).toHaveProperty('ttl');
      expect(stats.disorders.count).toBe(1);
    });
  });

  describe('TTL-based cache expiration', () => {
    it('should expire cache after TTL', async () => {
      const shortTTLStore = new ContentStore(100); // 100ms TTL
      const mockDisorder = {
        id: 'diabetes',
        name: 'Diabetes',
        description: 'Test disorder',
      };

      contentMapper.getDisorder.mockResolvedValue(mockDisorder);

      // Cache the disorder
      await shortTTLStore.getDisorder('diabetes');

      // Wait for cache to expire
      await new Promise((resolve) => setTimeout(resolve, 150));

      // Fetch again - should call ContentMapper again
      await shortTTLStore.getDisorder('diabetes');

      expect(contentMapper.getDisorder).toHaveBeenCalledTimes(2);
    });

    it('should not expire cache before TTL', async () => {
      const shortTTLStore = new ContentStore(1000); // 1 second TTL
      const mockDisorder = {
        id: 'diabetes',
        name: 'Diabetes',
        description: 'Test disorder',
      };

      contentMapper.getDisorder.mockResolvedValue(mockDisorder);

      // Cache the disorder
      await shortTTLStore.getDisorder('diabetes');

      // Wait less than TTL
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Fetch again - should use cache
      await shortTTLStore.getDisorder('diabetes');

      expect(contentMapper.getDisorder).toHaveBeenCalledTimes(1);
    });
  });

  describe('Content Store returns consistent data structure', () => {
    it('should return disorder with all required fields', async () => {
      const mockDisorder = {
        id: 'diabetes',
        name: 'Diabetes',
        slug: 'diabetes',
        description: 'Test disorder',
        keyStatistics: { prevalence: '10%' },
        overview: 'Overview text',
        symptoms: [],
        rootCauses: [],
        reversalMechanism: 'Mechanism text',
        relatedPrograms: [],
        seoMetadata: { title: 'Title', description: 'Desc', keywords: [] },
      };

      contentMapper.getDisorder.mockResolvedValue(mockDisorder);

      const result = await store.getDisorder('diabetes');

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('name');
      expect(result).toHaveProperty('description');
      expect(result).toHaveProperty('seoMetadata');
    });

    it('should return protocol with all required fields', async () => {
      const mockProtocol = {
        id: 'deep-detox',
        name: 'Deep Detox',
        slug: 'deep-detox',
        description: 'Test protocol',
        overview: 'Overview text',
        scientificBasis: 'Scientific basis',
        benefits: [],
        implementationSteps: [],
        expectedResults: 'Results text',
        duration: '21 days',
        difficulty: 'Moderate',
        relatedProtocols: [],
        seoMetadata: { title: 'Title', description: 'Desc', keywords: [] },
      };

      contentMapper.getProtocol.mockResolvedValue(mockProtocol);

      const result = await store.getProtocol('deep-detox');

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('name');
      expect(result).toHaveProperty('description');
      expect(result).toHaveProperty('seoMetadata');
    });

    it('should return program with all required fields', async () => {
      const mockProgram = {
        id: 'diabetes-reversal',
        name: 'Diabetes Reversal Program',
        slug: 'diabetes-reversal',
        description: 'Test program',
        targetAudience: 'Audience',
        overview: 'Overview text',
        components: [],
        timeline: { duration: '12 weeks', phases: [] },
        expectedOutcomes: [],
        testimonials: [],
        enrollmentCTA: { text: 'Enroll', link: '/enroll' },
        seoMetadata: { title: 'Title', description: 'Desc', keywords: [] },
      };

      contentMapper.getProgram.mockResolvedValue(mockProgram);

      const result = await store.getProgram('diabetes-reversal');

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('name');
      expect(result).toHaveProperty('description');
      expect(result).toHaveProperty('seoMetadata');
    });
  });

  describe('Content cache prevents repeated fetches', () => {
    it('should not fetch from ContentMapper when cache is valid', async () => {
      const mockDisorder = {
        id: 'diabetes',
        name: 'Diabetes',
        description: 'Test disorder',
      };

      contentMapper.getDisorder.mockResolvedValue(mockDisorder);

      // First fetch
      await store.getDisorder('diabetes');
      // Second fetch within TTL
      await store.getDisorder('diabetes');
      // Third fetch within TTL
      await store.getDisorder('diabetes');

      expect(contentMapper.getDisorder).toHaveBeenCalledTimes(1);
    });

    it('should fetch from ContentMapper when cache expires', async () => {
      const shortTTLStore = new ContentStore(50); // 50ms TTL
      const mockDisorder = {
        id: 'diabetes',
        name: 'Diabetes',
        description: 'Test disorder',
      };

      contentMapper.getDisorder.mockResolvedValue(mockDisorder);

      // First fetch
      await shortTTLStore.getDisorder('diabetes');
      // Wait for cache to expire
      await new Promise((resolve) => setTimeout(resolve, 100));
      // Second fetch after expiration
      await shortTTLStore.getDisorder('diabetes');

      expect(contentMapper.getDisorder).toHaveBeenCalledTimes(2);
    });
  });
});
