/**
 * ContentStore Service
 * Manages content caching with TTL-based invalidation
 * Provides methods to retrieve content from cache or fetch from ContentMapper
 */

import { contentMapper } from './ContentMapper.js';

// ============================================================================
// Cache Configuration
// ============================================================================

const DEFAULT_TTL = 60 * 60 * 1000; // 1 hour in milliseconds

// ============================================================================
// ContentStore Class
// ============================================================================

class ContentStore {
  constructor(ttl = DEFAULT_TTL) {
    this.ttl = ttl;
    this.cache = {
      disorders: {},
      protocols: {},
      programs: {},
      verticals: null,
      wowAssessment: null,
    };
    this.timestamps = {
      disorders: {},
      protocols: {},
      programs: {},
      verticals: null,
      wowAssessment: null,
    };
    this.logger = console;
  }

  /**
   * Check if cached content is still valid (not expired)
   * @param {string} contentType - Type of content (disorders, protocols, programs, verticals, wowAssessment)
   * @param {string} id - ID of the content item (optional for verticals and wowAssessment)
   * @returns {boolean} True if cache is valid, false if expired or not found
   */
  isCacheValid(contentType, id = null) {
    let timestamp;

    if (id) {
      timestamp = this.timestamps[contentType]?.[id];
    } else {
      timestamp = this.timestamps[contentType];
    }

    if (!timestamp) {
      return false;
    }

    const now = Date.now();
    const isValid = now - timestamp < this.ttl;

    if (!isValid) {
      this.logger.debug(`ContentStore: Cache expired for ${contentType}${id ? `:${id}` : ''}`);
    }

    return isValid;
  }

  /**
   * Get a disorder from cache or fetch from ContentMapper
   * @param {string} disorderId - The ID of the disorder to retrieve
   * @returns {Promise<Object|null>} Disorder object or null if not found
   */
  async getDisorder(disorderId) {
    try {
      if (!disorderId || typeof disorderId !== 'string') {
        this.logger.error('ContentStore: Invalid disorderId provided', { disorderId });
        return null;
      }

      const lowerCaseId = disorderId.toLowerCase();

      // Check if cache is valid
      if (this.isCacheValid('disorders', lowerCaseId)) {
        this.logger.debug('ContentStore: Returning cached disorder', { disorderId: lowerCaseId });
        return this.cache.disorders[lowerCaseId];
      }

      // Fetch from ContentMapper
      this.logger.debug('ContentStore: Fetching disorder from ContentMapper', {
        disorderId: lowerCaseId,
      });
      const disorder = await contentMapper.getDisorder(lowerCaseId);

      if (!disorder) {
        this.logger.warn('ContentStore: Disorder not found', { disorderId: lowerCaseId });
        return null;
      }

      // Cache the disorder
      this.cache.disorders[lowerCaseId] = disorder;
      this.timestamps.disorders[lowerCaseId] = Date.now();

      this.logger.info('ContentStore: Successfully cached disorder', { disorderId: lowerCaseId });
      return disorder;
    } catch (error) {
      this.logger.error('ContentStore: Error retrieving disorder', { disorderId, error });
      return null;
    }
  }

  /**
   * Get all disorders from cache or fetch from ContentMapper
   * @returns {Promise<Array>} Array of all disorder objects
   */
  async getAllDisorders() {
    try {
      // For now, return empty array as we don't have a getAllDisorders method in ContentMapper
      // This would be implemented when the API supports fetching all disorders
      this.logger.info('ContentStore: getAllDisorders called');
      return [];
    } catch (error) {
      this.logger.error('ContentStore: Error retrieving all disorders', { error });
      return [];
    }
  }

  /**
   * Get a protocol from cache or fetch from ContentMapper
   * @param {string} protocolId - The ID of the protocol to retrieve
   * @returns {Promise<Object|null>} Protocol object or null if not found
   */
  async getProtocol(protocolId) {
    try {
      if (!protocolId || typeof protocolId !== 'string') {
        this.logger.error('ContentStore: Invalid protocolId provided', { protocolId });
        return null;
      }

      const lowerCaseId = protocolId.toLowerCase();

      // Check if cache is valid
      if (this.isCacheValid('protocols', lowerCaseId)) {
        this.logger.debug('ContentStore: Returning cached protocol', { protocolId: lowerCaseId });
        return this.cache.protocols[lowerCaseId];
      }

      // Fetch from ContentMapper
      this.logger.debug('ContentStore: Fetching protocol from ContentMapper', {
        protocolId: lowerCaseId,
      });
      const protocol = await contentMapper.getProtocol(lowerCaseId);

      if (!protocol) {
        this.logger.warn('ContentStore: Protocol not found', { protocolId: lowerCaseId });
        return null;
      }

      // Cache the protocol
      this.cache.protocols[lowerCaseId] = protocol;
      this.timestamps.protocols[lowerCaseId] = Date.now();

      this.logger.info('ContentStore: Successfully cached protocol', { protocolId: lowerCaseId });
      return protocol;
    } catch (error) {
      this.logger.error('ContentStore: Error retrieving protocol', { protocolId, error });
      return null;
    }
  }

  /**
   * Get all protocols from cache or fetch from ContentMapper
   * @returns {Promise<Array>} Array of all protocol objects
   */
  async getAllProtocols() {
    try {
      // For now, return empty array as we don't have a getAllProtocols method in ContentMapper
      // This would be implemented when the API supports fetching all protocols
      this.logger.info('ContentStore: getAllProtocols called');
      return [];
    } catch (error) {
      this.logger.error('ContentStore: Error retrieving all protocols', { error });
      return [];
    }
  }

  /**
   * Get a program from cache or fetch from ContentMapper
   * @param {string} programId - The ID of the program to retrieve
   * @returns {Promise<Object|null>} Program object or null if not found
   */
  async getProgram(programId) {
    try {
      if (!programId || typeof programId !== 'string') {
        this.logger.error('ContentStore: Invalid programId provided', { programId });
        return null;
      }

      const lowerCaseId = programId.toLowerCase();

      // Check if cache is valid
      if (this.isCacheValid('programs', lowerCaseId)) {
        this.logger.debug('ContentStore: Returning cached program', { programId: lowerCaseId });
        return this.cache.programs[lowerCaseId];
      }

      // Fetch from ContentMapper
      this.logger.debug('ContentStore: Fetching program from ContentMapper', {
        programId: lowerCaseId,
      });
      const program = await contentMapper.getProgram(lowerCaseId);

      if (!program) {
        this.logger.warn('ContentStore: Program not found', { programId: lowerCaseId });
        return null;
      }

      // Cache the program
      this.cache.programs[lowerCaseId] = program;
      this.timestamps.programs[lowerCaseId] = Date.now();

      this.logger.info('ContentStore: Successfully cached program', { programId: lowerCaseId });
      return program;
    } catch (error) {
      this.logger.error('ContentStore: Error retrieving program', { programId, error });
      return null;
    }
  }

  /**
   * Get all programs from cache or fetch from ContentMapper
   * @returns {Promise<Array>} Array of all program objects
   */
  async getAllPrograms() {
    try {
      // For now, return empty array as we don't have a getAllPrograms method in ContentMapper
      // This would be implemented when the API supports fetching all programs
      this.logger.info('ContentStore: getAllPrograms called');
      return [];
    } catch (error) {
      this.logger.error('ContentStore: Error retrieving all programs', { error });
      return [];
    }
  }

  /**
   * Get all wellness verticals from cache or fetch from ContentMapper
   * @returns {Promise<Array>} Array of vertical objects
   */
  async getVerticals() {
    try {
      // Check if cache is valid
      if (this.isCacheValid('verticals')) {
        this.logger.debug('ContentStore: Returning cached verticals');
        return this.cache.verticals || [];
      }

      // Fetch from ContentMapper
      this.logger.debug('ContentStore: Fetching verticals from ContentMapper');
      const verticals = await contentMapper.getVerticals();

      if (!verticals || verticals.length === 0) {
        this.logger.warn('ContentStore: No verticals found');
        return [];
      }

      // Cache the verticals
      this.cache.verticals = verticals;
      this.timestamps.verticals = Date.now();

      this.logger.info('ContentStore: Successfully cached verticals', {
        count: verticals.length,
      });
      return verticals;
    } catch (error) {
      this.logger.error('ContentStore: Error retrieving verticals', { error });
      return [];
    }
  }

  /**
   * Get WOW Assessment from cache or fetch from ContentMapper
   * @returns {Promise<Object|null>} WOW Assessment object or null if not found
   */
  async getWOWAssessment() {
    try {
      // Check if cache is valid
      if (this.isCacheValid('wowAssessment')) {
        this.logger.debug('ContentStore: Returning cached WOW Assessment');
        return this.cache.wowAssessment;
      }

      // Fetch from ContentMapper
      this.logger.debug('ContentStore: Fetching WOW Assessment from ContentMapper');
      const assessment = await contentMapper.getWOWAssessment();

      if (!assessment) {
        this.logger.warn('ContentStore: WOW Assessment not found');
        return null;
      }

      // Cache the assessment
      this.cache.wowAssessment = assessment;
      this.timestamps.wowAssessment = Date.now();

      this.logger.info('ContentStore: Successfully cached WOW Assessment');
      return assessment;
    } catch (error) {
      this.logger.error('ContentStore: Error retrieving WOW Assessment', { error });
      return null;
    }
  }

  /**
   * Invalidate cache for a specific content item
   * @param {string} contentType - Type of content (disorders, protocols, programs, verticals, wowAssessment)
   * @param {string} id - ID of the content item (optional for verticals and wowAssessment)
   */
  invalidateCache(contentType, id = null) {
    try {
      if (id) {
        const lowerCaseId = id.toLowerCase();
        if (this.cache[contentType] && this.cache[contentType][lowerCaseId]) {
          delete this.cache[contentType][lowerCaseId];
          delete this.timestamps[contentType][lowerCaseId];
          this.logger.info('ContentStore: Cache invalidated', { contentType, id: lowerCaseId });
        }
      } else {
        // Invalidate entire content type
        this.cache[contentType] = contentType === 'verticals' || contentType === 'wowAssessment' ? null : {};
        this.timestamps[contentType] = contentType === 'verticals' || contentType === 'wowAssessment' ? null : {};
        this.logger.info('ContentStore: Cache invalidated for entire content type', { contentType });
      }
    } catch (error) {
      this.logger.error('ContentStore: Error invalidating cache', { contentType, id, error });
    }
  }

  /**
   * Clear all cached content
   */
  clearAllCache() {
    try {
      this.cache = {
        disorders: {},
        protocols: {},
        programs: {},
        verticals: null,
        wowAssessment: null,
      };
      this.timestamps = {
        disorders: {},
        protocols: {},
        programs: {},
        verticals: null,
        wowAssessment: null,
      };
      this.logger.info('ContentStore: All cache cleared');
    } catch (error) {
      this.logger.error('ContentStore: Error clearing all cache', { error });
    }
  }

  /**
   * Refresh cached content by fetching fresh data from ContentMapper
   * @param {string} contentType - Type of content to refresh
   * @param {string} id - ID of the content item (optional for verticals and wowAssessment)
   * @returns {Promise<Object|Array|null>} Refreshed content or null if error
   */
  async refreshCache(contentType, id = null) {
    try {
      // Invalidate the cache first
      this.invalidateCache(contentType, id);

      // Fetch fresh content based on type
      if (contentType === 'disorders' && id) {
        return await this.getDisorder(id);
      } else if (contentType === 'protocols' && id) {
        return await this.getProtocol(id);
      } else if (contentType === 'programs' && id) {
        return await this.getProgram(id);
      } else if (contentType === 'verticals') {
        return await this.getVerticals();
      } else if (contentType === 'wowAssessment') {
        return await this.getWOWAssessment();
      } else {
        this.logger.error('ContentStore: Invalid content type for refresh', { contentType, id });
        return null;
      }
    } catch (error) {
      this.logger.error('ContentStore: Error refreshing cache', { contentType, id, error });
      return null;
    }
  }

  /**
   * Set custom TTL for cache expiration
   * @param {number} ttl - Time-to-live in milliseconds
   */
  setTTL(ttl) {
    if (typeof ttl !== 'number' || ttl <= 0) {
      this.logger.error('ContentStore: Invalid TTL value', { ttl });
      return;
    }
    this.ttl = ttl;
    this.logger.info('ContentStore: TTL updated', { ttl });
  }

  /**
   * Get current cache statistics
   * @returns {Object} Cache statistics including size and expiration info
   */
  getCacheStats() {
    return {
      disorders: {
        count: Object.keys(this.cache.disorders).length,
        items: Object.keys(this.cache.disorders),
      },
      protocols: {
        count: Object.keys(this.cache.protocols).length,
        items: Object.keys(this.cache.protocols),
      },
      programs: {
        count: Object.keys(this.cache.programs).length,
        items: Object.keys(this.cache.programs),
      },
      verticals: {
        cached: this.cache.verticals !== null,
        count: this.cache.verticals ? this.cache.verticals.length : 0,
      },
      wowAssessment: {
        cached: this.cache.wowAssessment !== null,
      },
      ttl: this.ttl,
    };
  }
}

// ============================================================================
// Singleton Instance
// ============================================================================

const contentStore = new ContentStore();

export { ContentStore, contentStore };
