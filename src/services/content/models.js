/**
 * Content Data Models and Validation Schemas
 * 
 * This module defines the data structures for all content types used in the WellPro
 * Content Pages feature, including Disorder, Protocol, Program, Vertical, and WOW Assessment.
 * Each model includes validation functions to ensure data integrity.
 * 
 * @module content/models
 */

/**
 * @typedef {Object} KeyStatistics
 * @property {string} prevalence - Prevalence information
 * @property {string} impact - Impact description
 * @property {string} reversalRate - Reversal rate percentage
 */

/**
 * @typedef {Object} Symptom
 * @property {string} title - Symptom title
 * @property {string} description - Symptom description
 * @property {string} [icon] - Icon identifier
 */

/**
 * @typedef {Object} RootCause
 * @property {string} title - Root cause title
 * @property {string} description - Root cause description
 */

/**
 * @typedef {Object} RelatedItem
 * @property {string} id - Item identifier
 * @property {string} name - Item name
 * @property {string} link - Link to item
 */

/**
 * @typedef {Object} SEOMetadata
 * @property {string} title - Page title for SEO
 * @property {string} description - Page description for SEO
 * @property {string[]} keywords - Keywords for SEO
 */

/**
 * @typedef {Object} Disorder
 * @property {string} id - Unique disorder identifier
 * @property {string} name - Disorder name
 * @property {string} slug - URL-friendly slug
 * @property {string} description - Short description
 * @property {KeyStatistics} keyStatistics - Key statistics about the disorder
 * @property {string} overview - Detailed overview
 * @property {Symptom[]} symptoms - List of symptoms
 * @property {RootCause[]} rootCauses - List of root causes
 * @property {string} reversalMechanism - How the disorder can be reversed
 * @property {RelatedItem[]} relatedPrograms - Related programs
 * @property {SEOMetadata} seoMetadata - SEO metadata
 */

/**
 * @typedef {Object} Benefit
 * @property {string} title - Benefit title
 * @property {string} description - Benefit description
 * @property {string} [icon] - Icon identifier
 */

/**
 * @typedef {Object} ImplementationStep
 * @property {number} number - Step number
 * @property {string} title - Step title
 * @property {string} description - Step description
 * @property {string} [details] - Additional details
 */

/**
 * @typedef {Object} Protocol
 * @property {string} id - Unique protocol identifier
 * @property {string} name - Protocol name
 * @property {string} slug - URL-friendly slug
 * @property {string} description - Short description
 * @property {string} overview - Detailed overview
 * @property {string} scientificBasis - Scientific basis for the protocol
 * @property {Benefit[]} benefits - List of benefits
 * @property {ImplementationStep[]} implementationSteps - Implementation steps
 * @property {string} expectedResults - Expected results
 * @property {string} duration - Protocol duration
 * @property {string} difficulty - Difficulty level
 * @property {RelatedItem[]} relatedProtocols - Related protocols
 * @property {SEOMetadata} seoMetadata - SEO metadata
 */

/**
 * @typedef {Object} ProgramComponent
 * @property {string} title - Component title
 * @property {string} description - Component description
 * @property {string[]} protocols - Protocol IDs included
 */

/**
 * @typedef {Object} Phase
 * @property {number} number - Phase number
 * @property {string} title - Phase title
 * @property {string} duration - Phase duration
 * @property {string[]} objectives - Phase objectives
 */

/**
 * @typedef {Object} Timeline
 * @property {string} duration - Total program duration
 * @property {Phase[]} phases - Program phases
 */

/**
 * @typedef {Object} Outcome
 * @property {string} title - Outcome title
 * @property {string} description - Outcome description
 */

/**
 * @typedef {Object} Testimonial
 * @property {string} name - Testimonial author name
 * @property {string} role - Author role/title
 * @property {string} content - Testimonial content
 * @property {string} [image] - Author image URL
 */

/**
 * @typedef {Object} CTA
 * @property {string} text - CTA button text
 * @property {string} link - CTA link
 */

/**
 * @typedef {Object} Program
 * @property {string} id - Unique program identifier
 * @property {string} name - Program name
 * @property {string} slug - URL-friendly slug
 * @property {string} description - Short description
 * @property {string} targetAudience - Target audience description
 * @property {string} overview - Detailed overview
 * @property {ProgramComponent[]} components - Program components
 * @property {Timeline} timeline - Program timeline
 * @property {Outcome[]} expectedOutcomes - Expected outcomes
 * @property {Testimonial[]} testimonials - User testimonials
 * @property {CTA} enrollmentCTA - Enrollment call-to-action
 * @property {SEOMetadata} seoMetadata - SEO metadata
 */

/**
 * @typedef {Object} Vertical
 * @property {string} id - Unique vertical identifier
 * @property {string} name - Vertical name
 * @property {string} description - Vertical description
 * @property {string} icon - Icon identifier
 * @property {RelatedItem[]} relatedProtocols - Related protocols
 * @property {RelatedItem[]} relatedPrograms - Related programs
 * @property {string} link - Link to vertical detail page
 */

/**
 * @typedef {Object} Parameter
 * @property {number} number - Parameter number
 * @property {string} title - Parameter title
 * @property {string} description - Parameter description
 * @property {string} relevance - Relevance to wellness
 */

/**
 * @typedef {Object} ScoreRange
 * @property {number} min - Minimum score
 * @property {number} max - Maximum score
 * @property {string} interpretation - Score interpretation
 */

/**
 * @typedef {Object} WOWAssessment
 * @property {string} name - Assessment name
 * @property {string} description - Assessment description
 * @property {string} overview - Detailed overview
 * @property {Parameter[]} parameters - Assessment parameters
 * @property {string} scoringMethodology - How scoring works
 * @property {ScoreRange[]} scoreRanges - Score ranges and interpretations
 * @property {CTA} scheduleCTA - Schedule assessment call-to-action
 */

// ============================================================================
// VALIDATION FUNCTIONS
// ============================================================================

/**
 * Validates a SEO metadata object
 * @param {SEOMetadata} metadata - Metadata to validate
 * @returns {boolean} True if valid
 */
function validateSEOMetadata(metadata) {
  if (!metadata || typeof metadata !== 'object') return false;
  if (typeof metadata.title !== 'string' || !metadata.title.trim()) return false;
  if (typeof metadata.description !== 'string' || !metadata.description.trim()) return false;
  if (!Array.isArray(metadata.keywords)) return false;
  return metadata.keywords.every(k => typeof k === 'string' && k.trim());
}

/**
 * Validates a Symptom object
 * @param {Symptom} symptom - Symptom to validate
 * @returns {boolean} True if valid
 */
function validateSymptom(symptom) {
  if (!symptom || typeof symptom !== 'object') return false;
  if (typeof symptom.title !== 'string' || !symptom.title.trim()) return false;
  if (typeof symptom.description !== 'string' || !symptom.description.trim()) return false;
  return true;
}

/**
 * Validates a RootCause object
 * @param {RootCause} cause - Root cause to validate
 * @returns {boolean} True if valid
 */
function validateRootCause(cause) {
  if (!cause || typeof cause !== 'object') return false;
  if (typeof cause.title !== 'string' || !cause.title.trim()) return false;
  if (typeof cause.description !== 'string' || !cause.description.trim()) return false;
  return true;
}

/**
 * Validates a RelatedItem object
 * @param {RelatedItem} item - Related item to validate
 * @returns {boolean} True if valid
 */
function validateRelatedItem(item) {
  if (!item || typeof item !== 'object') return false;
  if (typeof item.id !== 'string' || !item.id.trim()) return false;
  if (typeof item.name !== 'string' || !item.name.trim()) return false;
  if (typeof item.link !== 'string' || !item.link.trim()) return false;
  return true;
}

/**
 * Validates a KeyStatistics object
 * @param {KeyStatistics} stats - Statistics to validate
 * @returns {boolean} True if valid
 */
function validateKeyStatistics(stats) {
  if (!stats || typeof stats !== 'object') return false;
  if (typeof stats.prevalence !== 'string' || !stats.prevalence.trim()) return false;
  if (typeof stats.impact !== 'string' || !stats.impact.trim()) return false;
  if (typeof stats.reversalRate !== 'string' || !stats.reversalRate.trim()) return false;
  return true;
}

/**
 * Validates a Disorder object
 * @param {Disorder} disorder - Disorder to validate
 * @returns {boolean} True if valid
 */
function validateDisorder(disorder) {
  if (!disorder || typeof disorder !== 'object') return false;
  if (typeof disorder.id !== 'string' || !disorder.id.trim()) return false;
  if (typeof disorder.name !== 'string' || !disorder.name.trim()) return false;
  if (typeof disorder.slug !== 'string' || !disorder.slug.trim()) return false;
  if (typeof disorder.description !== 'string' || !disorder.description.trim()) return false;
  if (!validateKeyStatistics(disorder.keyStatistics)) return false;
  if (typeof disorder.overview !== 'string' || !disorder.overview.trim()) return false;
  if (!Array.isArray(disorder.symptoms) || !disorder.symptoms.every(validateSymptom)) return false;
  if (!Array.isArray(disorder.rootCauses) || !disorder.rootCauses.every(validateRootCause)) return false;
  if (typeof disorder.reversalMechanism !== 'string' || !disorder.reversalMechanism.trim()) return false;
  if (!Array.isArray(disorder.relatedPrograms) || !disorder.relatedPrograms.every(validateRelatedItem)) return false;
  if (!validateSEOMetadata(disorder.seoMetadata)) return false;
  return true;
}

/**
 * Validates a Benefit object
 * @param {Benefit} benefit - Benefit to validate
 * @returns {boolean} True if valid
 */
function validateBenefit(benefit) {
  if (!benefit || typeof benefit !== 'object') return false;
  if (typeof benefit.title !== 'string' || !benefit.title.trim()) return false;
  if (typeof benefit.description !== 'string' || !benefit.description.trim()) return false;
  return true;
}

/**
 * Validates an ImplementationStep object
 * @param {ImplementationStep} step - Step to validate
 * @returns {boolean} True if valid
 */
function validateImplementationStep(step) {
  if (!step || typeof step !== 'object') return false;
  if (typeof step.number !== 'number' || step.number < 1) return false;
  if (typeof step.title !== 'string' || !step.title.trim()) return false;
  if (typeof step.description !== 'string' || !step.description.trim()) return false;
  return true;
}

/**
 * Validates a Protocol object
 * @param {Protocol} protocol - Protocol to validate
 * @returns {boolean} True if valid
 */
function validateProtocol(protocol) {
  if (!protocol || typeof protocol !== 'object') return false;
  if (typeof protocol.id !== 'string' || !protocol.id.trim()) return false;
  if (typeof protocol.name !== 'string' || !protocol.name.trim()) return false;
  if (typeof protocol.slug !== 'string' || !protocol.slug.trim()) return false;
  if (typeof protocol.description !== 'string' || !protocol.description.trim()) return false;
  if (typeof protocol.overview !== 'string' || !protocol.overview.trim()) return false;
  if (typeof protocol.scientificBasis !== 'string' || !protocol.scientificBasis.trim()) return false;
  if (!Array.isArray(protocol.benefits) || !protocol.benefits.every(validateBenefit)) return false;
  if (!Array.isArray(protocol.implementationSteps) || !protocol.implementationSteps.every(validateImplementationStep)) return false;
  if (typeof protocol.expectedResults !== 'string' || !protocol.expectedResults.trim()) return false;
  if (typeof protocol.duration !== 'string' || !protocol.duration.trim()) return false;
  if (typeof protocol.difficulty !== 'string' || !protocol.difficulty.trim()) return false;
  if (!Array.isArray(protocol.relatedProtocols) || !protocol.relatedProtocols.every(validateRelatedItem)) return false;
  if (!validateSEOMetadata(protocol.seoMetadata)) return false;
  return true;
}

/**
 * Validates a ProgramComponent object
 * @param {ProgramComponent} component - Component to validate
 * @returns {boolean} True if valid
 */
function validateProgramComponent(component) {
  if (!component || typeof component !== 'object') return false;
  if (typeof component.title !== 'string' || !component.title.trim()) return false;
  if (typeof component.description !== 'string' || !component.description.trim()) return false;
  if (!Array.isArray(component.protocols)) return false;
  return component.protocols.every(p => typeof p === 'string' && p.trim());
}

/**
 * Validates a Phase object
 * @param {Phase} phase - Phase to validate
 * @returns {boolean} True if valid
 */
function validatePhase(phase) {
  if (!phase || typeof phase !== 'object') return false;
  if (typeof phase.number !== 'number' || phase.number < 1) return false;
  if (typeof phase.title !== 'string' || !phase.title.trim()) return false;
  if (typeof phase.duration !== 'string' || !phase.duration.trim()) return false;
  if (!Array.isArray(phase.objectives)) return false;
  return phase.objectives.every(o => typeof o === 'string' && o.trim());
}

/**
 * Validates a Timeline object
 * @param {Timeline} timeline - Timeline to validate
 * @returns {boolean} True if valid
 */
function validateTimeline(timeline) {
  if (!timeline || typeof timeline !== 'object') return false;
  if (typeof timeline.duration !== 'string' || !timeline.duration.trim()) return false;
  if (!Array.isArray(timeline.phases) || !timeline.phases.every(validatePhase)) return false;
  return true;
}

/**
 * Validates an Outcome object
 * @param {Outcome} outcome - Outcome to validate
 * @returns {boolean} True if valid
 */
function validateOutcome(outcome) {
  if (!outcome || typeof outcome !== 'object') return false;
  if (typeof outcome.title !== 'string' || !outcome.title.trim()) return false;
  if (typeof outcome.description !== 'string' || !outcome.description.trim()) return false;
  return true;
}

/**
 * Validates a Testimonial object
 * @param {Testimonial} testimonial - Testimonial to validate
 * @returns {boolean} True if valid
 */
function validateTestimonial(testimonial) {
  if (!testimonial || typeof testimonial !== 'object') return false;
  if (typeof testimonial.name !== 'string' || !testimonial.name.trim()) return false;
  if (typeof testimonial.role !== 'string' || !testimonial.role.trim()) return false;
  if (typeof testimonial.content !== 'string' || !testimonial.content.trim()) return false;
  return true;
}

/**
 * Validates a CTA object
 * @param {CTA} cta - CTA to validate
 * @returns {boolean} True if valid
 */
function validateCTA(cta) {
  if (!cta || typeof cta !== 'object') return false;
  if (typeof cta.text !== 'string' || !cta.text.trim()) return false;
  if (typeof cta.link !== 'string' || !cta.link.trim()) return false;
  return true;
}

/**
 * Validates a Program object
 * @param {Program} program - Program to validate
 * @returns {boolean} True if valid
 */
function validateProgram(program) {
  if (!program || typeof program !== 'object') return false;
  if (typeof program.id !== 'string' || !program.id.trim()) return false;
  if (typeof program.name !== 'string' || !program.name.trim()) return false;
  if (typeof program.slug !== 'string' || !program.slug.trim()) return false;
  if (typeof program.description !== 'string' || !program.description.trim()) return false;
  if (typeof program.targetAudience !== 'string' || !program.targetAudience.trim()) return false;
  if (typeof program.overview !== 'string' || !program.overview.trim()) return false;
  if (!Array.isArray(program.components) || !program.components.every(validateProgramComponent)) return false;
  if (!validateTimeline(program.timeline)) return false;
  if (!Array.isArray(program.expectedOutcomes) || !program.expectedOutcomes.every(validateOutcome)) return false;
  if (!Array.isArray(program.testimonials) || !program.testimonials.every(validateTestimonial)) return false;
  if (!validateCTA(program.enrollmentCTA)) return false;
  if (!validateSEOMetadata(program.seoMetadata)) return false;
  return true;
}

/**
 * Validates a Vertical object
 * @param {Vertical} vertical - Vertical to validate
 * @returns {boolean} True if valid
 */
function validateVertical(vertical) {
  if (!vertical || typeof vertical !== 'object') return false;
  if (typeof vertical.id !== 'string' || !vertical.id.trim()) return false;
  if (typeof vertical.name !== 'string' || !vertical.name.trim()) return false;
  if (typeof vertical.description !== 'string' || !vertical.description.trim()) return false;
  if (typeof vertical.icon !== 'string' || !vertical.icon.trim()) return false;
  if (!Array.isArray(vertical.relatedProtocols) || !vertical.relatedProtocols.every(validateRelatedItem)) return false;
  if (!Array.isArray(vertical.relatedPrograms) || !vertical.relatedPrograms.every(validateRelatedItem)) return false;
  if (typeof vertical.link !== 'string' || !vertical.link.trim()) return false;
  return true;
}

/**
 * Validates a Parameter object
 * @param {Parameter} parameter - Parameter to validate
 * @returns {boolean} True if valid
 */
function validateParameter(parameter) {
  if (!parameter || typeof parameter !== 'object') return false;
  if (typeof parameter.number !== 'number' || parameter.number < 1) return false;
  if (typeof parameter.title !== 'string' || !parameter.title.trim()) return false;
  if (typeof parameter.description !== 'string' || !parameter.description.trim()) return false;
  if (typeof parameter.relevance !== 'string' || !parameter.relevance.trim()) return false;
  return true;
}

/**
 * Validates a ScoreRange object
 * @param {ScoreRange} range - Score range to validate
 * @returns {boolean} True if valid
 */
function validateScoreRange(range) {
  if (!range || typeof range !== 'object') return false;
  if (typeof range.min !== 'number' || range.min < 0) return false;
  if (typeof range.max !== 'number' || range.max < range.min) return false;
  if (typeof range.interpretation !== 'string' || !range.interpretation.trim()) return false;
  return true;
}

/**
 * Validates a WOW Assessment object
 * @param {WOWAssessment} assessment - Assessment to validate
 * @returns {boolean} True if valid
 */
function validateWOWAssessment(assessment) {
  if (!assessment || typeof assessment !== 'object') return false;
  if (typeof assessment.name !== 'string' || !assessment.name.trim()) return false;
  if (typeof assessment.description !== 'string' || !assessment.description.trim()) return false;
  if (typeof assessment.overview !== 'string' || !assessment.overview.trim()) return false;
  if (!Array.isArray(assessment.parameters) || !assessment.parameters.every(validateParameter)) return false;
  if (typeof assessment.scoringMethodology !== 'string' || !assessment.scoringMethodology.trim()) return false;
  if (!Array.isArray(assessment.scoreRanges) || !assessment.scoreRanges.every(validateScoreRange)) return false;
  if (!validateCTA(assessment.scheduleCTA)) return false;
  return true;
}

// ============================================================================
// EXPORTS
// ============================================================================

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
};
