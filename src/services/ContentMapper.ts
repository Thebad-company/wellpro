/**
 * ContentMapper Service
 * Fetches and parses content from wellpro.one
 * Implements content parsing logic with error handling and validation
 */

import {
  Disorder,
  Protocol,
  Program,
  Vertical,
  WOWAssessment,
  validateDisorder,
  validateProtocol,
  validateProgram,
  validateVertical,
  validateWOWAssessment,
} from '../types/content';

// ============================================================================
// Mock Data - Replace with actual API calls when available
// ============================================================================

const MOCK_DISORDERS: Record<string, Disorder> = {
  diabetes: {
    id: 'diabetes',
    name: 'Diabetes',
    slug: 'diabetes',
    description: 'Type 2 Diabetes is a metabolic disorder affecting blood sugar regulation.',
    keyStatistics: {
      prevalence: '10.5% of global population',
      impact: 'Leading cause of blindness and kidney disease',
      reversalRate: '85% reversal rate with lifestyle intervention',
    },
    overview:
      'Diabetes is a chronic condition characterized by high blood sugar levels. Type 2 diabetes accounts for 90% of all diabetes cases and is largely preventable through lifestyle changes.',
    symptoms: [
      {
        title: 'Increased Thirst',
        description: 'Excessive thirst and frequent urination',
        icon: 'droplet',
      },
      {
        title: 'Fatigue',
        description: 'Persistent tiredness and lack of energy',
        icon: 'battery-low',
      },
      {
        title: 'Blurred Vision',
        description: 'Vision problems and difficulty focusing',
        icon: 'eye',
      },
      {
        title: 'Slow Healing',
        description: 'Cuts and wounds heal slowly',
        icon: 'bandage',
      },
    ],
    rootCauses: [
      {
        title: 'Insulin Resistance',
        description: 'Cells become resistant to insulin, preventing glucose uptake',
      },
      {
        title: 'Poor Diet',
        description: 'High sugar and processed food consumption',
      },
      {
        title: 'Sedentary Lifestyle',
        description: 'Lack of physical activity and exercise',
      },
      {
        title: 'Chronic Stress',
        description: 'Prolonged stress elevates cortisol and blood sugar',
      },
    ],
    reversalMechanism:
      'Through dietary changes, regular exercise, stress management, and sleep optimization, insulin sensitivity can be restored and blood sugar levels normalized.',
    relatedPrograms: [
      {
        id: 'diabetes-reversal',
        name: 'Diabetes Reversal Program',
        link: '/programs/diabetes-reversal',
      },
    ],
    seoMetadata: {
      title: 'Diabetes Reversal - WellPro',
      description: 'Learn about diabetes, its causes, and how to reverse it naturally.',
      keywords: ['diabetes', 'type 2 diabetes', 'blood sugar', 'reversal'],
    },
  },
};

const MOCK_PROTOCOLS: Record<string, Protocol> = {
  'deep-detox': {
    id: 'deep-detox',
    name: 'Deep Detox',
    slug: 'deep-detox',
    description: 'A comprehensive detoxification protocol to cleanse your body naturally.',
    overview:
      'The Deep Detox protocol is designed to support your body\'s natural detoxification processes through dietary changes, supplements, and lifestyle modifications.',
    scientificBasis:
      'Research shows that supporting liver and kidney function through targeted nutrition can enhance the body\'s natural detoxification pathways.',
    benefits: [
      {
        title: 'Improved Energy',
        description: 'Increased vitality and reduced fatigue',
        icon: 'zap',
      },
      {
        title: 'Better Digestion',
        description: 'Enhanced digestive function and nutrient absorption',
        icon: 'stomach',
      },
      {
        title: 'Clearer Skin',
        description: 'Reduced inflammation and improved skin clarity',
        icon: 'sparkles',
      },
      {
        title: 'Mental Clarity',
        description: 'Improved focus and cognitive function',
        icon: 'brain',
      },
    ],
    implementationSteps: [
      {
        number: 1,
        title: 'Eliminate Toxins',
        description: 'Remove processed foods, sugar, and alcohol from your diet',
        details: 'Focus on whole, organic foods for 7 days',
      },
      {
        number: 2,
        title: 'Hydrate',
        description: 'Drink plenty of filtered water and herbal teas',
        details: 'Aim for 3-4 liters of water daily',
      },
      {
        number: 3,
        title: 'Support Liver Function',
        description: 'Include liver-supporting foods and supplements',
        details: 'Add turmeric, milk thistle, and leafy greens',
      },
      {
        number: 4,
        title: 'Rest and Recover',
        description: 'Prioritize sleep and stress management',
        details: 'Get 8+ hours of quality sleep nightly',
      },
    ],
    expectedResults:
      'Most participants report improved energy, better digestion, and clearer skin within 2-3 weeks.',
    duration: '21 days',
    difficulty: 'Moderate',
    relatedProtocols: [],
    seoMetadata: {
      title: 'Deep Detox Protocol - WellPro',
      description: 'Learn about the Deep Detox protocol and how to cleanse your body naturally.',
      keywords: ['detox', 'cleanse', 'liver health', 'detoxification'],
    },
  },
};

const MOCK_PROGRAMS: Record<string, Program> = {
  'diabetes-reversal': {
    id: 'diabetes-reversal',
    name: 'Diabetes Reversal Program',
    slug: 'diabetes-reversal',
    description: 'A comprehensive 12-week program to reverse type 2 diabetes naturally.',
    targetAudience: 'Individuals with type 2 diabetes or prediabetes',
    overview:
      'The Diabetes Reversal Program combines nutrition, exercise, stress management, and sleep optimization to restore insulin sensitivity and normalize blood sugar levels.',
    components: [
      {
        title: 'Nutrition Coaching',
        description: 'Personalized meal plans and dietary guidance',
        protocols: ['deep-detox', 'alkaline-water'],
      },
      {
        title: 'Exercise Program',
        description: 'Structured workout routines for metabolic health',
        protocols: [],
      },
      {
        title: 'Stress Management',
        description: 'Meditation and mindfulness techniques',
        protocols: [],
      },
    ],
    timeline: {
      duration: '12 weeks',
      phases: [
        {
          number: 1,
          title: 'Foundation Phase',
          duration: '4 weeks',
          objectives: [
            'Establish baseline health metrics',
            'Begin dietary changes',
            'Start exercise routine',
          ],
        },
        {
          number: 2,
          title: 'Optimization Phase',
          duration: '4 weeks',
          objectives: [
            'Deepen dietary changes',
            'Increase exercise intensity',
            'Implement stress management',
          ],
        },
        {
          number: 3,
          title: 'Integration Phase',
          duration: '4 weeks',
          objectives: [
            'Consolidate lifestyle changes',
            'Achieve target health metrics',
            'Plan long-term maintenance',
          ],
        },
      ],
    },
    expectedOutcomes: [
      {
        title: 'Normalized Blood Sugar',
        description: 'Achieve fasting glucose levels in normal range',
      },
      {
        title: 'Weight Loss',
        description: 'Average 8-12 kg weight loss over 12 weeks',
      },
      {
        title: 'Improved Energy',
        description: 'Increased vitality and reduced fatigue',
      },
    ],
    testimonials: [
      {
        name: 'John Doe',
        role: 'Program Graduate',
        content: 'I reversed my diabetes in 12 weeks. This program changed my life!',
        image: '/testimonial-1.jpg',
      },
    ],
    enrollmentCTA: {
      text: 'Enroll Now',
      link: '/enroll/diabetes-reversal',
    },
    seoMetadata: {
      title: 'Diabetes Reversal Program - WellPro',
      description: 'A comprehensive 12-week program to reverse type 2 diabetes naturally.',
      keywords: ['diabetes reversal', 'type 2 diabetes', 'program', 'wellness'],
    },
  },
};

const MOCK_VERTICALS: Vertical[] = [
  {
    id: 'nutrition',
    name: 'Nutrition',
    description: 'Optimize your diet for health and vitality',
    icon: 'apple',
    relatedProtocols: [
      { id: 'deep-detox', name: 'Deep Detox', link: '/protocols/deep-detox' },
    ],
    relatedPrograms: [
      { id: 'diabetes-reversal', name: 'Diabetes Reversal', link: '/programs/diabetes-reversal' },
    ],
    link: '/verticals/nutrition',
  },
  {
    id: 'fitness',
    name: 'Fitness',
    description: 'Build strength and endurance through exercise',
    icon: 'dumbbell',
    relatedProtocols: [],
    relatedPrograms: [],
    link: '/verticals/fitness',
  },
  {
    id: 'sleep',
    name: 'Sleep',
    description: 'Improve sleep quality for better health',
    icon: 'moon',
    relatedProtocols: [],
    relatedPrograms: [],
    link: '/verticals/sleep',
  },
  {
    id: 'stress',
    name: 'Stress Management',
    description: 'Reduce stress and improve mental health',
    icon: 'zen',
    relatedProtocols: [],
    relatedPrograms: [],
    link: '/verticals/stress',
  },
  {
    id: 'hydration',
    name: 'Hydration',
    description: 'Optimize water intake and hydration',
    icon: 'droplet',
    relatedProtocols: [],
    relatedPrograms: [],
    link: '/verticals/hydration',
  },
  {
    id: 'digestion',
    name: 'Digestion',
    description: 'Support healthy digestive function',
    icon: 'stomach',
    relatedProtocols: [],
    relatedPrograms: [],
    link: '/verticals/digestion',
  },
  {
    id: 'immunity',
    name: 'Immunity',
    description: 'Strengthen your immune system',
    icon: 'shield',
    relatedProtocols: [],
    relatedPrograms: [],
    link: '/verticals/immunity',
  },
  {
    id: 'detox',
    name: 'Detoxification',
    description: 'Support your body\'s natural detox processes',
    icon: 'leaf',
    relatedProtocols: [],
    relatedPrograms: [],
    link: '/verticals/detox',
  },
  {
    id: 'hormones',
    name: 'Hormonal Balance',
    description: 'Optimize hormonal health and balance',
    icon: 'heart',
    relatedProtocols: [],
    relatedPrograms: [],
    link: '/verticals/hormones',
  },
  {
    id: 'inflammation',
    name: 'Inflammation Management',
    description: 'Reduce chronic inflammation naturally',
    icon: 'flame',
    relatedProtocols: [],
    relatedPrograms: [],
    link: '/verticals/inflammation',
  },
  {
    id: 'longevity',
    name: 'Longevity',
    description: 'Extend healthspan and lifespan',
    icon: 'sparkles',
    relatedProtocols: [],
    relatedPrograms: [],
    link: '/verticals/longevity',
  },
  {
    id: 'mindfulness',
    name: 'Mindfulness',
    description: 'Cultivate mental clarity and presence',
    icon: 'brain',
    relatedProtocols: [],
    relatedPrograms: [],
    link: '/verticals/mindfulness',
  },
];

const MOCK_WOW_ASSESSMENT: WOWAssessment = {
  name: 'World of Wellness (WOW) Assessment',
  description: 'Comprehensive wellness assessment across 12 key health parameters',
  overview:
    'The WOW Assessment evaluates your wellness across 12 dimensions to provide a holistic view of your health status and identify areas for improvement.',
  parameters: [
    {
      number: 1,
      title: 'Nutrition',
      description: 'Quality of diet and nutritional intake',
      relevance: 'Foundation for all health outcomes',
    },
    {
      number: 2,
      title: 'Fitness',
      description: 'Physical activity and cardiovascular health',
      relevance: 'Essential for metabolic health',
    },
    {
      number: 3,
      title: 'Sleep',
      description: 'Sleep quality and duration',
      relevance: 'Critical for recovery and immune function',
    },
    {
      number: 4,
      title: 'Stress',
      description: 'Stress levels and management',
      relevance: 'Impacts all health dimensions',
    },
    {
      number: 5,
      title: 'Hydration',
      description: 'Water intake and hydration status',
      relevance: 'Essential for cellular function',
    },
    {
      number: 6,
      title: 'Digestion',
      description: 'Digestive health and function',
      relevance: 'Key to nutrient absorption',
    },
    {
      number: 7,
      title: 'Immunity',
      description: 'Immune system strength',
      relevance: 'Protection against disease',
    },
    {
      number: 8,
      title: 'Detoxification',
      description: 'Body\'s detoxification capacity',
      relevance: 'Removes harmful substances',
    },
    {
      number: 9,
      title: 'Hormonal Balance',
      description: 'Hormonal health and balance',
      relevance: 'Regulates all body systems',
    },
    {
      number: 10,
      title: 'Inflammation',
      description: 'Chronic inflammation levels',
      relevance: 'Root cause of many diseases',
    },
    {
      number: 11,
      title: 'Longevity',
      description: 'Lifespan and healthspan potential',
      relevance: 'Long-term health outcomes',
    },
    {
      number: 12,
      title: 'Mindfulness',
      description: 'Mental clarity and presence',
      relevance: 'Supports emotional wellbeing',
    },
  ],
  scoringMethodology:
    'Each parameter is scored 0-100 based on assessment responses. Overall WOW Score is the average of all 12 parameters.',
  scoreRanges: [
    {
      min: 0,
      max: 30,
      interpretation: 'Critical - Immediate intervention needed',
    },
    {
      min: 31,
      max: 50,
      interpretation: 'Poor - Significant improvements needed',
    },
    {
      min: 51,
      max: 70,
      interpretation: 'Fair - Room for improvement',
    },
    {
      min: 71,
      max: 85,
      interpretation: 'Good - Maintain current practices',
    },
    {
      min: 86,
      max: 100,
      interpretation: 'Excellent - Optimal wellness',
    },
  ],
  scheduleCTA: {
    text: 'Schedule Assessment',
    link: '/schedule-assessment',
  },
};

// ============================================================================
// ContentMapper Class
// ============================================================================

export class ContentMapper {
  private logger: Console;

  constructor() {
    this.logger = console;
  }

  /**
   * Fetch and parse disorder content
   * @param disorderId - The ID of the disorder to fetch
   * @returns Parsed Disorder object or null if not found/invalid
   */
  async getDisorder(disorderId: string): Promise<Disorder | null> {
    try {
      if (!disorderId || typeof disorderId !== 'string') {
        this.logger.error('ContentMapper: Invalid disorderId provided', { disorderId });
        return null;
      }

      // Mock implementation - replace with actual API call
      const disorder = MOCK_DISORDERS[disorderId.toLowerCase()];

      if (!disorder) {
        this.logger.warn('ContentMapper: Disorder not found', { disorderId });
        return null;
      }

      // Validate the disorder data
      if (!validateDisorder(disorder)) {
        this.logger.error('ContentMapper: Disorder data validation failed', { disorderId, disorder });
        return null;
      }

      this.logger.info('ContentMapper: Successfully fetched disorder', { disorderId });
      return disorder;
    } catch (error) {
      this.logger.error('ContentMapper: Error fetching disorder', { disorderId, error });
      return null;
    }
  }

  /**
   * Fetch and parse protocol content
   * @param protocolId - The ID of the protocol to fetch
   * @returns Parsed Protocol object or null if not found/invalid
   */
  async getProtocol(protocolId: string): Promise<Protocol | null> {
    try {
      if (!protocolId || typeof protocolId !== 'string') {
        this.logger.error('ContentMapper: Invalid protocolId provided', { protocolId });
        return null;
      }

      // Mock implementation - replace with actual API call
      const protocol = MOCK_PROTOCOLS[protocolId.toLowerCase()];

      if (!protocol) {
        this.logger.warn('ContentMapper: Protocol not found', { protocolId });
        return null;
      }

      // Validate the protocol data
      if (!validateProtocol(protocol)) {
        this.logger.error('ContentMapper: Protocol data validation failed', {
          protocolId,
          protocol,
        });
        return null;
      }

      this.logger.info('ContentMapper: Successfully fetched protocol', { protocolId });
      return protocol;
    } catch (error) {
      this.logger.error('ContentMapper: Error fetching protocol', { protocolId, error });
      return null;
    }
  }

  /**
   * Fetch and parse program content
   * @param programId - The ID of the program to fetch
   * @returns Parsed Program object or null if not found/invalid
   */
  async getProgram(programId: string): Promise<Program | null> {
    try {
      if (!programId || typeof programId !== 'string') {
        this.logger.error('ContentMapper: Invalid programId provided', { programId });
        return null;
      }

      // Mock implementation - replace with actual API call
      const program = MOCK_PROGRAMS[programId.toLowerCase()];

      if (!program) {
        this.logger.warn('ContentMapper: Program not found', { programId });
        return null;
      }

      // Validate the program data
      if (!validateProgram(program)) {
        this.logger.error('ContentMapper: Program data validation failed', { programId, program });
        return null;
      }

      this.logger.info('ContentMapper: Successfully fetched program', { programId });
      return program;
    } catch (error) {
      this.logger.error('ContentMapper: Error fetching program', { programId, error });
      return null;
    }
  }

  /**
   * Fetch all wellness verticals
   * @returns Array of Vertical objects or empty array if error
   */
  async getVerticals(): Promise<Vertical[]> {
    try {
      // Validate all verticals
      const validVerticals = MOCK_VERTICALS.filter((vertical) => {
        if (!validateVertical(vertical)) {
          this.logger.error('ContentMapper: Vertical data validation failed', { vertical });
          return false;
        }
        return true;
      });

      if (validVerticals.length === 0) {
        this.logger.warn('ContentMapper: No valid verticals found');
        return [];
      }

      this.logger.info('ContentMapper: Successfully fetched verticals', {
        count: validVerticals.length,
      });
      return validVerticals;
    } catch (error) {
      this.logger.error('ContentMapper: Error fetching verticals', { error });
      return [];
    }
  }

  /**
   * Fetch WOW Assessment content
   * @returns Parsed WOWAssessment object or null if invalid
   */
  async getWOWAssessment(): Promise<WOWAssessment | null> {
    try {
      // Validate the WOW assessment data
      if (!validateWOWAssessment(MOCK_WOW_ASSESSMENT)) {
        this.logger.error('ContentMapper: WOW Assessment data validation failed', {
          assessment: MOCK_WOW_ASSESSMENT,
        });
        return null;
      }

      this.logger.info('ContentMapper: Successfully fetched WOW Assessment');
      return MOCK_WOW_ASSESSMENT;
    } catch (error) {
      this.logger.error('ContentMapper: Error fetching WOW Assessment', { error });
      return null;
    }
  }
}

// ============================================================================
// Singleton Instance
// ============================================================================

export const contentMapper = new ContentMapper();
