/**
 * Centralized Content Types Export
 * 
 * This module re-exports all content types and validation functions from the models module
 * for convenient access throughout the application.
 * 
 * @module types/content
 */

export {
  // Validation functions
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
} from '../services/content/models.js';

/**
 * @typedef {import('../services/content/models.js').Disorder} Disorder
 * @typedef {import('../services/content/models.js').Protocol} Protocol
 * @typedef {import('../services/content/models.js').Program} Program
 * @typedef {import('../services/content/models.js').Vertical} Vertical
 * @typedef {import('../services/content/models.js').WOWAssessment} WOWAssessment
 * @typedef {import('../services/content/models.js').SEOMetadata} SEOMetadata
 * @typedef {import('../services/content/models.js').Symptom} Symptom
 * @typedef {import('../services/content/models.js').RootCause} RootCause
 * @typedef {import('../services/content/models.js').RelatedItem} RelatedItem
 * @typedef {import('../services/content/models.js').KeyStatistics} KeyStatistics
 * @typedef {import('../services/content/models.js').Benefit} Benefit
 * @typedef {import('../services/content/models.js').ImplementationStep} ImplementationStep
 * @typedef {import('../services/content/models.js').ProgramComponent} ProgramComponent
 * @typedef {import('../services/content/models.js').Phase} Phase
 * @typedef {import('../services/content/models.js').Timeline} Timeline
 * @typedef {import('../services/content/models.js').Outcome} Outcome
 * @typedef {import('../services/content/models.js').Testimonial} Testimonial
 * @typedef {import('../services/content/models.js').CTA} CTA
 * @typedef {import('../services/content/models.js').Parameter} Parameter
 * @typedef {import('../services/content/models.js').ScoreRange} ScoreRange
 */
