/**
 * ContentValidator Service
 * Validates content data for required fields, data types, and integrity
 * Provides default values for missing fields and logs validation errors
 */

// ============================================================================
// Default Values
// ============================================================================

const DEFAULT_VALUES = {
  title: 'Untitled',
  description: 'No description available',
  name: 'Unnamed',
  overview: 'No overview available',
  icon: 'info',
  link: '#',
  text: 'No text available',
};

const MAX_TEXT_LENGTH = 5000;
const MAX_TITLE_LENGTH = 200;
const MAX_DESCRIPTION_LENGTH = 1000;

// ============================================================================
// ContentValidator Class
// ============================================================================

class ContentValidator {
  constructor() {
    this.logger = console;
    this.errors = [];
  }

  /**
   * Clear validation errors
   */
  clearErrors() {
    this.errors = [];
  }

  /**
   * Get all validation errors
   * @returns {Array} Array of validation error messages
   */
  getErrors() {
    return [...this.errors];
  }

  /**
   * Validate a string field
   * @param {*} value - Value to validate
   * @param {string} fieldName - Name of the field
   * @param {number} maxLength - Maximum allowed length
   * @param {boolean} required - Whether field is required
   * @returns {string} Validated string or default value
   */
  validateString(value, fieldName, maxLength = MAX_TEXT_LENGTH, required = true) {
    if (!value || typeof value !== 'string') {
      if (required) {
        this.errors.push(`${fieldName} is required but missing or invalid`);
        return DEFAULT_VALUES[fieldName] || DEFAULT_VALUES.text;
      }
      return '';
    }

    const trimmed = value.trim();
    if (!trimmed && required) {
      this.errors.push(`${fieldName} is empty`);
      return DEFAULT_VALUES[fieldName] || DEFAULT_VALUES.text;
    }

    if (trimmed.length > maxLength) {
      this.errors.push(`${fieldName} exceeds maximum length of ${maxLength} characters`);
      return trimmed.substring(0, maxLength);
    }

    return trimmed;
  }

  /**
   * Validate a URL
   * @param {*} value - Value to validate
   * @param {string} fieldName - Name of the field
   * @param {boolean} required - Whether field is required
   * @returns {string} Validated URL or default value
   */
  validateURL(value, fieldName, required = true) {
    if (!value || typeof value !== 'string') {
      if (required) {
        this.errors.push(`${fieldName} is required but missing or invalid`);
        return DEFAULT_VALUES.link;
      }
      return '';
    }

    const trimmed = value.trim();
    if (!trimmed && required) {
      this.errors.push(`${fieldName} is empty`);
      return DEFAULT_VALUES.link;
    }

    // Basic URL validation
    try {
      new URL(trimmed);
      return trimmed;
    } catch (e) {
      // Allow relative URLs
      if (trimmed.startsWith('/') || trimmed.startsWith('#')) {
        return trimmed;
      }
      this.errors.push(`${fieldName} is not a valid URL: ${trimmed}`);
      return DEFAULT_VALUES.link;
    }
  }

  /**
   * Validate a number field
   * @param {*} value - Value to validate
   * @param {string} fieldName - Name of the field
   * @param {number} min - Minimum allowed value
   * @param {number} max - Maximum allowed value
   * @param {boolean} required - Whether field is required
   * @returns {number} Validated number or 0
   */
  validateNumber(value, fieldName, min = 0, max = 100, required = true) {
    if (typeof value !== 'number') {
      if (required) {
        this.errors.push(`${fieldName} is required but not a number`);
        return min;
      }
      return 0;
    }

    if (value < min || value > max) {
      this.errors.push(`${fieldName} is out of range [${min}, ${max}]`);
      return Math.max(min, Math.min(max, value));
    }

    return value;
  }

  /**
   * Validate an array field
   * @param {*} value - Value to validate
   * @param {string} fieldName - Name of the field
   * @param {boolean} required - Whether field is required
   * @returns {Array} Validated array or empty array
   */
  validateArray(value, fieldName, required = true) {
    if (!Array.isArray(value)) {
      if (required) {
        this.errors.push(`${fieldName} is required but not an array`);
        return [];
      }
      return [];
    }

    return value;
  }

  /**
   * Validate an object field
   * @param {*} value - Value to validate
   * @param {string} fieldName - Name of the field
   * @param {boolean} required - Whether field is required
   * @returns {Object} Validated object or empty object
   */
  validateObject(value, fieldName, required = true) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      if (required) {
        this.errors.push(`${fieldName} is required but not an object`);
        return {};
      }
      return {};
    }

    return value;
  }

  /**
   * Validate a Disorder object
   * @param {Object} disorder - Disorder to validate
   * @returns {Object} Validated disorder with defaults applied
   */
  validateDisorder(disorder) {
    this.clearErrors();

    if (!disorder || typeof disorder !== 'object') {
      this.errors.push('Disorder is not a valid object');
      return null;
    }

    const validated = {
      id: this.validateString(disorder.id, 'id', 100, true),
      name: this.validateString(disorder.name, 'name', MAX_TITLE_LENGTH, true),
      slug: this.validateString(disorder.slug, 'slug', 100, true),
      description: this.validateString(disorder.description, 'description', MAX_DESCRIPTION_LENGTH, true),
      keyStatistics: this.validateObject(disorder.keyStatistics, 'keyStatistics', true),
      overview: this.validateString(disorder.overview, 'overview', MAX_TEXT_LENGTH, true),
      symptoms: this.validateArray(disorder.symptoms, 'symptoms', true),
      rootCauses: this.validateArray(disorder.rootCauses, 'rootCauses', true),
      reversalMechanism: this.validateString(disorder.reversalMechanism, 'reversalMechanism', MAX_TEXT_LENGTH, true),
      relatedPrograms: this.validateArray(disorder.relatedPrograms, 'relatedPrograms', false),
      seoMetadata: this.validateObject(disorder.seoMetadata, 'seoMetadata', true),
    };

    if (this.errors.length > 0) {
      this.logger.warn('ContentValidator: Disorder validation errors', {
        disorderId: disorder.id,
        errors: this.errors,
      });
    }

    return validated;
  }

  /**
   * Validate a Protocol object
   * @param {Object} protocol - Protocol to validate
   * @returns {Object} Validated protocol with defaults applied
   */
  validateProtocol(protocol) {
    this.clearErrors();

    if (!protocol || typeof protocol !== 'object') {
      this.errors.push('Protocol is not a valid object');
      return null;
    }

    const validated = {
      id: this.validateString(protocol.id, 'id', 100, true),
      name: this.validateString(protocol.name, 'name', MAX_TITLE_LENGTH, true),
      slug: this.validateString(protocol.slug, 'slug', 100, true),
      description: this.validateString(protocol.description, 'description', MAX_DESCRIPTION_LENGTH, true),
      overview: this.validateString(protocol.overview, 'overview', MAX_TEXT_LENGTH, true),
      scientificBasis: this.validateString(protocol.scientificBasis, 'scientificBasis', MAX_TEXT_LENGTH, true),
      benefits: this.validateArray(protocol.benefits, 'benefits', true),
      implementationSteps: this.validateArray(protocol.implementationSteps, 'implementationSteps', true),
      expectedResults: this.validateString(protocol.expectedResults, 'expectedResults', MAX_TEXT_LENGTH, true),
      duration: this.validateString(protocol.duration, 'duration', 100, true),
      difficulty: this.validateString(protocol.difficulty, 'difficulty', 50, true),
      relatedProtocols: this.validateArray(protocol.relatedProtocols, 'relatedProtocols', false),
      seoMetadata: this.validateObject(protocol.seoMetadata, 'seoMetadata', true),
    };

    if (this.errors.length > 0) {
      this.logger.warn('ContentValidator: Protocol validation errors', {
        protocolId: protocol.id,
        errors: this.errors,
      });
    }

    return validated;
  }

  /**
   * Validate a Program object
   * @param {Object} program - Program to validate
   * @returns {Object} Validated program with defaults applied
   */
  validateProgram(program) {
    this.clearErrors();

    if (!program || typeof program !== 'object') {
      this.errors.push('Program is not a valid object');
      return null;
    }

    const validated = {
      id: this.validateString(program.id, 'id', 100, true),
      name: this.validateString(program.name, 'name', MAX_TITLE_LENGTH, true),
      slug: this.validateString(program.slug, 'slug', 100, true),
      description: this.validateString(program.description, 'description', MAX_DESCRIPTION_LENGTH, true),
      targetAudience: this.validateString(program.targetAudience, 'targetAudience', MAX_DESCRIPTION_LENGTH, true),
      overview: this.validateString(program.overview, 'overview', MAX_TEXT_LENGTH, true),
      components: this.validateArray(program.components, 'components', true),
      timeline: this.validateObject(program.timeline, 'timeline', true),
      expectedOutcomes: this.validateArray(program.expectedOutcomes, 'expectedOutcomes', true),
      testimonials: this.validateArray(program.testimonials, 'testimonials', false),
      enrollmentCTA: this.validateObject(program.enrollmentCTA, 'enrollmentCTA', true),
      seoMetadata: this.validateObject(program.seoMetadata, 'seoMetadata', true),
    };

    if (this.errors.length > 0) {
      this.logger.warn('ContentValidator: Program validation errors', {
        programId: program.id,
        errors: this.errors,
      });
    }

    return validated;
  }

  /**
   * Validate a Vertical object
   * @param {Object} vertical - Vertical to validate
   * @returns {Object} Validated vertical with defaults applied
   */
  validateVertical(vertical) {
    this.clearErrors();

    if (!vertical || typeof vertical !== 'object') {
      this.errors.push('Vertical is not a valid object');
      return null;
    }

    const validated = {
      id: this.validateString(vertical.id, 'id', 100, true),
      name: this.validateString(vertical.name, 'name', MAX_TITLE_LENGTH, true),
      description: this.validateString(vertical.description, 'description', MAX_DESCRIPTION_LENGTH, true),
      icon: this.validateString(vertical.icon, 'icon', 50, true),
      relatedProtocols: this.validateArray(vertical.relatedProtocols, 'relatedProtocols', false),
      relatedPrograms: this.validateArray(vertical.relatedPrograms, 'relatedPrograms', false),
      link: this.validateURL(vertical.link, 'link', true),
    };

    if (this.errors.length > 0) {
      this.logger.warn('ContentValidator: Vertical validation errors', {
        verticalId: vertical.id,
        errors: this.errors,
      });
    }

    return validated;
  }

  /**
   * Validate a WOW Assessment object
   * @param {Object} assessment - Assessment to validate
   * @returns {Object} Validated assessment with defaults applied
   */
  validateWOWAssessment(assessment) {
    this.clearErrors();

    if (!assessment || typeof assessment !== 'object') {
      this.errors.push('WOW Assessment is not a valid object');
      return null;
    }

    const validated = {
      name: this.validateString(assessment.name, 'name', MAX_TITLE_LENGTH, true),
      description: this.validateString(assessment.description, 'description', MAX_DESCRIPTION_LENGTH, true),
      overview: this.validateString(assessment.overview, 'overview', MAX_TEXT_LENGTH, true),
      parameters: this.validateArray(assessment.parameters, 'parameters', true),
      scoringMethodology: this.validateString(assessment.scoringMethodology, 'scoringMethodology', MAX_TEXT_LENGTH, true),
      scoreRanges: this.validateArray(assessment.scoreRanges, 'scoreRanges', true),
      scheduleCTA: this.validateObject(assessment.scheduleCTA, 'scheduleCTA', true),
    };

    if (this.errors.length > 0) {
      this.logger.warn('ContentValidator: WOW Assessment validation errors', {
        errors: this.errors,
      });
    }

    return validated;
  }

  /**
   * Validate a list of items (generic validation)
   * @param {Array} items - Items to validate
   * @param {string} itemType - Type of items (e.g., 'symptom', 'benefit')
   * @returns {Array} Validated items
   */
  validateItems(items, itemType) {
    this.clearErrors();

    if (!Array.isArray(items)) {
      this.errors.push(`${itemType}s is not an array`);
      return [];
    }

    return items.filter((item) => {
      if (!item || typeof item !== 'object') {
        this.errors.push(`Invalid ${itemType} object`);
        return false;
      }
      return true;
    });
  }

  /**
   * Check if content has required fields
   * @param {Object} content - Content to check
   * @param {Array} requiredFields - List of required field names
   * @returns {boolean} True if all required fields are present
   */
  hasRequiredFields(content, requiredFields) {
    this.clearErrors();

    if (!content || typeof content !== 'object') {
      this.errors.push('Content is not a valid object');
      return false;
    }

    const missingFields = requiredFields.filter((field) => !content[field]);

    if (missingFields.length > 0) {
      this.errors.push(`Missing required fields: ${missingFields.join(', ')}`);
      return false;
    }

    return true;
  }

  /**
   * Validate data types in content
   * @param {Object} content - Content to validate
   * @param {Object} schema - Schema defining expected types
   * @returns {boolean} True if all types match schema
   */
  validateDataTypes(content, schema) {
    this.clearErrors();

    if (!content || typeof content !== 'object') {
      this.errors.push('Content is not a valid object');
      return false;
    }

    for (const [field, expectedType] of Object.entries(schema)) {
      const value = content[field];
      const actualType = Array.isArray(value) ? 'array' : typeof value;

      if (actualType !== expectedType) {
        this.errors.push(`Field ${field} has type ${actualType}, expected ${expectedType}`);
      }
    }

    return this.errors.length === 0;
  }
}

// ============================================================================
// Singleton Instance
// ============================================================================

const contentValidator = new ContentValidator();

export { ContentValidator, contentValidator };
